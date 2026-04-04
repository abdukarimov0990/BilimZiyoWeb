import TelegramBot from "node-telegram-bot-api";
import { getDb } from "./firebase.js";

export const BOT_LINK = "https://t.me/BilimziyoIelts_bot"
const START_MESSAGE = [
  "Assalomu alaykum!",
  "",
  "Siz mock exam yangiliklar botiga ulandingiz.",
  "",
  "Bu bot orqali siz:",
  "- Mock exam sanalari",
  "- Ro'yxatdan o'tish linklari",
  "- Eslatmalar (3 kun, 2 kun, 1 kun oldin)",
  "",
  "haqida xabardor bo'lib turasiz.",
].join("\n");

export function createTelegramBot() {
  const token = process.env.TELEGRAM_BOT_TOKEN || process.env.REACT_APP_TELEGRAM_BOT_TOKEN;

  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN topilmadi.");
  }

  const bot = new TelegramBot(token, { polling: true });

  bot.onText(/^\/start(?:@\w+)?$/, async (message) => {
    const chatId = String(message.chat.id);
    const username = message.from?.username || "";
    const firstName = message.from?.first_name || "";
    const lastName = message.from?.last_name || "";

    await upsertUser({
      chatId,
      username,
      firstName,
      lastName,
    });

    console.log(`[mock-exam:bot] Foydalanuvchi qo'shildi: ${chatId}`);
    await bot.sendMessage(chatId, START_MESSAGE, {
      disable_web_page_preview: true,
    });
  });

  bot.on("polling_error", (error) => {
    console.error("[mock-exam:bot] Polling xatoligi:", error.message);
  });

  console.log("[mock-exam:bot] Telegram bot polling ishga tushdi.");

  return bot;
}

export async function loadUsers() {
  try {
    const snapshot = await getDb().collection("telegramUsers").get();

    return snapshot.docs.map((doc) => ({
      chatId: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("[mock-exam:bot] Firebase userlari o'qilmadi:", error.message);
    return [];
  }
}

export async function upsertUser(userData) {
  const db = getDb();
  const userRef = db.collection("telegramUsers").doc(userData.chatId);
  const existingUser = await userRef.get();
  const previousData = existingUser.exists ? existingUser.data() : {};
  const nextUser = {
    username: userData.username || "",
    firstName: userData.firstName || "",
    lastName: userData.lastName || "",
    joinedAt: previousData?.joinedAt || new Date().toISOString(),
    lastAnnouncedExamKey: previousData?.lastAnnouncedExamKey || "",
    remindersSent: previousData?.remindersSent || {},
  };

  await userRef.set(nextUser, { merge: true });
  return nextUser;
}

export async function markExamBroadcastSent(chatId, examKey) {
  await updateUser(chatId, (user) => ({
    ...user,
    lastAnnouncedExamKey: examKey,
  }));
}

export function hasReceivedExamBroadcast(user, examKey) {
  return user.lastAnnouncedExamKey === examKey;
}

export function hasReceivedReminder(user, reminderKey) {
  return Boolean(user.remindersSent?.[reminderKey]);
}

export async function markReminderSent(chatId, reminderKey) {
  await updateUser(chatId, (user) => ({
    ...user,
    remindersSent: {
      ...(user.remindersSent || {}),
      [reminderKey]: new Date().toISOString(),
    },
  }));
}

export async function sendText(bot, chatId, text) {
  try {
    await bot.sendMessage(chatId, text, {
      disable_web_page_preview: true,
    });
    return true;
  } catch (error) {
    console.error(`[mock-exam:bot] ${chatId} ga xabar yuborilmadi:`, error.message);
    return false;
  }
}

async function updateUser(chatId, updater) {
  const db = getDb();
  const userRef = db.collection("telegramUsers").doc(chatId);
  const userSnapshot = await userRef.get();

  if (!userSnapshot.exists) {
    return;
  }

  const currentUser = {
    chatId,
    ...userSnapshot.data(),
  };
  const nextUser = updater(currentUser);
  const { chatId: _chatId, ...userData } = nextUser;

  await userRef.set(userData, { merge: true });
}

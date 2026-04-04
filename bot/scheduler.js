import {
  BOT_LINK,
  hasReceivedExamBroadcast,
  hasReceivedReminder,
  loadUsers,
  markExamBroadcastSent,
  markReminderSent,
  sendText,
} from "./bot.js";
import { fetchMockExamData } from "./sheets.js";

const SHEET_POLL_INTERVAL_MS = Number(process.env.SHEET_POLL_INTERVAL_MS || 30 * 1000);
const REMINDER_CHECK_INTERVAL_MS = Number(process.env.REMINDER_CHECK_INTERVAL_MS || 60 * 60 * 1000);

export function startScheduler(bot) {
  void checkForDateChanges(bot);
  void checkForReminders(bot);

  setInterval(() => {
    void checkForDateChanges(bot);
  }, SHEET_POLL_INTERVAL_MS);

  setInterval(() => {
    void checkForReminders(bot);
  }, REMINDER_CHECK_INTERVAL_MS);

  console.log("[mock-exam:scheduler] Scheduler ishga tushdi.");
}

async function checkForDateChanges(bot) {
  const mockExam = await fetchMockExamData();

  if (!mockExam.hasExam) {
    console.log("[mock-exam:scheduler] Active exam topilmadi:", mockExam.reason);
    return;
  }

  const users = await loadUsers();

  if (!users.length) {
    return;
  }

  console.log(`[mock-exam:scheduler] Yangi exam tekshirildi: ${mockExam.examDateDisplay}`);

  for (const user of users) {
    if (hasReceivedExamBroadcast(user, mockExam.examKey)) {
      continue;
    }

    const message = [
      "Yangi mock exam e'lon qilindi!",
      "",
      `📅 Sana: ${mockExam.examDateDisplay}`,
      `🔗 Ro'yxatdan o'tish uchun shu havoladagi formani to'ldiring: ${mockExam.registrationLink || "https://www.bilimziyo.uz/mock"}`,
    ].join("\n");

    const sent = await sendText(bot, user.chatId, message);

    if (sent) {
      console.log(`[mock-exam:scheduler] Broadcast yuborildi: ${user.chatId}`);
      await markExamBroadcastSent(user.chatId, mockExam.examKey);
    }
  }
}

async function checkForReminders(bot) {
  const mockExam = await fetchMockExamData();

  if (!mockExam.hasExam || !mockExam.examDateValue) {
    return;
  }

  const users = await loadUsers();

  if (!users.length) {
    return;
  }

  const daysLeft = getDaysLeft(mockExam.examDateValue);

  if (![3, 2, 1].includes(daysLeft)) {
    return;
  }

  const reminderKey = `${mockExam.examKey}:${daysLeft}`;

  for (const user of users) {
    if (hasReceivedReminder(user, reminderKey)) {
      continue;
    }

    const message = [
      `Eslatma: ${mockExam.examDateDisplay} sanadagi mock examga ${daysLeft} kun qoldi.`,
      "",

    ].join("\n");

    const sent = await sendText(bot, user.chatId, message);

    if (sent) {
      console.log(`[mock-exam:scheduler] ${daysLeft} kunlik eslatma yuborildi: ${user.chatId}`);
      await markReminderSent(user.chatId, reminderKey);
    }
  }
}

function getDaysLeft(examDate) {
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startOfExam = new Date(examDate.getFullYear(), examDate.getMonth(), examDate.getDate());
  const differenceMs = startOfExam.getTime() - startOfToday.getTime();
  return Math.round(differenceMs / (1000 * 60 * 60 * 24));
}

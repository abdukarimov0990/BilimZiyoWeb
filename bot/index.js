import dotenv from "dotenv";
import { createTelegramBot } from "./bot.js";
import { startScheduler } from "./scheduler.js";

dotenv.config();

try {
  const bot = createTelegramBot();
  startScheduler(bot);
} catch (error) {
  console.error("[mock-exam:index] Bot ishga tushmadi:", error.message);
  process.exit(1);
}

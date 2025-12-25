// src/utils/TelegramBot.js
import axios from 'axios';

class TelegramBotService {
  constructor() {
    // Safely access environment variables with a fallback
    this.botToken = typeof process !== 'undefined' ? process.env?.REACT_APP_TELEGRAM_BOT_TOKEN : '';
    this.chatId = typeof process !== 'undefined' ? process.env?.REACT_APP_TELEGRAM_CHAT_ID : '';
    
    // Check if credentials are present before setting the API URL
    if (this.botToken && this.chatId) {
      this.apiUrl = `https://api.telegram.org/bot${this.botToken}`;
      this.isConfigured = true;
    } else {
      console.warn('Telegram Bot credentials are not configured. Bot service will not send messages.');
      this.isConfigured = false;
      this.apiUrl = null;
    }
  }

  async sendVacancyApplication(formData) {
    // Check if the service is configured before attempting to send
    if (!this.isConfigured) {
      console.error('Cannot send message: Telegram Bot is not configured.');
      return { success: false, error: 'Bot not configured' };
    }

    try {
      const message = this.formatVacancyMessage(formData);
      
      const response = await axios.post(`${this.apiUrl}/sendMessage`, {
        chat_id: this.chatId,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      });
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Telegram bot API error:', error);
      // Return a structured error instead of throwing, so the UI can handle it gracefully
      return { 
        success: false, 
        error: error.message,
        details: error.response?.data 
      };
    }
  }

  formatVacancyMessage(data) {
    // ... (your existing formatVacancyMessage method remains the same)
  }
}

export default new TelegramBotService();
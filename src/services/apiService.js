import axios from 'axios';

const BASE_URL = 'http://localhost:1337';

// Google Sheets API uchun
const GOOGLE_SHEET_ID = 'YOUR_GOOGLE_SHEET_ID';
const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY';

// Telegram Bot uchun
const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID';

// Umumiy API so'rovlari
export const apiService = {
  // Strapi dan ma'lumot olish
  async fetchData(endpoint) {
    try {
      const response = await axios.get(`${BASE_URL}/api/${endpoint}?populate=*`);
      return response.data.data || [];
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      return [];
    }
  },

  // Google Sheets ga ma'lumot yuborish
  async sendToGoogleSheets(data, sheetName) {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${sheetName}:append?valueInputOption=USER_ENTERED&key=${GOOGLE_API_KEY}`;
      
      const values = Object.values(data);
      const body = {
        values: [values]
      };

      await axios.post(url, body, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error sending to Google Sheets:', error);
      return { success: false, error };
    }
  },

  // Telegram Bot ga yuborish
  async sendToTelegram(message, files = []) {
    try {
      let text = `📋 Yangi ariza:\n\n`;
      
      Object.entries(message).forEach(([key, value]) => {
        if (value) {
          text += `• ${key}: ${value}\n`;
        }
      });

      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'HTML'
      });

      // Fayllarni yuklash
      for (const file of files) {
        if (file) {
          const formData = new FormData();
          formData.append('chat_id', TELEGRAM_CHAT_ID);
          formData.append('document', file);
          
          await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        }
      }

      return { success: true };
    } catch (error) {
      console.error('Error sending to Telegram:', error);
      return { success: false, error };
    }
  }
};

// Bir vaqtning o'zida barcha ma'lumotlarni yuklash
export const fetchAllData = async () => {
  const endpoints = [
    'teams',
    'teachers',
    'courses',
    'cefrs',
    'ielts',
    'galleries'
  ];

  const results = {};
  
  for (const endpoint of endpoints) {
    results[endpoint] = await apiService.fetchData(endpoint);
  }
  
  return results;
};
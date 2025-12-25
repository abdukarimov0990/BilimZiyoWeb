// src/utils/GoogleSheets.js
import { GoogleSpreadsheet } from 'google-spreadsheet';

class GoogleSheetsService {
  constructor() {
    this.doc = null;
    this.SHEET_IDS = {
      contact: 'CONTACT_SHEET_ID',
      event: 'EVENT_SHEET_ID',
      course: 'COURSE_SHEET_ID'
    };
  }

  async init() {
    if (!this.doc) {
      this.doc = new GoogleSpreadsheet(process.env.REACT_APP_GOOGLE_SHEET_ID);
      
      await this.doc.useServiceAccountAuth({
        client_email: process.env.REACT_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.REACT_APP_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      });
      
      await this.doc.loadInfo();
    }
  }

  async submitContactForm(formData) {
    await this.init();
    const sheet = this.doc.sheetsById[this.SHEET_IDS.contact];
    
    const row = {
      Timestamp: new Date().toLocaleString('uz-UZ'),
      Name: formData.name,
      Age: formData.age,
      Phone1: formData.phone1,
      Phone2: formData.phone2,
      Course: formData.course,
      Format: formData.format,
      Time: formData.time,
      Language: formData.language || 'UZ'
    };
    
    await sheet.addRow(row);
    return { success: true };
  }

  async submitEventForm(formData) {
    await this.init();
    const sheet = this.doc.sheetsById[this.SHEET_IDS.event];
    
    const row = {
      Timestamp: new Date().toLocaleString('uz-UZ'),
      Name: formData.name,
      Age: formData.age,
      Phone: formData.phone,
      Event: 'Sunday Event',
      Language: formData.language || 'UZ'
    };
    
    await sheet.addRow(row);
    return { success: true };
  }

  async submitCourseForm(formData) {
    await this.init();
    const sheet = this.doc.sheetsById[this.SHEET_IDS.course];
    
    const row = {
      Timestamp: new Date().toLocaleString('uz-UZ'),
      Name: formData.name,
      Phone: formData.phone,
      Course: formData.courseName,
      Price: formData.price,
      Duration: formData.duration,
      Language: formData.language || 'UZ'
    };
    
    await sheet.addRow(row);
    return { success: true };
  }
}

export default new GoogleSheetsService();
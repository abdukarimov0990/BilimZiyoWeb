// Telefon raqam formatlari
export const formatPhoneNumber = (phone) => {
    if (!phone) return '';
    
    // Faqat raqamlarni qoldirish
    const cleaned = phone.replace(/\D/g, '');
    
    // +998 formatini qo'shish
    if (cleaned.length === 9) {
      return `+998 ${cleaned.slice(0,2)} ${cleaned.slice(2,5)} ${cleaned.slice(5,7)} ${cleaned.slice(7,9)}`;
    } else if (cleaned.length === 12 && cleaned.startsWith('998')) {
      return `+998 ${cleaned.slice(3,5)} ${cleaned.slice(5,8)} ${cleaned.slice(8,10)} ${cleaned.slice(10,12)}`;
    }
    
    return phone;
  };
  
  // Form ma'lumotlarini formatlash
  export const formatFormData = (data) => {
    const formatted = { ...data };
    
    // Telefon raqamlarini formatlash
    if (formatted.phone) formatted.phone = formatPhoneNumber(formatted.phone);
    if (formatted.phone1) formatted.phone1 = formatPhoneNumber(formatted.phone1);
    if (formatted.phone2) formatted.phone2 = formatPhoneNumber(formatted.phone2);
    
    return formatted;
  };
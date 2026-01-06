// ==================================
// Telefon raqamni formatlash
// Format: +998 00 000 0000
// +998 doim saqlanadi
// ==================================
export const formatPhoneNumber = (phone) => {
  // Har doim +998 dan boshlanadi
  let value = phone ?? '';

  // Faqat raqamlarni olamiz
  let digits = value.toString().replace(/\D/g, '');

  // Agar 998 bilan boshlangan bo‘lsa olib tashlaymiz
  if (digits.startsWith('998')) {
    digits = digits.slice(3);
  }

  // Faqat 9 ta raqam
  digits = digits.slice(0, 9);

  // Bo‘laklash: 00 000 0000
  const part1 = digits.slice(0, 2);
  const part2 = digits.slice(2, 5);
  const part3 = digits.slice(5, 9);

  let result = '+998';

  if (part1) result += ' ' + part1;
  if (part2) result += ' ' + part2;
  if (part3) result += ' ' + part3;

  return result;
};
// ==================================
// Form ma'lumotlarini formatlash
// Telefonlar: +998 00 000 0000
// ==================================
export const formatFormData = (data) => {
  const formatted = { ...data };

  ['phone', 'phone1', 'phone2'].forEach((field) => {
    if (field in formatted) {
      formatted[field] = formatPhoneNumber(formatted[field]);
    }
  });

  return formatted;
};

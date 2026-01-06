// src/components/PhoneInput.js
import React from 'react';
import { FaPhone } from 'react-icons/fa';

const PhoneInput = ({
  value = '+998 ',
  onChange,
  placeholder,
  required = false,
  className = ''
}) => {

  // ===============================
  // FORMAT: +998 00 000 0000
  // ===============================
  const formatPhoneNumber = (input) => {
    // Faqat raqamlarni olamiz
    let digits = input.replace(/\D/g, '');

    // Agar 998 bo‘lsa olib tashlaymiz
    if (digits.startsWith('998')) {
      digits = digits.slice(3);
    }

    // Faqat 9 ta raqam
    digits = digits.slice(0, 9);

    const p1 = digits.slice(0, 2);
    const p2 = digits.slice(2, 5);
    const p3 = digits.slice(5, 9);

    let result = '+998';

    if (p1) result += ' ' + p1;
    if (p2) result += ' ' + p2;
    if (p3) result += ' ' + p3;

    return result;
  };

  const handleChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted);
  };

  const handleKeyDown = (e) => {
    // +998 ni o‘chirishni bloklash
    if (value.length <= 5 && e.key === 'Backspace') {
      e.preventDefault();
      return;
    }

    // Ruxsat etilgan tugmalar
    if (
      ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter'].includes(e.key) ||
      (e.ctrlKey && e.key === 'a') ||
      ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)
    ) {
      return;
    }

    // Faqat raqamlar
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="relative bg-white w-full">
      <input
        type="tel"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || '+998 00 000 0000'}
        required={required}
        className={`pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg
          focus:ring-2 focus:ring-blue focus:border-blue outline-none transition-all ${className}`}
        maxLength={17}
      />

      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
        {value.replace(/\D/g, '').slice(3).length}/9
      </div>
    </div>
  );
};

export default PhoneInput;

// src/components/PhoneInput.js
import React, { useState } from 'react';
import { FaPhone } from 'react-icons/fa';

const PhoneInput = ({ value, onChange, placeholder, required = false, className = '' }) => {
  const formatPhoneNumber = (phoneNumber) => {
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Check if the number starts with 998
    let formatted = cleaned;
    if (cleaned.startsWith('998')) {
      formatted = `+${cleaned}`;
    } else if (cleaned.startsWith('+998')) {
      formatted = cleaned;
    } else if (cleaned.length > 0) {
      formatted = `+998 ${cleaned.substring(0, 2)} ${cleaned.substring(2, 5)} ${cleaned.substring(5, 7)} ${cleaned.substring(7, 9)}`;
    }
    
    return formatted.trim();
  };

  const handleChange = (e) => {
    const input = e.target.value;
    const formatted = formatPhoneNumber(input);
    onChange(formatted);
  };

  const handleKeyDown = (e) => {
    // Allow: backspace, delete, tab, escape, enter
    if ([46, 8, 9, 27, 13].includes(e.keyCode) ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
      return;
    }
    
    // Ensure that it's a number and stop the keypress if not
    if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  };

  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <FaPhone />
      </div>
      <input
        type="tel"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || "+998 99 999 99 99"}
        required={required}
        className={`pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue focus:border-blue outline-none transition-all ${className}`}
        maxLength={17}
      />
      {value && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
          {value.replace(/\D/g, '').length}/12
        </div>
      )}
    </div>
  );
};

export default PhoneInput;
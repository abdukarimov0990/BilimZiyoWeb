import React, { useState } from "react";

export default function Ielts() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    age: "",
  });

  const formatPhone = (value) => {
    let digits = value.replace(/\D/g, "");

    if (!digits.startsWith("998")) {
      digits = "998" + digits;
    }

    digits = digits.slice(0, 12);

    let formatted = "+" + digits;

    if (digits.length > 3) formatted = "+" + digits.slice(0, 3) + " " + digits.slice(3);
    if (digits.length > 5) formatted = "+" + digits.slice(0, 3) + " " + digits.slice(3, 5) + " " + digits.slice(5);
    if (digits.length > 8) formatted = "+" + digits.slice(0, 3) + " " + digits.slice(3, 5) + " " + digits.slice(5, 8) + " " + digits.slice(8);
    if (digits.length > 10) formatted = "+" + digits.slice(0, 3) + " " + digits.slice(3, 5) + " " + digits.slice(5, 8) + " " + digits.slice(8, 10) + " " + digits.slice(10);

    return formatted;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setForm({ ...form, phone: formatPhone(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      time: new Date().toLocaleString(),
    };

    try {
      await fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      alert("Ro'yxatdan o'tdingiz!");

      setForm({ name: "", phone: "", age: "" });
    } catch (error) {
      alert("Xatolik yuz berdi");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-white p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
          IELTS Mock Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Ism sharifi"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
          />

          <input
            type="text"
            name="phone"
            placeholder="+998 99 999 9999"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
          />

          <input
            type="number"
            name="age"
            placeholder="Yoshi"
            value={form.age}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
          />

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition"
          >
            Ro'yxatdan o'tish
          </button>
        </form>
      </div>
    </div>
  );
}

/*
GOOGLE SHEETS SCRIPT (Apps Script):

function doPost(e) {
  const sheet = SpreadsheetApp.openById("YOUR_SHEET_ID").getSheetByName("Sheet1");
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.name,
    data.phone,
    data.age,
    data.time
  ]);

  return ContentService.createTextOutput("Success");
}
*/

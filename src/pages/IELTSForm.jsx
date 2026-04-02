import { useState } from "react";
import { useNavigate } from "react-router";

const IELTSform = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");

  const [errors, setErrors] = useState({
    name: false,
    surname: false,
    phone: false,
    age: false,
  });

  const validatePhone = (phone) => {
    return /^\d{2} \d{3} \d{2} \d{2}$/.test(phone);
  };

  // Telefon raqamni formatlash funksiyasi
  const formatPhone = (value) => {
    // faqat raqamlarni qoldiramiz
    const digits = value.replace(/\D/g, "");
    // formatlash: XX XXX XX XX
    const part1 = digits.slice(0, 2);
    const part2 = digits.slice(2, 5);
    const part3 = digits.slice(5, 7);
    const part4 = digits.slice(7, 9);

    let formatted = "";
    if (part1) formatted = part1;
    if (part2) formatted += " " + part2;
    if (part3) formatted += " " + part3;
    if (part4) formatted += " " + part4;

    return formatted;
  };

  const handlePhoneChange = (e) => {
    setPhone(formatPhone(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      name: !name.trim(),
      surname: !surname.trim(),
      phone: !validatePhone(phone),
      age: !age || Number(age) <= 0,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    const now = new Date();

    const payload = {
      Ism: name,
      Familiya: surname,
      Telefon: "+998 " + phone,
      Yosh: age,
      SanaSoat: now.toLocaleDateString() + " " + now.toLocaleTimeString(),
    };

    localStorage.setItem("formData", JSON.stringify(payload));
    navigate("/thankyou");
  };

  return (
    <div className="min-h-screen flex mt-[-100px] items-center justify-center  px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 ">
        <h2 className="text-2xl font-bold text-center  text-[#0a192f] mb-6">
          IELTS MOCK EXAM | REGISTRATION
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
              placeholder="Ism"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">Ism kiriting</p>
            )}
          </div>

          {/* Surname */}
          <div>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
              placeholder="Familiya"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            {errors.surname && (
              <p className="text-red-500 text-sm mt-1">Familiya kiriting</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
              placeholder="88 888 88 88"
              value={phone}
              onChange={handlePhoneChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">Telefon noto‘g‘ri</p>
            )}
          </div>

          {/* Age */}
          <div>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
              placeholder="Yosh"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">Yosh kiriting</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#0a192f] text-white py-2 rounded-lg font-semibold hover:bg-[#112240] transition"
          >
            Yuborish
          </button>
        </form>
      </div>
    </div>
  );
};

export default IELTSform;
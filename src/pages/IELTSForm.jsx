import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const EXAM_DATE_SHEET_ID = "1y-SLaCkJUKYGWeF_Ic_nWjieK458qrhYWa8s83noWFI";
const EXAM_DATE_SHEET_NAME = "Lead";
const EXAM_DATE_RANGE = "B1";
const FALLBACK_EXAM_DATE = "2026-yil 3-aprelda";

const IELTSForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [examDateText, setExamDateText] = useState(FALLBACK_EXAM_DATE);
  const [isDateLoading, setIsDateLoading] = useState(true);

  const [errors, setErrors] = useState({
    name: false,
    surname: false,
    phone: false,
    age: false,
  });

  useEffect(() => {
    const fetchExamDate = async () => {
      if (!EXAM_DATE_SHEET_ID || EXAM_DATE_SHEET_ID === "PASTE_PUBLIC_SHEET_ID") {
        setIsDateLoading(false);
        return;
      }

      try {
        const normalizedRange = EXAM_DATE_RANGE.includes(":")
          ? EXAM_DATE_RANGE
          : `${EXAM_DATE_RANGE}:${EXAM_DATE_RANGE}`;

        const url = `https://docs.google.com/spreadsheets/d/${EXAM_DATE_SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(
          EXAM_DATE_SHEET_NAME
        )}&range=${encodeURIComponent(normalizedRange)}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`GViz CSV request failed with status ${response.status}`);
        }

        const text = (await response.text()).trim();
        const formattedDate = formatExamDate(text);

        if (formattedDate) {
          setExamDateText(formattedDate);
        }
      } catch (error) {
        console.error("Failed to fetch exam date from Google Sheets:", error);
      } finally {
        setIsDateLoading(false);
      }
    };

    fetchExamDate();
  }, []);

  const validatePhone = (value) => /^\d{2} \d{3} \d{2} \d{2}$/.test(value);

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 9);
    const part1 = digits.slice(0, 2);
    const part2 = digits.slice(2, 5);
    const part3 = digits.slice(5, 7);
    const part4 = digits.slice(7, 9);

    let formatted = "";
    if (part1) formatted = part1;
    if (part2) formatted += ` ${part2}`;
    if (part3) formatted += ` ${part3}`;
    if (part4) formatted += ` ${part4}`;

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
      Telefon: `+998 ${phone}`,
      Yosh: age,
      MockExamSana: examDateText,
      SanaSoat: `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`,
    };

    localStorage.setItem("formData", JSON.stringify(payload));
    navigate("/thankyou");
  };

  return (
    <section className="relative min-h-screen mt-[-100px] overflow-hidden bg-[#07111f] px-2.5 py-6 text-white md:px-6 md:py-12 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,229,2,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(3,53,104,0.55),_transparent_35%),linear-gradient(135deg,_#08101d_0%,_#0f2747_48%,_#07111f_100%)]" />
      <div className="absolute left-0 top-24 h-52 w-52 rounded-full bg-[#ffe502]/15 blur-3xl" />
      <div className="absolute bottom-12 right-0 h-64 w-64 rounded-full bg-[#ff7a00]/10 blur-3xl" />

      <div className="container relative z-10 flex min-h-[calc(100vh-6rem)] items-center">
        <div className="grid w-full overflow-hidden rounded-[22px] border border-white/10 bg-white/8 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl md:rounded-[32px] md:shadow-[0_30px_120px_rgba(0,0,0,0.35)] lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative flex flex-col justify-between border-b border-white/10 p-[clamp(14px,4vw,20px)] md:p-10 lg:border-b-0 lg:p-12">
            <div className="space-y-4 md:space-y-6">
              <span className="inline-flex w-fit items-center rounded-full border border-[#ffe502]/40 bg-[#ffe502]/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#ffe502] md:px-4 md:py-2 md:text-xs md:tracking-[0.28em]">
                IELTS Mock Exam
              </span>

              <div className="space-y-3 md:space-y-4">
                <h1 className="max-w-2xl text-[clamp(1.55rem,7vw,1.95rem)] font-black leading-[1.05] text-white md:text-5xl">
                  {isDateLoading ? "Mock exam sanasi yuklanmoqda..." : `${examDateText} bo'lib o'tadigan mock exam uchun registratsiyadan o'ting`}
                </h1>
                <p className="max-w-xl text-[clamp(13px,3.6vw,15px)] leading-5 text-white/75 md:text-base md:leading-7">
                  Natijangizni oldindan sinab ko'ring, real imtihon formatiga moslashib oling va Bilim Ziyo jamoasidan tezkor aloqa oling.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-2.5 sm:grid-cols-3 md:mt-8 md:gap-4">
              <div className="rounded-[18px] border border-white/10 bg-white/10 p-3 sm:rounded-[24px] sm:p-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">Format</p>
                <p className="mt-1.5 text-[15px] font-bold leading-5 md:mt-2 md:text-lg">Academic / General</p>
              </div>
              <div className="rounded-[18px] border border-white/10 bg-white/10 p-3 sm:rounded-[24px] sm:p-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">Natija</p>
                <p className="mt-1.5 text-[15px] font-bold leading-5 md:mt-2 md:text-lg">Tahlil bilan</p>
              </div>
              <div className="rounded-[18px] border border-white/10 bg-white/10 p-3 sm:rounded-[24px] sm:p-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">Aloqa</p>
                <p className="mt-1.5 text-[15px] font-bold leading-5 md:mt-2 md:text-lg">Tez tasdiq</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-[clamp(12px,3.7vw,16px)] text-[#0a192f] md:p-8 lg:p-10">
            <div className="mx-auto max-w-md">
              <div className="mb-4 rounded-[20px] bg-[linear-gradient(180deg,#ffffff_0%,#f7f9fc_100%)] p-1 md:mb-8 md:rounded-none md:bg-none md:p-0">
                <div className="rounded-[18px] border border-slate-100 bg-white p-3.5 shadow-[0_10px_28px_rgba(3,53,104,0.06)] md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#033568]/60 md:text-sm md:tracking-[0.24em]">
                    Registration Form
                  </p>
                  <h2 className="mt-2 text-[clamp(1.45rem,6vw,1.9rem)] font-black leading-tight md:mt-3 md:text-3xl">
                    Joyingizni hozir band qiling
                  </h2>
                  <p className="mt-2 text-[13px] leading-5 text-slate-500 md:mt-3 md:text-sm md:leading-6">
                    Ma'lumotlaringizni qoldiring. Tasdiqlash bo'yicha jamoamiz siz bilan bog'lanadi.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <div>
                  <label className="mb-1.5 block text-[13px] font-semibold text-slate-700 md:mb-2 md:text-sm">
                    Ism
                  </label>
                  <input
                    className="w-full rounded-[18px] border border-slate-200 bg-slate-50 px-3.5 py-3.5 text-[15px] outline-none transition placeholder:text-slate-400 focus:border-[#033568] focus:bg-white focus:ring-4 focus:ring-[#033568]/10 md:rounded-2xl md:px-4 md:py-3.5 md:text-base"
                    placeholder="Ismingizni kiriting"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-500">Ism kiriting</p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-[13px] font-semibold text-slate-700 md:mb-2 md:text-sm">
                    Familiya
                  </label>
                  <input
                    className="w-full rounded-[18px] border border-slate-200 bg-slate-50 px-3.5 py-3.5 text-[15px] outline-none transition placeholder:text-slate-400 focus:border-[#033568] focus:bg-white focus:ring-4 focus:ring-[#033568]/10 md:rounded-2xl md:px-4 md:py-3.5 md:text-base"
                    placeholder="Familiyangizni kiriting"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                  {errors.surname && (
                    <p className="mt-2 text-sm text-red-500">Familiya kiriting</p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-[13px] font-semibold text-slate-700 md:mb-2 md:text-sm">
                    Telefon raqam
                  </label>
                  <div className="flex items-center rounded-[18px] border border-slate-200 bg-slate-50 px-3.5 transition focus-within:border-[#033568] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#033568]/10 md:rounded-2xl md:px-4">
                    <span className="mr-2.5 border-r border-slate-200 pr-2.5 text-[13px] font-semibold text-slate-500 md:mr-3 md:pr-3 md:text-sm">
                      +998
                    </span>
                    <input
                      type="tel"
                      className="w-full bg-transparent py-3.5 text-[15px] outline-none placeholder:text-slate-400 md:py-3.5 md:text-base"
                      placeholder="90 123 45 67"
                      value={phone}
                      onChange={handlePhoneChange}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-500">Telefon raqamni to'g'ri kiriting</p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-[13px] font-semibold text-slate-700 md:mb-2 md:text-sm">
                    Yosh
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-[18px] border border-slate-200 bg-slate-50 px-3.5 py-3.5 text-[15px] outline-none transition placeholder:text-slate-400 focus:border-[#033568] focus:bg-white focus:ring-4 focus:ring-[#033568]/10 md:rounded-2xl md:px-4 md:py-3.5 md:text-base"
                    placeholder="Yoshingiz"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                  {errors.age && (
                    <p className="mt-2 text-sm text-red-500">Yosh kiriting</p>
                  )}
                </div>

                <div className="rounded-[18px] border border-[#033568]/8 bg-[linear-gradient(180deg,#f8fbff_0%,#f2f7fc_100%)] p-3.5 text-sm leading-5 text-slate-600 md:rounded-[24px] md:p-4 md:leading-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#033568]/70">Mock exam sanasi</p>
                  <p className="mt-1.5 text-[15px] font-semibold text-[#033568] md:mt-2 md:text-base">
                    {isDateLoading ? "Google Sheets'dan sana olinmoqda..." : examDateText}
                  </p>
                </div>

                <div className="sticky bottom-2 z-10 bg-white/96 pt-1.5 md:static md:bg-transparent md:pt-0">
                  <button
                    type="submit"
                    className="w-full rounded-[18px] bg-[#033568] px-5 py-3.5 text-[15px] font-bold text-white shadow-[0_12px_28px_rgba(3,53,104,0.22)] transition hover:bg-[#02284f] md:rounded-2xl md:px-6 md:py-4 md:text-base md:shadow-none"
                  >
                    Registratsiyani yuborish
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const formatExamDate = (rawText) => {
  if (!rawText) return null;

  const normalizedCsvValue = rawText
    .split("\n")[0]
    .replace(/^"|"$/g, "")
    .replace(/""/g, '"')
    .trim();

  if (!normalizedCsvValue) {
    return null;
  }

  return normalizeDateLabel(normalizedCsvValue);
};

const normalizeDateLabel = (value) => {
  const rawValue = value.trim();
  const dateFromGviz = rawValue.match(/Date\((\d+),(\d+),(\d+)/);

  if (dateFromGviz) {
    const year = Number(dateFromGviz[1]);
    const monthIndex = Number(dateFromGviz[2]);
    const day = Number(dateFromGviz[3]);

    return formatUzbekDate(new Date(year, monthIndex, day));
  }

  const parsedDate = new Date(rawValue);
  if (!Number.isNaN(parsedDate.getTime())) {
    return formatUzbekDate(parsedDate);
  }

  if (rawValue.endsWith("da")) {
    return rawValue;
  }

  return `${rawValue}da`;
};

const formatUzbekDate = (date) => {
  const months = [
    "yanvar",
    "fevral",
    "mart",
    "aprel",
    "may",
    "iyun",
    "iyul",
    "avgust",
    "sentabr",
    "oktabr",
    "noyabr",
    "dekabr",
  ];

  return `${date.getFullYear()}-yil ${date.getDate()}-${months[date.getMonth()]}da`;
};

export default IELTSForm;

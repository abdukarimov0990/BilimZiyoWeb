import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, CheckCircle2, RefreshCcw, XCircle } from "lucide-react";
import { TELEGRAM_BOT_LINK } from "../constants/telegram";

const ThankYou = () => {
  const [error, setError] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    const sendData = async () => {
      const raw = localStorage.getItem("formData");
      if (!raw) return;

      const data = JSON.parse(raw);
      setSubmittedData(data);

      const formData = new FormData();
      formData.append("sheetName", "Lead");
      formData.append("Ism", data.Ism);
      formData.append("Familiya", data.Familiya);
      formData.append("Telefon raqam", data.Telefon);
      formData.append("Yosh", data.Yosh);
      formData.append("SanaSoat", data.SanaSoat);

      try {
        const res = await fetch(
          "https://script.google.com/macros/s/AKfycbziQIcrZ-DNDK-UzTRNMHZfObsPncfioTvVQRug9_ZUOb1D23fuyL3spDVKqnDbYMogLQ/exec",
          {
            method: "POST",
            body: formData,
          }
        );

        if (res.ok) {
          localStorage.removeItem("formData");
        } else {
          throw new Error("Failed");
        }
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    sendData();
  }, []);


  
  const statusConfig = error
    ? {
        badge: "Yuborilmadi",
        title: "Xatolik yuz berdi",
        description:
          "Ma'lumotni yuborishda muammo bo'ldi. Internetni tekshirib, sahifani qayta oching yoki keyinroq yana urinib ko'ring.",
        accent: "text-red-400",
        border: "border-red-400/30",
        panel: "bg-red-500/10",
        icon: <XCircle className="h-16 w-16 text-red-400" strokeWidth={1.8} />,
        actionLabel: "Qayta urinib ko'rish",
        actionIcon: <RefreshCcw className="h-4 w-4" />,
        actionHref: "/mock",
        actionClass:
          "bg-red-500 text-white hover:bg-red-600",
      }
    : {
        badge: "Tasdiqlandi",
        title: "Registratsiya qabul qilindi",
        description:
          "So'rovingiz muvaffaqiyatli yuborildi. Jamoamiz ma'lumotlarni ko'rib chiqib, siz bilan tez orada bog'lanadi.",
        accent: "text-[#ffe502]",
        border: "border-[#ffe502]/30",
        panel: "bg-[#ffe502]/10",
        icon: <CheckCircle2 className="h-16 w-16 text-[#ffe502]" strokeWidth={1.8} />,
        actionLabel: "Bosh sahifaga qaytish",
        actionIcon: <ArrowLeft className="h-4 w-4" />,
        actionHref: "/",
        actionClass:
          "bg-[#ffe502] text-[#08101d] hover:bg-[#f5da00]",
      };

  return (
    <section className="relative mt-[-100px] min-h-screen overflow-hidden bg-[#07111f] px-2.5 py-6 text-white md:px-6 md:py-12 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,229,2,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(3,53,104,0.55),_transparent_35%),linear-gradient(135deg,_#08101d_0%,_#0f2747_48%,_#07111f_100%)]" />
      <div className="absolute left-0 top-24 h-52 w-52 rounded-full bg-[#ffe502]/15 blur-3xl" />
      <div className="absolute bottom-12 right-0 h-64 w-64 rounded-full bg-[#ff7a00]/10 blur-3xl" />

      <div className="container relative z-10 flex min-h-[calc(100vh-6rem)] items-center">
        <div className="grid w-full overflow-hidden rounded-[22px] border border-white/10 bg-white/8 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl md:rounded-[32px] md:shadow-[0_30px_120px_rgba(0,0,0,0.35)] lg:grid-cols-[1.02fr_0.98fr]">
          <div className="flex flex-col justify-between border-b border-white/10 p-[clamp(14px,4vw,20px)] md:p-10 lg:border-b-0 lg:p-12">
            <div className="space-y-4 md:space-y-6">
              <span
                className={`inline-flex w-fit items-center rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] md:px-4 md:py-2 md:text-xs md:tracking-[0.28em] ${statusConfig.border} ${statusConfig.accent} ${statusConfig.panel}`}
              >
                Mock Exam Registration
              </span>

              <div className="space-y-3 md:space-y-4">
                {statusConfig.icon}
                <h1 className="max-w-2xl text-[clamp(1.55rem,7vw,1.95rem)] font-black leading-[1.05] text-white md:text-5xl">
                  {statusConfig.title}
                </h1>
                <p className="max-w-xl text-[clamp(13px,3.6vw,15px)] leading-5 text-white/75 md:text-base md:leading-7">
                  {statusConfig.description}
                </p>
              </div>
            </div>

          </div>

          <div className="bg-white p-[clamp(12px,3.7vw,16px)] text-[#0a192f] md:p-8 lg:p-10">
            <div className="mx-auto flex h-full max-w-md flex-col justify-between">
              <div>
                <div className="rounded-[20px] bg-[linear-gradient(180deg,#ffffff_0%,#f7f9fc_100%)] p-1 md:rounded-none md:bg-none md:p-0">
                  <div className="rounded-[18px] border border-slate-100 bg-white p-3.5 shadow-[0_10px_28px_rgba(3,53,104,0.06)] md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#033568]/60 md:text-sm md:tracking-[0.24em]">
                      Submission Summary
                    </p>
                    <h2 className="mt-2 text-[clamp(1.45rem,6vw,1.9rem)] font-black leading-tight md:mt-3 md:text-3xl">
                      Qabul qilingan ma'lumotlar
                    </h2>
                    <p className="mt-2 text-[13px] leading-5 text-slate-500 md:mt-3 md:text-sm md:leading-6">
                      Quyida yuborilgan registratsiya ma'lumotlari ko'rsatilgan.
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-3 md:mt-8 md:space-y-4">
                  <SummaryRow
                    label="Ism"
                    value={submittedData?.Ism}
                  />
                  <SummaryRow
                    label="Familiya"
                    value={submittedData?.Familiya}
                  />
                  <SummaryRow
                    label="Telefon"
                    value={submittedData?.Telefon}
                  />
                  <SummaryRow
                    label="Yosh"
                    value={submittedData?.Yosh}
                  />
                  <SummaryRow
                    label="Mock exam sanasi"
                    value={submittedData?.MockExamSana}
                  />
                </div>

                <div className="mt-4 rounded-[18px] border border-[#033568]/8 bg-[linear-gradient(180deg,#f8fbff_0%,#f2f7fc_100%)] px-3.5 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] md:mt-6 md:rounded-2xl md:px-4 md:py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#033568]/60">
                    Telegram bot
                  </p>
                  <h3 className="mt-2 text-[15px] font-bold leading-6 text-slate-800 md:text-base">
                    Ro'yxatdan o'tganingiz uchun rahmat!
                  </h3>
                  <p className="mt-2 text-[13px] leading-5 text-slate-500 md:text-sm md:leading-6">
                    Mock exam haqida muhim ma'lumotlarni olish uchun Telegram botga o'ting:
                  </p>
                  <a
                    href={TELEGRAM_BOT_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-[18px] bg-[#033568] px-5 py-3.5 text-[15px] font-bold text-white transition hover:bg-[#02284f] md:rounded-2xl md:px-6 md:py-4 md:text-base"
                  >
                    Botga o'tish
                  </a>
                </div>
              </div>

              <div className="sticky bottom-2 z-10 mt-6 space-y-2.5 bg-white/96 pt-1.5 md:static md:mt-10 md:space-y-4 md:bg-transparent md:pt-0">
                <Link
                  to={statusConfig.actionHref}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-[18px] px-5 py-3.5 text-[15px] font-bold transition md:rounded-2xl md:px-6 md:py-4 md:text-base ${statusConfig.actionClass}`}
                >
                  {statusConfig.actionIcon}
                  {statusConfig.actionLabel}
                </Link>

                <Link
                  to="/mock"
                  className="inline-flex w-full items-center justify-center rounded-[18px] border border-slate-200 px-5 py-3.5 text-[15px] font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 md:rounded-2xl md:px-6 md:py-4 md:text-base"
                >
                  Formaga qaytish
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SummaryRow = ({ label, value }) => (
  <div className="rounded-[18px] border border-slate-200 bg-[linear-gradient(180deg,#fbfcfe_0%,#f7f9fc_100%)] px-3.5 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] md:rounded-2xl md:px-4 md:py-4">
    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 md:text-xs">
      {label}
    </p>
    <p className="mt-2 text-[15px] font-semibold leading-6 text-slate-800 md:text-base">
      {value || "Mavjud emas"}
    </p>
  </div>
);

export default ThankYou;

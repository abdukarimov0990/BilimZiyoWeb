import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, CheckCircle2, RefreshCcw, XCircle } from "lucide-react";

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
    <section className="relative mt-[-100px] min-h-screen overflow-hidden bg-[#07111f] px-4 py-12 text-white md:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,229,2,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(3,53,104,0.55),_transparent_35%),linear-gradient(135deg,_#08101d_0%,_#0f2747_48%,_#07111f_100%)]" />
      <div className="absolute left-0 top-24 h-52 w-52 rounded-full bg-[#ffe502]/15 blur-3xl" />
      <div className="absolute bottom-12 right-0 h-64 w-64 rounded-full bg-[#ff7a00]/10 blur-3xl" />

      <div className="container relative z-10 flex min-h-[calc(100vh-6rem)] items-center">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-white/10 bg-white/8 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:grid-cols-[1.02fr_0.98fr]">
          <div className="flex flex-col justify-between p-8 md:p-10 lg:p-12">
            <div className="space-y-6">
              <span
                className={`inline-flex w-fit items-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] ${statusConfig.border} ${statusConfig.accent} ${statusConfig.panel}`}
              >
                Mock Exam Registration
              </span>

              <div className="space-y-4">
                {statusConfig.icon}
                <h1 className="max-w-2xl text-3xl font-black leading-tight text-white md:text-5xl">
                  {statusConfig.title}
                </h1>
                <p className="max-w-xl text-sm leading-7 text-white/75 md:text-base">
                  {statusConfig.description}
                </p>
              </div>
            </div>

          </div>

          <div className="bg-white p-6 text-[#0a192f] md:p-8 lg:p-10">
            <div className="mx-auto flex h-full max-w-md flex-col justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#033568]/60">
                  Submission Summary
                </p>
                <h2 className="mt-3 text-3xl font-black leading-tight">
                  Qabul qilingan ma'lumotlar
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Quyida yuborilgan registratsiya ma'lumotlari ko'rsatilgan.
                </p>

                <div className="mt-8 space-y-4">
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
              </div>

              <div className="mt-10 space-y-4">
                <Link
                  to={statusConfig.actionHref}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-bold transition ${statusConfig.actionClass}`}
                >
                  {statusConfig.actionIcon}
                  {statusConfig.actionLabel}
                </Link>

                <Link
                  to="/mock"
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 px-6 py-4 text-base font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
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
  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
      {label}
    </p>
    <p className="mt-2 text-base font-semibold text-slate-800">
      {value || "Mavjud emas"}
    </p>
  </div>
);

export default ThankYou;

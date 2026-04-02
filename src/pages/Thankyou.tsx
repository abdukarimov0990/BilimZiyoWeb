import { useEffect, useState } from "react";

const ThankYou = () => {
  const [error, setError] = useState(false);

  useEffect(() => {
    const sendData = async () => {
      const raw = localStorage.getItem("formData");
      if (!raw) return;

      const data = JSON.parse(raw);

      const formData = new FormData();
      formData.append("sheetName", "Lead");
      formData.append("Ism", data.Ism);
      formData.append("Familiya", data.Familiya);
      formData.append("Telefon raqam", data.Telefon);
      formData.append("Yosh", data.Yosh);
      formData.append("SanaSoat", data.SanaSoat);

      try {
        const res = await fetch(
          "https://script.google.com/macros/s/AKfycbyrCNyKrrK5rPSWWl5lKadCH4P-cdEmU_O1PFmzZClJMjZqfmNEzEVCDR_Mdv1WHWr_hQ/exec",
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

  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h1>Rahmat!</h1>
      <p>Ma'lumotlaringiz yuborildi</p>

      {error && <p style={{ color: "red" }}>Xatolik yuz berdi!</p>}
    </div>
  );
};

export default ThankYou;
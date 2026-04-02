import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

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

  return (
    <div style={styles.container} className="mt-[-100px]">
      <div style={styles.card}>
        {!error ? (
          <>
            <CheckCircle size={64} color="#1E3A8A" style={{ marginBottom: 20 }} />
            <h1 style={styles.heading}>Rahmat!</h1>
            <p style={styles.text}>
              Sizning ma'lumotlaringiz muvaffaqiyatli yuborildi. <br />
              Biz tez orada siz bilan bog'lanamiz.
            </p>
          </>
        ) : (
          <>
            <XCircle size={64} color="#EF4444" style={{ marginBottom: 20 }} />
            <h1 style={{ ...styles.heading, color: "#EF4444" }}>Xatolik yuz berdi!</h1>
            <p style={styles.text}>
              Ma'lumot yuborishda muammo bo'ldi. <br />
              Iltimos, sahifani yangilang yoki keyinroq qayta urinib ko'ring.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#1E3A8A", // navy
    padding: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "50px 40px",
    borderRadius: "25px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
    textAlign: "center",
    maxWidth: "450px",
    width: "100%",
    transition: "transform 0.3s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "15px",
    color: "#1E3A8A",
    fontFamily: "'Poppins', sans-serif",
  },
  text: {
    fontSize: "1.2rem",
    lineHeight: "1.6",
    color: "#333",
    textAlign: "center",
  },
};

export default ThankYou;
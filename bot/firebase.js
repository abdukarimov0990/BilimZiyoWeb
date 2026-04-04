import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function getDb() {
  if (!getApps().length) {
    // serverAccount.json dan o'qish
    const saPath = join(__dirname, "serverAccount.json");
    try {
      const sa = JSON.parse(readFileSync(saPath, "utf-8"));
      initializeApp({
        credential: cert(sa),
      });
    } catch (err) {
      // Fallback: env dan o'qish
      const projectId = process.env.FIREBASE_PROJECT_ID;
      const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
      const privateKey = process.env.FIREBASE_PRIVATE_KEY;

      if (!projectId || !clientEmail || !privateKey) {
        throw new Error("Firebase credentials topilmadi.");
      }

      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, "\n"),
        }),
      });
    }
  }

  return getFirestore();
}

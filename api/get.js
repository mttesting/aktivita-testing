import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database'; // changed import

const firebaseConfig = {
  apiKey: "AIzaSyAI0SM8STSA-ZLKmRYKBt13dPHmi-BY_bw",
  authDomain: "status2-ccf4d.firebaseapp.com",
  databaseURL: "https://status2-ccf4d-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "status2-ccf4d",
  storageBucket: "status2-ccf4d.appspot.com",
  messagingSenderId: "170845328997",
  appId: "1:170845328997:web:3243e6d771ae6f5c85d88c",
  measurementId: "G-E9TSV3D5K9"
};

// Firebase init safe
let app;
if (!global._firebaseApp) {
  app = initializeApp(firebaseConfig);
  global._firebaseApp = app;
} else {
  app = global._firebaseApp;
}

export default async function handler(req, res) {

  console.log("🔥 handler start");
  if (req.method !== "POST") {
    console.log("❌ Wrong method: " + req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { usr } = req.body || {}; // removed 'data'
    console.log("📥 Body received");

    /*if (pw !== "frconzole24") {
      debug.push("❌ Bad password");
      return res.status(401).json({ error: "Unauthorized" });
    }*/

    if (typeof usr !== "string") {
      console.log("❌ Invalid 'path' type");
      return res.status(400).json({ error: "'usr' must be a string" });
    }

    const db = getDatabase(app);
    const dataRef = ref(db, "users/"+usr);
    const snapshot = await get(dataRef);

    if (!snapshot.exists()) {
      console.log("⚠️ No data found at: " + "users/"+usr);
      return res.status(404).json({ error: "No data found" });
    }

    console.log("✅ Data read from: " + "users/"+usr);
    return res.status(200).json({ success: true, data: snapshot.val() });

  } catch (err) {
    console.log("💥 Exception: " + err.message);
    return res.status(500).json({ error: err.message });
  }
}
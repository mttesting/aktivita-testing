import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAI0SM8STSA-ZLKmRYKBt13dPHmi-BY_bw",
  authDomain: "status2-ccf4d.firebaseapp.com",
  databaseURL: "https://status2-ccf4d-default-rtdb.europe-west1.firebasedatabase.app",
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
  const debug = [];

  debug.push("🔥 handler start");
  if (req.method !== "POST") {
    debug.push("❌ Wrong method: " + req.method);
    return res.status(405).json({ error: "Method not allowed", debug });
  }

  try {
    const { pw, path, data } = req.body || {};
    debug.push("📥 Body received", { pw, path, data });

    if (pw !== "frconzole24") {
      debug.push("❌ Bad password");
      return res.status(401).json({ error: "Unauthorized", debug });
    }

    if (typeof path !== "string") {
      debug.push("❌ Invalid 'path' type");
      return res.status(400).json({ error: "'path' must be a string", debug });
    }

    if (typeof data !== "object" || data === null) {
      debug.push("❌ Invalid 'data' type");
      return res.status(400).json({ error: "'data' must be an object", debug });
    }

    const db = getDatabase(app);
    const dataRef = ref(db, path);
    await set(dataRef, data);

    debug.push("✅ Data saved to: " + path);
    return res.status(200).json({ success: true, debug });

  } catch (err) {
    debug.push("💥 Exception: " + err.message);
    return res.status(500).json({ error: err.message, debug });
  }
}

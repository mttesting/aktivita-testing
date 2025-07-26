// api/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAI0SM8STSA-ZLKmRYKBt13dPHmi-BY_bw",
  authDomain: "status2-ccf4d.firebaseapp.com",
  databaseURL: "https://status2-ccf4d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "status2-ccf4d",
  storageBucket: "status2-ccf4d.firebasestorage.app",
  messagingSenderId: "170845328997",
  appId: "1:170845328997:web:3243e6d771ae6f5c85d88c",
  measurementId: "G-E9TSV3D5K9"
};

// Initialize only once (Firebase client SDK has no check for this in Node)
let app;
if (!global._firebaseApp) {
  app = initializeApp(firebaseConfig);
  global._firebaseApp = app;
} else {
  app = global._firebaseApp;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ error: "Method not allowed" });
  }

  try {
    const { pw, path, data } = req.body;

    if (pw !== "frconzole24") {
      return res.status(200).json({ error: "Unauthorized" });
    }
    if (![pw, path].every(x => typeof x === 'string') || typeof data !== 'object') {
      return res.status(200).json({ error: "Invalid input types" });
    }

    const db = getDatabase(app);
    const dataRef = ref(db, path);
    await set(dataRef, data);

    res.status(200).json({ success: true, error: "OK" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Firebase の初期化。
// ▼▼▼ 要設定 ▼▼▼
// Firebase コンソール → プロジェクトの設定 → 「マイアプリ」でウェブアプリ(</>)を登録し、
// 表示される firebaseConfig をそのまま下に貼り付けてください。
// （apiKey 等はクライアントに公開される前提の値で機密ではありません。保護は Firestore ルールで行います）
//
// あわせてコンソールで以下を有効化してください:
//   1) Authentication → Sign-in method → Google を有効化
//   2) Firestore Database を作成（本番モード）
//   3) firestore.rules をデプロイ（firebase deploy --only firestore:rules）
// ▲▲▲ 要設定 ▲▲▲
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  "projectId": "eiken-trainer",
  "appId": "1:291627059402:web:155c0bba604979380d4c33",
  "storageBucket": "eiken-trainer.firebasestorage.app",
  "apiKey": "AIzaSyB02fzWA4m_hdeSR-csu7GeIZhuUgAQubA",
  "authDomain": "eiken-trainer.firebaseapp.com",
  "messagingSenderId": "291627059402",
  "measurementId": "G-9TK94DL1VY",
  "projectNumber": "291627059402",
  "version": "2"
};

// 設定が未入力ならログイン機能を無効化（オフライン/localStorage のみで動作）
export const firebaseReady = !firebaseConfig.apiKey.startsWith("REPLACE_WITH");

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

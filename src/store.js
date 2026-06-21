// 学習データの保存層。
// - localStorage（オフライン/未ログイン時のキャッシュ）
// - Firestore（ログイン時のクラウド保存）
// - 旧フォーマット（セッション履歴が無い版）からの変換
import { db } from "./firebase.js";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const LS_KEYS = {
  records: "eiken_targeted_v1",   // 問題ID単位の記録 { [qid]: {attempts, correct, lastWrong, ts} }
  exams: "eiken_exams_v1",        // 中間/総合テストの合否 { [examKey]: {rate, correct, total, pass, ts} }
  sessions: "eiken_sessions_v1",  // ターゲット別の直近テスト正答率 { [grade|key]: [rate, ...] }
};

function lsGet(key) {
  try { const r = window.localStorage?.getItem(key); return r ? JSON.parse(r) : null; } catch (e) { return null; }
}

// localStorage から3ストアを読み出す
export function readLocal() {
  return {
    records: lsGet(LS_KEYS.records) || {},
    examRecords: lsGet(LS_KEYS.exams) || {},
    sessionRecords: lsGet(LS_KEYS.sessions) || {},
  };
}

// 旧フォーマット（sessionRecords が無い）の場合、問題ID単位の記録から
// ターゲット別の「合成セッション」を1件作って習得率を引き継ぐ。
// makeKey(grade, key) でセッションキーを作る。targets は [{grade, key, questionIds}]。
export function convertLegacy(data, targets) {
  const hasSessions = data.sessionRecords && Object.keys(data.sessionRecords).length > 0;
  if (hasSessions) return data; // 既に新フォーマット
  const records = data.records || {};
  if (Object.keys(records).length === 0) return data; // 変換元が無い
  const sessionRecords = {};
  for (const t of targets) {
    let seen = 0, lastCorrect = 0;
    for (const qid of t.questionIds) {
      const r = records[qid];
      if (r && r.attempts > 0) { seen += 1; if (!r.lastWrong) lastCorrect += 1; }
    }
    if (seen > 0) sessionRecords[t.sessionKey] = [lastCorrect / seen]; // 合成セッション1件
  }
  return { ...data, sessionRecords };
}

// クラウド優先でローカルと統合。records/exams は ts の新しい方を採用、sessions はクラウド優先。
export function mergeData(local, cloud) {
  if (!cloud) return local;
  const pickNewer = (a, b) => {
    const out = { ...(a || {}) };
    for (const [k, v] of Object.entries(b || {})) {
      const cur = out[k];
      if (!cur || (v?.ts || 0) >= (cur?.ts || 0)) out[k] = v;
    }
    return out;
  };
  return {
    records: pickNewer(local.records, cloud.records),
    examRecords: pickNewer(local.examRecords, cloud.examRecords),
    sessionRecords: { ...(local.sessionRecords || {}), ...(cloud.sessionRecords || {}) },
  };
}

export async function loadCloud(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}

export async function saveCloud(uid, data) {
  await setDoc(
    doc(db, "users", uid),
    {
      records: data.records || {},
      examRecords: data.examRecords || {},
      sessionRecords: data.sessionRecords || {},
      updatedAt: Date.now(),
    },
    { merge: true }
  );
}

// 全問題データを統合する単一エントリポイント。
// 級・文法ターゲット・単語ユニットの追加はこの構造に沿って data/ 内を編集するだけでよい。
import { G5 } from "./data/g5.js";
import { G4 } from "./data/g4.js";
import { G3 } from "./data/g3.js";
import { V5 } from "./data/v5.js";
import { V4 } from "./data/v4.js";
import { V3 } from "./data/v3.js";

export const BANK = {
  "5": { label: "5級", sub: "中1初級", grammar: G5, vocab: V5 },
  "4": { label: "4級", sub: "中2程度", grammar: G4, vocab: V4 },
  "3": { label: "3級", sub: "中卒程度", grammar: G3, vocab: V3 },
};

// 中間テスト・総合テストの定義（再エクスポート）
export { EXAMS } from "./data/exams.js";

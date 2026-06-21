// 全問題データを統合する単一エントリポイント。
// 級・文法ターゲット・単語ユニットの追加はこの構造に沿って data/ 内を編集するだけでよい。
import { G5 } from "./data/g5.js";
import { G4 } from "./data/g4.js";
import { G3 } from "./data/g3.js";
import { V5 } from "./data/v5.js";
import { V4 } from "./data/v4.js";
import { V3 } from "./data/v3.js";
import { GP2 } from "./data/gp2.js";
import { G2 } from "./data/g2.js";
import { GP1 } from "./data/gp1.js";
import { G1 } from "./data/g1.js";
import { VP2 } from "./data/vp2.js";
import { V2 } from "./data/v2.js";
import { VP1 } from "./data/vp1.js";
import { V1 } from "./data/v1.js";

export const BANK = {
  "5": { label: "5級", sub: "中1初級", grammar: G5, vocab: V5 },
  "4": { label: "4級", sub: "中2程度", grammar: G4, vocab: V4 },
  "3": { label: "3級", sub: "中卒程度", grammar: G3, vocab: V3 },
  "p2": { label: "準2級", sub: "高校中級", grammar: GP2, vocab: VP2 },
  "2": { label: "2級", sub: "高校卒業", grammar: G2, vocab: V2 },
  "p1": { label: "準1級", sub: "大学中級", grammar: GP1, vocab: VP1 },
  "1": { label: "1級", sub: "大学上級", grammar: G1, vocab: V1 },
};

// 中間テスト・総合テストの定義（再エクスポート）
export { EXAMS } from "./data/exams.js";

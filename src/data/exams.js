// 中間テスト・総合テストの定義。
// 中間テスト(mid)は文法ターゲットをブロック単位でまとめたもの。targets は g*.js の key。
// 総合テスト(final)は全文法＋単語を範囲とするため、対象は BANK から動的に集約する（targets 列挙は不要）。
export const EXAMS = {
  "5": {
    mid: [
      { key: "5-mid-1", name: "中間1 be動詞・一般動詞", targets: ["be-aff", "be-neg-q", "verb-aff", "verb-neg-q", "third-person"] },
      { key: "5-mid-2", name: "中間2 名詞・代名詞・冠詞", targets: ["pronoun", "plural", "article", "demonstrative"] },
      { key: "5-mid-3", name: "中間3 疑問詞・進行形", targets: ["wh-question", "progressive"] },
      { key: "5-mid-4", name: "中間4 助動詞・命令文・前置詞", targets: ["can", "imperative", "preposition"] },
    ],
    final: { key: "5-final", name: "総合テスト" },
  },
  "4": {
    mid: [
      { key: "4-mid-1", name: "中間1 過去形", targets: ["past-regular", "past-irregular", "past-be", "past-neg-q"] },
      { key: "4-mid-2", name: "中間2 未来・過去進行形", targets: ["future", "past-progressive"] },
      { key: "4-mid-3", name: "中間3 比較表現", targets: ["comparative", "superlative", "as-as"] },
      { key: "4-mid-4", name: "中間4 不定詞・動名詞・接続詞ほか", targets: ["infinitive", "gerund", "conjunction", "modal", "there-is"] },
    ],
    final: { key: "4-final", name: "総合テスト" },
  },
  "3": {
    mid: [
      { key: "3-mid-1", name: "中間1 現在完了", targets: ["present-perfect-exp", "present-perfect-cont", "present-perfect-comp"] },
      { key: "3-mid-2", name: "中間2 受動態・不定詞・比較", targets: ["passive", "infinitive-adv", "comparison-3"] },
      { key: "3-mid-3", name: "中間3 関係代名詞・分詞", targets: ["rel-pron-subj", "rel-pron-obj", "participle"] },
      { key: "3-mid-4", name: "中間4 間接疑問・文型・接続詞that", targets: ["indirect-q", "svoo-svoc", "conj-that"] },
    ],
    final: { key: "3-final", name: "総合テスト" },
  },
  "p2": {
    mid: [
      { key: "p2-mid-1", name: "中間1 現在完了進行形・過去完了", targets: ["present-perfect-prog", "past-perfect"] },
      { key: "p2-mid-2", name: "中間2 関係副詞・仮定法過去", targets: ["relative-adv", "subjunctive-past"] },
      { key: "p2-mid-3", name: "中間3 使役・分詞構文", targets: ["causative", "participle-constr"] },
      { key: "p2-mid-4", name: "中間4 so/such・比較の応用", targets: ["so-such-that", "comparative-adv"] },
    ],
    final: { key: "p2-final", name: "総合テスト" },
  },
  "2": {
    mid: [
      { key: "2-mid-1", name: "中間1 仮定法過去完了・複合関係詞", targets: ["subjunctive-pp", "compound-rel"] },
      { key: "2-mid-2", name: "中間2 分詞構文・倒置", targets: ["participle-adv", "inversion"] },
      { key: "2-mid-3", name: "中間3 名詞節・完了不定詞", targets: ["noun-clause", "perfect-inf-gerund"] },
      { key: "2-mid-4", name: "中間4 譲歩・強調構文", targets: ["concession", "emphasis"] },
    ],
    final: { key: "2-final", name: "総合テスト" },
  },
  "p1": {
    mid: [
      { key: "p1-mid-1", name: "中間1 願望・仮定法の倒置", targets: ["wish-asif", "inversion-subjunctive"] },
      { key: "p1-mid-2", name: "中間2 助動詞+完了・関係詞応用", targets: ["modal-perfect", "advanced-relative"] },
      { key: "p1-mid-3", name: "中間3 高度な接続・独立分詞構文", targets: ["advanced-conjunction", "participle-absolute"] },
      { key: "p1-mid-4", name: "中間4 受動の慣用・比較の慣用", targets: ["special-passive", "advanced-comparison"] },
    ],
    final: { key: "p1-final", name: "総合テスト" },
  },
  "1": {
    mid: [
      { key: "1-mid-1", name: "中間1 仮定法特殊・強調倒置", targets: ["advanced-subjunctive", "emphatic-inversion"] },
      { key: "1-mid-2", name: "中間2 助動詞慣用・無生物主語", targets: ["advanced-modal", "nominalization"] },
      { key: "1-mid-3", name: "中間3 擬似分裂文・関係詞特殊", targets: ["cleft-pseudo", "advanced-relative-2"] },
      { key: "1-mid-4", name: "中間4 論理接続・慣用構文", targets: ["discourse-connectors", "idiomatic-structure"] },
    ],
    final: { key: "1-final", name: "総合テスト" },
  },
};

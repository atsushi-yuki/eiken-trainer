
import { useState, useMemo, useEffect, useRef } from "react";
import { BANK } from "./bank.js";

// ════════════════════════════════════════════════════════════
// 定義
// ════════════════════════════════════════════════════════════
const GRADE_ORDER = ["5", "4", "3"];
const VOCAB_UNITS = ["v-basic", "v-adv"];
const VOCAB_META = {
  "v-basic": { name: "単語・基礎", icon: "V", tone: "#0f9d76" },
  "v-adv": { name: "単語・応用", icon: "V+", tone: "#0a7d5c" },
};
const GRAMMAR_TONE = "#2b5fff";
const SECONDS_PER_Q = 75;
const VOCAB_PER_TEST = 12;   // 単語ユニットはストックから12問抽出
const STORAGE_KEY = "eiken_targeted_v1";

// 習熟ラベル（正答率ベース）
function masteryLabel(rate) {
  if (rate >= 0.85) return { text: "習得", color: "#1d8a5b" };
  if (rate >= 0.6) return { text: "あと一歩", color: "#c98a16" };
  return { text: "要強化", color: "#c0392b" };
}
// 母数が小さい文法ターゲットは「全問を直近正解」できているかで習得確定
function targetMastery(st) {
  if (st.rate === null) return null;
  const base = masteryLabel(st.rate);
  // 全問のうち8割以上を直近正解していないと「習得」にしない
  if (base.text === "習得" && st.masteredRatio < 0.8) return { text: "あと一歩", color: "#c98a16" };
  return base;
}
function fmtTime(s) { const m = Math.floor(s / 60); return `${m}:${String(s % 60).padStart(2, "0")}`; }
function shuffle(a) { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

// ════════════════════════════════════════════════════════════
// メイン
// ════════════════════════════════════════════════════════════
export default function EikenApp() {
  const [view, setView] = useState("home"); // home | gradeMap | test | result | dashboard | curriculum
  const [grade, setGrade] = useState(null);
  // 受験中の対象: { kind:"grammar"|"vocab", key } key=ターゲットkey or vocabユニットkey
  const [target, setTarget] = useState(null);
  const [mode, setMode] = useState("normal");
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [sessionResults, setSessionResults] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);
  const [records, setRecords] = useState({});

  useEffect(() => {
    try { const raw = window.localStorage?.getItem(STORAGE_KEY); if (raw) setRecords(JSON.parse(raw)); } catch (e) {}
  }, []);
  function persist(next) { setRecords(next); try { window.localStorage?.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {} }

  useEffect(() => {
    if (view !== "test") { clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => { if (t <= 1) { clearInterval(timerRef.current); setView("result"); return 0; } return t - 1; });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [view]);

  // 受験対象の問題プールを取得
  function getPool(g, tgt) {
    if (tgt.kind === "grammar") {
      const t = BANK[g].grammar.find((x) => x.key === tgt.key);
      return t ? t.questions : [];
    }
    return BANK[g].vocab[tgt.key].questions;
  }

  function startTest(g, tgt, m = "normal") {
    const pool = getPool(g, tgt);
    let qs;
    if (m === "review") {
      const wrong = pool.filter((q) => records[q.id]?.lastWrong);
      const base = wrong.length ? wrong : pool;
      // 文法は全問、単語は12問まで
      qs = tgt.kind === "grammar" ? shuffle(base) : shuffle(base).slice(0, VOCAB_PER_TEST);
    } else {
      // 文法ターゲットは全問出題（5〜7問なので15分に収まる）。単語は12問抽出。
      qs = tgt.kind === "grammar" ? shuffle(pool) : shuffle(pool).slice(0, VOCAB_PER_TEST);
    }
    setGrade(g); setTarget(tgt); setMode(m);
    setQuestions(qs); setIdx(0); setSelected(null); setAnswered(false); setSessionResults([]);
    setTimeLeft(qs.length * SECONDS_PER_Q);
    setView("test");
  }

  function submitAnswer() {
    if (selected === null || answered) return;
    const q = questions[idx]; const ok = selected === q.ans;
    setAnswered(true);
    setSessionResults((p) => [...p, { q, selected, correct: ok }]);
    const prev = records[q.id] || { attempts: 0, correct: 0 };
    persist({ ...records, [q.id]: { attempts: prev.attempts + 1, correct: prev.correct + (ok ? 1 : 0), lastWrong: !ok, ts: Date.now() } });
  }
  function nextQuestion() {
    if (idx + 1 >= questions.length) setView("result");
    else { setIdx(idx + 1); setSelected(null); setAnswered(false); }
  }

  // ── 集計: 文法ターゲット単位 ──
  const grammarStats = useMemo(() => {
    const map = {};
    GRADE_ORDER.forEach((g) => {
      BANK[g].grammar.forEach((t) => {
        let seen = 0, lastCorrect = 0;
        t.questions.forEach((q) => { const r = records[q.id]; if (r && r.attempts > 0) { seen += 1; if (!r.lastWrong) lastCorrect += 1; } });
        map[`${g}|${t.key}`] = {
          grade: g, key: t.key, name: t.name, struct: t.struct,
          total: t.questions.length, seen, lastCorrect,
          coverage: seen / t.questions.length,
          rate: seen ? lastCorrect / seen : null,
          masteredRatio: lastCorrect / t.questions.length,
        };
      });
    });
    return map;
  }, [records]);

  // ── 集計: 単語ユニット単位 ──
  const vocabStats = useMemo(() => {
    const map = {};
    GRADE_ORDER.forEach((g) => {
      VOCAB_UNITS.forEach((u) => {
        const unit = BANK[g].vocab[u];
        let seen = 0, lastCorrect = 0;
        unit.questions.forEach((q) => { const r = records[q.id]; if (r && r.attempts > 0) { seen += 1; if (!r.lastWrong) lastCorrect += 1; } });
        map[`${g}|${u}`] = {
          grade: g, key: u, name: unit.name,
          total: unit.questions.length, seen, lastCorrect,
          coverage: seen / unit.questions.length,
          rate: seen ? lastCorrect / seen : null,
          masteredRatio: lastCorrect / unit.questions.length,
        };
      });
    });
    return map;
  }, [records]);

  // ── 級サマリ ──
  const gradeSummary = useMemo(() => {
    return GRADE_ORDER.map((g) => {
      let seen = 0, lastCorrect = 0, total = 0;
      BANK[g].grammar.forEach((t) => { const s = grammarStats[`${g}|${t.key}`]; seen += s.seen; lastCorrect += s.lastCorrect; total += s.total; });
      VOCAB_UNITS.forEach((u) => { const s = vocabStats[`${g}|${u}`]; seen += s.seen; lastCorrect += s.lastCorrect; total += s.total; });
      return { key: g, label: BANK[g].label, sub: BANK[g].sub, coverage: total ? seen / total : 0, rate: seen ? lastCorrect / seen : null };
    });
  }, [grammarStats, vocabStats]);

  // ── カリキュラム自動生成（文法ターゲット + 単語ユニット） ──
  const curriculum = useMemo(() => {
    const items = [];
    GRADE_ORDER.forEach((g) => {
      BANK[g].grammar.forEach((t) => {
        const st = grammarStats[`${g}|${t.key}`];
        if (st.rate !== null && st.rate < 0.85) items.push({ kind: "grammar", ...st });
      });
      VOCAB_UNITS.forEach((u) => {
        const st = vocabStats[`${g}|${u}`];
        if (st.rate !== null && st.rate < 0.85) items.push({ kind: "vocab", ...st });
      });
    });
    items.sort((a, b) => a.rate - b.rate);
    return items.map((c, i) => {
      const priority = c.rate < 0.5 ? "高" : c.rate < 0.7 ? "中" : "低";
      const steps = c.kind === "grammar"
        ? [`「${c.name}」の形（${c.struct}）を確認する`, `このターゲットを解き直し、間違いを文ごと書き写す`, `復習モードで全問正解を目指す`]
        : [`「${c.name}」の頻出語を音読して暗記する`, `各語を使った短文を作る`, `復習モードで再テストする`];
      return { ...c, priority, order: i + 1, steps, gLabel: BANK[c.grade].label };
    });
  }, [grammarStats, vocabStats]);

  const s = STYLES;
  return (
    <div style={s.app}>
      <style>{CSS}</style>
      <header style={s.header}>
        <button style={s.brand} onClick={() => setView("home")}>
          <span style={s.brandMark}>英</span>
          <span><span style={s.brandTitle}>EIKEN TRAINER</span><span style={s.brandSub}>文法ターゲット × 単語 習熟度チェック</span></span>
        </button>
        <nav style={s.nav}>
          <NavBtn active={view === "home" || view === "gradeMap"} onClick={() => setView("home")}>ホーム</NavBtn>
          <NavBtn active={view === "dashboard"} onClick={() => setView("dashboard")}>分析</NavBtn>
          <NavBtn active={view === "curriculum"} onClick={() => setView("curriculum")}>カリキュラム</NavBtn>
        </nav>
      </header>

      <main style={s.main}>
        {view === "home" && <HomeView grades={gradeSummary} onPick={(g) => { setGrade(g); setView("gradeMap"); }} />}
        {view === "gradeMap" && grade && (
          <GradeMapView grade={grade} grammarStats={grammarStats} vocabStats={vocabStats}
            onStart={(tgt) => startTest(grade, tgt, "normal")}
            onReview={(tgt) => startTest(grade, tgt, "review")}
            onBack={() => setView("home")} records={records} />
        )}
        {view === "test" && questions.length > 0 && (
          <TestView q={questions[idx]} idx={idx} total={questions.length} selected={selected} answered={answered}
            mode={mode} timeLeft={timeLeft} grade={grade} target={target}
            onSelect={setSelected} onSubmit={submitAnswer} onNext={nextQuestion} onQuit={() => setView("gradeMap")} />
        )}
        {view === "result" && (
          <ResultView results={sessionResults} grade={grade} target={target} mode={mode}
            onReview={() => startTest(grade, target, "review")} onRetry={() => startTest(grade, target, "normal")}
            onMap={() => setView("gradeMap")} onCurriculum={() => setView("curriculum")} />
        )}
        {view === "dashboard" && <DashboardView gradeSummary={gradeSummary} grammarStats={grammarStats} vocabStats={vocabStats} onJump={(g) => { setGrade(g); setView("gradeMap"); }} />}
        {view === "curriculum" && <CurriculumView curriculum={curriculum} onStudy={(g, tgt) => startTest(g, tgt, "review")} />}
      </main>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ホーム
// ════════════════════════════════════════════════════════════
function HomeView({ grades, onPick }) {
  const s = STYLES;
  return (
    <div>
      <section style={s.hero}>
        <div style={s.heroEyebrow}>文法ターゲットで網羅性を担保</div>
        <h1 style={s.heroTitle}>級を選び、文法項目ごとに実力を測る。</h1>
        <p style={s.heroLead}>
          文法は「be動詞」「現在完了」「関係代名詞」のようなターゲット単位（各5〜7問）で習熟度を判定。
          どの項目が穴かが一目で分かり、単語は基礎・応用ユニットでチェックします。間違いは記録され、カリキュラムが自動生成されます。
        </p>
      </section>
      <div style={s.gradeGrid}>
        {grades.map((g) => {
          const m = g.rate === null ? null : masteryLabel(g.rate);
          return (
            <button key={g.key} style={s.gradeCard} onClick={() => onPick(g.key)} className="lift">
              <div style={s.gradeTop}>
                <div style={{ textAlign: "left" }}><div style={s.gradeLabel}>{g.label}</div><div style={s.gradeSub}>{g.sub}</div></div>
                {m && <span style={{ ...s.badge, background: m.color }}>{m.text}</span>}
              </div>
              <div style={s.meterRow}><span style={s.meterLabel}>正答率</span><span style={s.meterVal}>{g.rate === null ? "未受験" : `${Math.round(g.rate * 100)}%`}</span></div>
              <div style={s.meterTrack}><div style={{ ...s.meterFill, width: `${(g.rate || 0) * 100}%` }} /></div>
              <div style={s.coverNote}>学習カバー率 {Math.round(g.coverage * 100)}%</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// 級マップ（文法ターゲット一覧 + 単語ユニット）
// ════════════════════════════════════════════════════════════
function GradeMapView({ grade, grammarStats, vocabStats, onStart, onReview, onBack, records }) {
  const s = STYLES;
  const G = BANK[grade];
  return (
    <div>
      <button style={s.backLink} onClick={onBack}>← 級の選択へ</button>
      <h2 style={s.pageTitle}>{G.label} <span style={s.pageTitleSub}>{G.sub}</span></h2>

      <h3 style={s.sectionLabel}><span style={{ ...s.sectionDot, background: GRAMMAR_TONE }} />文法ターゲット（各項目を個別にチェック）</h3>
      <div style={s.targetGrid}>
        {G.grammar.map((t) => {
          const st = grammarStats[`${grade}|${t.key}`];
          const m = targetMastery(st);
          const wrong = t.questions.filter((q) => records[q.id]?.lastWrong).length;
          return (
            <div key={t.key} style={s.targetCard}>
              <div style={s.targetTop}>
                <div style={s.targetName}>{t.name}</div>
                {m ? <span style={{ ...s.badgeSm, background: m.color }}>{m.text}</span> : <span style={s.badgeUnseen}>未</span>}
              </div>
              <div style={s.targetStruct}>{t.struct}</div>
              <div style={s.meterTrackSm}><div style={{ ...s.meterFill, width: `${(st.rate || 0) * 100}%`, background: m ? m.color : "#e0e5ee" }} /></div>
              <div style={s.targetFoot}>
                <span style={s.targetMeta}>{st.rate === null ? `${t.questions.length}問` : `${Math.round(st.rate * 100)}% · ${st.seen}/${st.total}`}</span>
                <span style={s.targetBtns}>
                  <button style={s.miniStart} onClick={() => onStart({ kind: "grammar", key: t.key })}>受験</button>
                  {wrong > 0 && <button style={s.miniReview} onClick={() => onReview({ kind: "grammar", key: t.key })}>復習{wrong}</button>}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <h3 style={{ ...s.sectionLabel, marginTop: 30 }}><span style={{ ...s.sectionDot, background: VOCAB_META["v-basic"].tone }} />単語</h3>
      <div style={s.unitGrid}>
        {VOCAB_UNITS.map((u) => {
          const meta = VOCAB_META[u];
          const st = vocabStats[`${grade}|${u}`];
          const m = st.rate === null ? null : (() => { const b = masteryLabel(st.rate); return b.text === "習得" && st.masteredRatio < 0.7 ? { text: "あと一歩", color: "#c98a16" } : b; })();
          const wrong = BANK[grade].vocab[u].questions.filter((q) => records[q.id]?.lastWrong).length;
          const ask = Math.min(VOCAB_PER_TEST, st.total);
          return (
            <div key={u} style={{ ...s.unitCard, borderTopColor: meta.tone }}>
              <div style={s.unitHead}>
                <span style={{ ...s.unitIcon, background: meta.tone }}>{meta.icon}</span>
                <div><div style={s.unitName}>{meta.name}</div><div style={s.unitInfo}>毎回{ask}問 · 全{st.total}問から</div></div>
                {m && <span style={{ ...s.badgeSm, background: m.color }}>{m.text}</span>}
              </div>
              <div style={s.meterTrack}><div style={{ ...s.meterFill, width: `${(st.rate || 0) * 100}%`, background: meta.tone }} /></div>
              <div style={s.unitStatRow}><span>{st.rate === null ? "未受験" : `正答率 ${Math.round(st.rate * 100)}%`}</span><span style={s.coverInline}>カバー {Math.round(st.coverage * 100)}%</span></div>
              <div style={s.unitBtns}>
                <button style={{ ...s.unitStart, background: meta.tone }} onClick={() => onStart({ kind: "vocab", key: u })}>受験する</button>
                {wrong > 0 && <button style={s.unitReview} onClick={() => onReview({ kind: "vocab", key: u })}>復習 {wrong}</button>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// テスト
// ════════════════════════════════════════════════════════════
function targetTitle(grade, target) {
  if (target.kind === "grammar") { const t = BANK[grade].grammar.find((x) => x.key === target.key); return t ? t.name : ""; }
  return BANK[grade].vocab[target.key].name;
}
function TestView({ q, idx, total, selected, answered, mode, timeLeft, grade, target, onSelect, onSubmit, onNext, onQuit }) {
  const s = STYLES;
  const tone = target.kind === "grammar" ? GRAMMAR_TONE : VOCAB_META[target.key].tone;
  const low = timeLeft <= 60;
  return (
    <div style={s.testWrap}>
      <div style={s.testHead}>
        <button style={s.quitBtn} onClick={onQuit}>← 中断</button>
        <div style={s.testHeadRight}>
          {mode === "review" && <span style={s.reviewTag}>復習</span>}
          <span style={{ ...s.timer, color: low ? "#c0392b" : "#4a566e" }}>⏱ {fmtTime(timeLeft)}</span>
          <span style={s.qCount}>{idx + 1}/{total}</span>
        </div>
      </div>
      <div style={s.progressTrack}><div style={{ ...s.progressFill, width: `${(idx / total) * 100}%`, background: tone }} /></div>
      <div style={s.questionCard}>
        <div style={s.qMeta}><span style={{ ...s.qChip, background: tone }}>{BANK[grade].label} · {targetTitle(grade, target)}</span></div>
        <div style={s.qText}>{q.q}</div>
        <div style={s.choices}>
          {q.choices.map((c, i) => {
            let cls = "choice";
            if (answered) { if (i === q.ans) cls += " correct"; else if (i === selected) cls += " wrong"; }
            else if (i === selected) cls += " selected";
            return <button key={i} className={cls} disabled={answered} onClick={() => onSelect(i)}><span className="choice-key">{String.fromCharCode(65 + i)}</span><span>{c}</span></button>;
          })}
        </div>
        {answered && (
          <div style={{ ...s.expBox, borderColor: selected === q.ans ? "#1d8a5b" : "#c0392b" }}>
            <div style={{ ...s.expHead, color: selected === q.ans ? "#1d8a5b" : "#c0392b" }}>{selected === q.ans ? "正解" : "不正解"}</div>
            <div style={s.expText}>{q.exp}</div>
          </div>
        )}
        <div style={s.testActions}>
          {!answered
            ? <button style={{ ...s.primaryBtn, opacity: selected === null ? 0.4 : 1 }} disabled={selected === null} onClick={onSubmit}>解答する</button>
            : <button style={s.primaryBtn} onClick={onNext}>{idx + 1 >= total ? "結果を見る" : "次の問題 →"}</button>}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// 結果
// ════════════════════════════════════════════════════════════
function ResultView({ results, grade, target, mode, onReview, onRetry, onMap, onCurriculum }) {
  const s = STYLES;
  const correct = results.filter((r) => r.correct).length;
  const rate = results.length ? correct / results.length : 0;
  const m = masteryLabel(rate);
  const wrong = results.filter((r) => !r.correct);
  const deg = Math.round(rate * 360);
  return (
    <div style={s.resultWrap}>
      <div style={s.resultHero}>
        <div style={{ ...s.ring, background: `conic-gradient(${m.color} ${deg}deg, #eef2fa ${deg}deg)` }}>
          <div style={s.ringInner}><div style={s.ringNum}>{Math.round(rate * 100)}<span style={s.ringPct}>%</span></div><div style={s.ringSub}>{correct}/{results.length}</div></div>
        </div>
        <div>
          <div style={s.resultGrade}>{BANK[grade].label} · {targetTitle(grade, target)}{mode === "review" ? "（復習）" : ""}</div>
          <span style={{ ...s.badge, background: m.color, marginTop: 6, display: "inline-block" }}>{m.text}</span>
          <p style={s.resultMsg}>{rate >= 0.85 ? "この項目はよく定着しています。次のターゲットへ進みましょう。" : rate >= 0.6 ? "あと一歩。間違えた問題を復習で固めましょう。" : "この項目は弱点です。解説を読み、復習で繰り返しましょう。"}</p>
        </div>
      </div>
      {wrong.length > 0 && (
        <div style={s.wrongBlock}>
          <h3 style={s.blockTitle}>復習ポイント（{wrong.length}件）</h3>
          {wrong.map((r, i) => (
            <div key={i} style={s.wrongItem}>
              <div style={s.wrongQ}>{r.q.q}</div>
              <div style={s.wrongAns}>正解: <b>{r.q.choices[r.q.ans]}</b>（あなた: {r.q.choices[r.selected]}）</div>
              <div style={s.wrongExp}>{r.q.exp}</div>
            </div>
          ))}
        </div>
      )}
      <div style={s.resultActions}>
        {wrong.length > 0 && <button style={s.primaryBtn} onClick={onReview}>間違いだけ復習</button>}
        <button style={s.ghostBtn} onClick={onRetry}>もう一度</button>
        <button style={s.ghostBtn} onClick={onCurriculum}>カリキュラム</button>
        <button style={s.ghostBtn} onClick={onMap}>一覧へ戻る</button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// 分析ダッシュボード
// ════════════════════════════════════════════════════════════
function DashboardView({ gradeSummary, grammarStats, vocabStats, onJump }) {
  const s = STYLES;
  // 全文法ターゲットを正答率の低い順に
  const allTargets = [];
  GRADE_ORDER.forEach((g) => BANK[g].grammar.forEach((t) => { const st = grammarStats[`${g}|${t.key}`]; if (st.rate !== null) allTargets.push(st); }));
  allTargets.sort((a, b) => a.rate - b.rate);
  const hasData = allTargets.length > 0;

  return (
    <div>
      <h2 style={s.pageTitle}>習熟度ダッシュボード</h2>

      <h3 style={s.blockTitle}>級別 文法ターゲット網羅マップ</h3>
      <p style={s.pageLead}>各セルが文法ターゲット。色で習熟度、グレーは未受験。網羅すべき項目の達成状況が一目で分かります。</p>
      {GRADE_ORDER.map((g) => (
        <div key={g} style={s.gradeRow}>
          <button style={s.gradeRowLabel} onClick={() => onJump(g)}>{BANK[g].label}</button>
          <div style={s.cellWrap}>
            {BANK[g].grammar.map((t) => {
              const st = grammarStats[`${g}|${t.key}`];
              const m = targetMastery(st);
              const bg = m ? m.color : "#eef0f5";
              const fg = m ? "#fff" : "#aab3c2";
              return <span key={t.key} style={{ ...s.cell, background: bg, color: fg }} title={t.name}>{st.rate === null ? "—" : `${Math.round(st.rate * 100)}`}<span style={s.cellName}>{t.name}</span></span>;
            })}
          </div>
        </div>
      ))}
      <div style={s.legend}>
        <Legend c="#1d8a5b" t="習得" /><Legend c="#c98a16" t="あと一歩" /><Legend c="#c0392b" t="要強化" /><Legend c="#eef0f5" t="未受験" dark />
      </div>

      <h3 style={{ ...s.blockTitle, marginTop: 30 }}>苦手な文法ターゲット（低い順）</h3>
      {!hasData && <div style={s.empty}>まだ受験記録がありません。ホームからターゲットを受験しましょう。</div>}
      {hasData && (
        <div style={s.topicList}>
          {allTargets.slice(0, 12).map((t, i) => {
            const m = masteryLabel(t.rate);
            return (
              <div key={i} style={s.topicRow}>
                <div style={s.topicInfo}><span style={s.topicGrade}>{BANK[t.grade].label}</span><span style={s.topicName}>{t.name}</span></div>
                <div style={s.topicBarWrap}><div style={s.topicTrack}><div style={{ ...s.topicFill, width: `${t.rate * 100}%`, background: m.color }} /></div><span style={{ ...s.topicPct, color: m.color }}>{Math.round(t.rate * 100)}%</span></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
function Legend({ c, t, dark }) { return <span style={STYLES.legendItem}><span style={{ width: 14, height: 14, borderRadius: 4, background: c, border: dark ? "1px solid #d9e0ec" : "none", display: "inline-block" }} />{t}</span>; }

// ════════════════════════════════════════════════════════════
// カリキュラム
// ════════════════════════════════════════════════════════════
function CurriculumView({ curriculum, onStudy }) {
  const s = STYLES;
  const pri = { 高: "#c0392b", 中: "#c98a16", 低: "#1d8a5b" };
  return (
    <div>
      <h2 style={s.pageTitle}>自動生成カリキュラム</h2>
      <p style={s.pageLead}>正答率の低い文法ターゲット・単語ユニットから優先的に、学習ステップを並べています。</p>
      {curriculum.length === 0 && <div style={s.empty}>苦手な項目は検出されていません。受験するか、現状すべて習得済みです。</div>}
      <div style={s.curList}>
        {curriculum.map((c) => (
          <div key={c.order} style={s.curCard}>
            <div style={s.curHead}>
              <div style={s.curNum}>{String(c.order).padStart(2, "0")}</div>
              <div style={{ flex: 1 }}>
                <div style={s.curTopicRow}>
                  <span style={s.topicGrade}>{c.gLabel}</span>
                  <span style={{ ...s.kindTag, background: c.kind === "grammar" ? "#eef3ff" : "#e7f7f1", color: c.kind === "grammar" ? GRAMMAR_TONE : "#0a7d5c" }}>{c.kind === "grammar" ? "文法" : "単語"}</span>
                  <span style={s.curTopicName}>{c.name}</span>
                </div>
                <div style={s.curMeta}>現在 {Math.round(c.rate * 100)}% → 目標 85%{c.struct ? ` · ${c.struct}` : ""}</div>
              </div>
              <span style={{ ...s.priBadge, background: pri[c.priority] }}>優先度 {c.priority}</span>
            </div>
            <ol style={s.stepList}>{c.steps.map((st, i) => <li key={i} style={s.stepItem}>{st}</li>)}</ol>
            <button style={s.curBtn} onClick={() => onStudy(c.grade, { kind: c.kind, key: c.key })}>このターゲットを復習する →</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function NavBtn({ active, onClick, children }) { return <button onClick={onClick} style={{ ...STYLES.navBtn, ...(active ? STYLES.navBtnActive : {}) }}>{children}</button>; }

const CSS = `
  * { box-sizing: border-box; }
  .lift { transition: transform .15s, box-shadow .15s; }
  .lift:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(19,35,63,.12); }
  .choice { display: flex; align-items: center; gap: 12px; width: 100%; text-align: left; padding: 14px 16px; border-radius: 12px; border: 1.5px solid #d9e0ec; background: #fff; font-size: 16px; color: #1a2230; cursor: pointer; transition: all .12s; font-family: inherit; }
  .choice:hover:not(:disabled) { border-color: #2b5fff; background: #f4f7ff; }
  .choice .choice-key { display: inline-flex; align-items: center; justify-content: center; width: 26px; height: 26px; border-radius: 7px; background: #eef2fa; color: #5a6478; font-weight: 700; font-size: 13px; flex-shrink: 0; }
  .choice.selected { border-color: #2b5fff; background: #f0f4ff; } .choice.selected .choice-key { background: #2b5fff; color: #fff; }
  .choice.correct { border-color: #1d8a5b; background: #e9f7f0; } .choice.correct .choice-key { background: #1d8a5b; color: #fff; }
  .choice.wrong { border-color: #c0392b; background: #fbecea; } .choice.wrong .choice-key { background: #c0392b; color: #fff; }
  .choice:disabled { cursor: default; }
  @media (max-width: 640px) { .choice { font-size: 15px; padding: 12px 14px; } }
`;

const NAVY = "#13233f", BLUE = "#2b5fff";
const STYLES = {
  app: { minHeight: "100vh", background: "#f5f7fb", color: NAVY, fontFamily: "'Hiragino Sans','Noto Sans JP',system-ui,sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 22px", background: NAVY, color: "#fff", flexWrap: "wrap", gap: 12, position: "sticky", top: 0, zIndex: 10 },
  brand: { display: "flex", alignItems: "center", gap: 11, background: "none", border: "none", cursor: "pointer", color: "#fff", padding: 0 },
  brandMark: { width: 38, height: 38, borderRadius: 10, background: BLUE, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 19, fontFamily: "serif" },
  brandTitle: { display: "block", fontWeight: 800, letterSpacing: 1, fontSize: 16, textAlign: "left" },
  brandSub: { display: "block", fontSize: 10.5, color: "#9fb0d0", marginTop: 2, textAlign: "left" },
  nav: { display: "flex", gap: 4 },
  navBtn: { padding: "8px 13px", borderRadius: 8, border: "none", cursor: "pointer", background: "transparent", color: "#9fb0d0", fontSize: 13.5, fontWeight: 600, fontFamily: "inherit" },
  navBtnActive: { background: "rgba(43,95,255,.28)", color: "#fff" },
  main: { maxWidth: 940, margin: "0 auto", padding: "26px 18px 64px" },

  hero: { marginBottom: 26 },
  heroEyebrow: { color: BLUE, fontWeight: 700, fontSize: 12.5, letterSpacing: 1.5, marginBottom: 8 },
  heroTitle: { fontSize: 28, fontWeight: 800, margin: "0 0 12px", lineHeight: 1.35 },
  heroLead: { fontSize: 14.5, color: "#4a566e", lineHeight: 1.7, maxWidth: 660 },

  gradeGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 14 },
  gradeCard: { background: "#fff", borderRadius: 16, padding: 18, border: "1px solid #e8edf6", cursor: "pointer", textAlign: "left", fontFamily: "inherit" },
  gradeTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 },
  gradeLabel: { fontSize: 21, fontWeight: 800, color: NAVY },
  gradeSub: { fontSize: 12, color: "#8a94a6", marginTop: 2 },
  badge: { color: "#fff", fontSize: 11.5, fontWeight: 700, padding: "4px 10px", borderRadius: 20 },
  badgeSm: { color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 16, whiteSpace: "nowrap" },
  badgeUnseen: { color: "#aab3c2", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 16, background: "#f0f2f7", whiteSpace: "nowrap" },
  meterRow: { display: "flex", justifyContent: "space-between", marginBottom: 6 },
  meterLabel: { fontSize: 12, color: "#8a94a6" }, meterVal: { fontSize: 13, fontWeight: 700 },
  meterTrack: { height: 7, background: "#eef2fa", borderRadius: 10, overflow: "hidden" },
  meterTrackSm: { height: 5, background: "#eef2fa", borderRadius: 10, overflow: "hidden", margin: "8px 0" },
  meterFill: { height: "100%", background: BLUE, borderRadius: 10, transition: "width .4s" },
  coverNote: { fontSize: 11, color: "#9aa3b2", marginTop: 8 },

  backLink: { background: "none", border: "none", color: "#8a94a6", fontSize: 14, cursor: "pointer", fontFamily: "inherit", padding: 0, marginBottom: 12 },
  pageTitle: { fontSize: 24, fontWeight: 800, margin: "0 0 6px" },
  pageTitleSub: { fontSize: 14, fontWeight: 600, color: "#8a94a6", marginLeft: 8 },
  pageLead: { fontSize: 13.5, color: "#4a566e", marginBottom: 18, lineHeight: 1.6 },

  sectionLabel: { fontSize: 15, fontWeight: 800, display: "flex", alignItems: "center", gap: 8, margin: "18px 0 12px" },
  sectionDot: { width: 10, height: 10, borderRadius: 3, display: "inline-block" },

  targetGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 11 },
  targetCard: { background: "#fff", borderRadius: 12, padding: 14, border: "1px solid #e8edf6" },
  targetTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 },
  targetName: { fontSize: 14.5, fontWeight: 800, lineHeight: 1.3 },
  targetStruct: { fontSize: 11, color: "#8a94a6", marginTop: 3, lineHeight: 1.4 },
  targetFoot: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 },
  targetMeta: { fontSize: 11.5, color: "#5a6478", fontWeight: 600 },
  targetBtns: { display: "flex", gap: 6 },
  miniStart: { padding: "5px 11px", borderRadius: 8, border: "none", background: BLUE, color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" },
  miniReview: { padding: "5px 9px", borderRadius: 8, border: "1.5px solid #d9e0ec", background: "#fff", color: NAVY, fontWeight: 700, fontSize: 11.5, cursor: "pointer", fontFamily: "inherit" },

  unitGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14 },
  unitCard: { background: "#fff", borderRadius: 14, padding: 18, border: "1px solid #e8edf6", borderTop: "4px solid", boxShadow: "0 1px 3px rgba(19,35,63,.06)" },
  unitHead: { display: "flex", alignItems: "center", gap: 11, marginBottom: 14 },
  unitIcon: { width: 36, height: 36, borderRadius: 9, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, flexShrink: 0 },
  unitName: { fontSize: 16, fontWeight: 800 }, unitInfo: { fontSize: 12, color: "#8a94a6", marginTop: 1 },
  unitStatRow: { display: "flex", justifyContent: "space-between", fontSize: 12.5, color: "#5a6478", margin: "8px 0 14px", fontWeight: 600 },
  coverInline: { color: "#9aa3b2", fontWeight: 500 },
  unitBtns: { display: "flex", gap: 8 },
  unitStart: { flex: 1, padding: "10px", borderRadius: 10, border: "none", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" },
  unitReview: { padding: "10px 14px", borderRadius: 10, border: "1.5px solid #d9e0ec", background: "#fff", color: NAVY, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" },

  testWrap: { maxWidth: 620, margin: "0 auto" },
  testHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  quitBtn: { background: "none", border: "none", color: "#8a94a6", fontSize: 14, cursor: "pointer", fontFamily: "inherit" },
  testHeadRight: { display: "flex", alignItems: "center", gap: 12 },
  reviewTag: { background: "#fdecc8", color: "#a06a00", fontSize: 11.5, fontWeight: 700, padding: "3px 9px", borderRadius: 16 },
  timer: { fontSize: 14, fontWeight: 700, fontVariantNumeric: "tabular-nums" },
  qCount: { fontSize: 14, fontWeight: 700, color: "#4a566e" },
  progressTrack: { height: 5, background: "#e8edf6", borderRadius: 10, overflow: "hidden", marginBottom: 18 },
  progressFill: { height: "100%", transition: "width .3s" },
  questionCard: { background: "#fff", borderRadius: 18, padding: 24, boxShadow: "0 2px 10px rgba(19,35,63,.07)", border: "1px solid #e8edf6" },
  qMeta: { display: "flex", gap: 8, marginBottom: 16, alignItems: "center", flexWrap: "wrap" },
  qChip: { fontSize: 11.5, fontWeight: 700, color: "#fff", padding: "3px 10px", borderRadius: 6 },
  qText: { fontSize: 20, fontWeight: 700, lineHeight: 1.5, marginBottom: 20 },
  choices: { display: "flex", flexDirection: "column", gap: 10 },
  expBox: { marginTop: 18, padding: 16, borderRadius: 12, border: "1.5px solid", background: "#fafbfd" },
  expHead: { fontWeight: 800, fontSize: 14, marginBottom: 6 },
  expText: { fontSize: 14, color: "#4a566e", lineHeight: 1.6 },
  testActions: { marginTop: 20 },
  primaryBtn: { width: "100%", padding: "13px", borderRadius: 11, border: "none", background: BLUE, color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit" },

  resultWrap: { maxWidth: 640, margin: "0 auto" },
  resultHero: { display: "flex", gap: 22, alignItems: "center", background: "#fff", borderRadius: 18, padding: 22, marginBottom: 22, border: "1px solid #e8edf6", flexWrap: "wrap" },
  ring: { width: 116, height: 116, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" },
  ringInner: { width: 92, height: 92, borderRadius: "50%", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
  ringNum: { fontSize: 30, fontWeight: 800, color: NAVY, lineHeight: 1 }, ringPct: { fontSize: 16 },
  ringSub: { fontSize: 12, color: "#8a94a6", marginTop: 3 },
  resultGrade: { fontSize: 18, fontWeight: 800 },
  resultMsg: { fontSize: 14, color: "#4a566e", lineHeight: 1.6, marginTop: 10 },
  wrongBlock: { marginBottom: 22 },
  blockTitle: { fontSize: 16.5, fontWeight: 800, margin: "0 0 13px" },
  wrongItem: { background: "#fff", borderRadius: 12, padding: 15, marginBottom: 10, border: "1px solid #e8edf6", borderLeft: "4px solid #c0392b" },
  wrongQ: { fontSize: 15, fontWeight: 700, marginBottom: 6 },
  wrongAns: { fontSize: 13.5, color: "#1d8a5b", marginBottom: 4 },
  wrongExp: { fontSize: 13, color: "#5a6478", lineHeight: 1.5 },
  resultActions: { display: "flex", gap: 9, flexWrap: "wrap" },
  ghostBtn: { flex: 1, minWidth: 120, padding: "12px", borderRadius: 11, border: "1.5px solid #d9e0ec", background: "#fff", color: NAVY, fontWeight: 700, fontSize: 13.5, cursor: "pointer", fontFamily: "inherit" },

  gradeRow: { display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 },
  gradeRowLabel: { background: NAVY, color: "#fff", border: "none", borderRadius: 8, padding: "8px 12px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit", flexShrink: 0, minWidth: 52 },
  cellWrap: { display: "flex", flexWrap: "wrap", gap: 6 },
  cell: { minWidth: 52, height: 50, borderRadius: 8, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, padding: "0 6px", textAlign: "center" },
  cellName: { fontSize: 8.5, fontWeight: 600, marginTop: 2, lineHeight: 1.1, opacity: .92 },
  legend: { display: "flex", gap: 16, flexWrap: "wrap", marginTop: 8 },
  legendItem: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#5a6478" },

  topicList: { display: "flex", flexDirection: "column", gap: 8 },
  topicRow: { background: "#fff", borderRadius: 10, padding: "11px 15px", border: "1px solid #e8edf6", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, flexWrap: "wrap" },
  topicInfo: { display: "flex", alignItems: "center", gap: 7 },
  topicGrade: { fontSize: 11, fontWeight: 700, color: "#fff", background: NAVY, padding: "2px 8px", borderRadius: 5 },
  topicName: { fontSize: 14, fontWeight: 600 },
  topicBarWrap: { display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 130, justifyContent: "flex-end" },
  topicTrack: { flex: 1, maxWidth: 150, height: 8, background: "#eef2fa", borderRadius: 10, overflow: "hidden" },
  topicFill: { height: "100%", borderRadius: 10 },
  topicPct: { fontSize: 13, fontWeight: 700, width: 40, textAlign: "right" },

  curList: { display: "flex", flexDirection: "column", gap: 13 },
  curCard: { background: "#fff", borderRadius: 16, padding: 19, border: "1px solid #e8edf6", boxShadow: "0 1px 3px rgba(19,35,63,.05)" },
  curHead: { display: "flex", alignItems: "flex-start", gap: 13, marginBottom: 13 },
  curNum: { fontSize: 25, fontWeight: 800, color: "#cdd6e6", fontFamily: "serif", lineHeight: 1 },
  curTopicRow: { display: "flex", alignItems: "center", gap: 7, marginBottom: 6, flexWrap: "wrap" },
  kindTag: { fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 5 },
  curTopicName: { fontSize: 16.5, fontWeight: 800 },
  curMeta: { fontSize: 12.5, color: "#8a94a6" },
  priBadge: { color: "#fff", fontSize: 11.5, fontWeight: 700, padding: "4px 10px", borderRadius: 20, whiteSpace: "nowrap" },
  stepList: { margin: "0 0 15px", paddingLeft: 20, display: "flex", flexDirection: "column", gap: 7 },
  stepItem: { fontSize: 13.5, color: "#3a4659", lineHeight: 1.5 },
  curBtn: { padding: "10px 17px", borderRadius: 10, border: "none", background: NAVY, color: "#fff", fontWeight: 700, fontSize: 13.5, cursor: "pointer", fontFamily: "inherit" },
  empty: { background: "#fff", borderRadius: 12, padding: 26, textAlign: "center", color: "#8a94a6", fontSize: 14, border: "1px dashed #d9e0ec" },
};

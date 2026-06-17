// 3級 文法ターゲット
export const G3 = [
  {
    key: "present-perfect-exp", name: "現在完了（経験）", struct: "have + 過去分詞 + ever/never",
    questions: [
      { id: "3_ppe_1", q: "I have ___ Kyoto twice.", choices: ["visit", "visited", "visiting", "visits"], ans: 1, exp: "have + 過去分詞。" },
      { id: "3_ppe_2", q: "Have you ever ___ sushi?", choices: ["eat", "ate", "eaten", "eating"], ans: 2, exp: "eat の過去分詞 eaten。" },
      { id: "3_ppe_3", q: "I have ___ been to America.", choices: ["ever", "never", "yet", "since"], ans: 1, exp: "「一度も〜ない」never。" },
      { id: "3_ppe_4", q: "Have you ___ been to Hokkaido?", choices: ["ever", "already", "yet", "still"], ans: 0, exp: "経験を聞く ever。" },
      { id: "3_ppe_5", q: "She has ___ seen the movie.", choices: ["ever", "never", "yet", "since"], ans: 1, exp: "「一度も〜ない」never。" },
    ],
  },
  {
    key: "present-perfect-cont", name: "現在完了（継続）", struct: "have + 過去分詞 + for/since",
    questions: [
      { id: "3_ppc_1", q: "I have lived here ___ 2010.", choices: ["for", "since", "from", "in"], ans: 1, exp: "起点 since。" },
      { id: "3_ppc_2", q: "She has studied English ___ five years.", choices: ["since", "for", "in", "at"], ans: 1, exp: "期間 for。" },
      { id: "3_ppc_3", q: "We have known each other ___ childhood.", choices: ["for", "since", "from", "at"], ans: 1, exp: "起点 since。" },
      { id: "3_ppc_4", q: "She has been sick ___ a week.", choices: ["since", "for", "in", "at"], ans: 1, exp: "期間 for。" },
      { id: "3_ppc_5", q: "He has worked here ___ last year.", choices: ["for", "since", "in", "at"], ans: 1, exp: "起点 since。" },
    ],
  },
  {
    key: "present-perfect-comp", name: "現在完了（完了）", struct: "have + 過去分詞 + already/yet",
    questions: [
      { id: "3_ppk_1", q: "I have ___ finished my homework.", choices: ["yet", "already", "ever", "since"], ans: 1, exp: "肯定文「もう」already。" },
      { id: "3_ppk_2", q: "Has the train left ___?", choices: ["already", "yet", "ever", "since"], ans: 1, exp: "疑問文の「もう」yet。" },
      { id: "3_ppk_3", q: "I haven't done it ___.", choices: ["already", "yet", "ever", "since"], ans: 1, exp: "否定文「まだ」yet。" },
      { id: "3_ppk_4", q: "She has ___ arrived.", choices: ["yet", "already", "ever", "since"], ans: 1, exp: "「もう」already。" },
      { id: "3_ppk_5", q: "Have you eaten lunch ___?", choices: ["already", "yet", "ever", "still"], ans: 1, exp: "疑問文 yet。" },
    ],
  },
  {
    key: "passive", name: "受動態", struct: "be動詞 + 過去分詞",
    questions: [
      { id: "3_pa_1", q: "This book ___ by many people.", choices: ["reads", "is read", "reading", "read"], ans: 1, exp: "be + 過去分詞。" },
      { id: "3_pa_2", q: "English ___ in many countries.", choices: ["speaks", "is spoken", "speaking", "spoke"], ans: 1, exp: "is spoken。" },
      { id: "3_pa_3", q: "This house ___ built in 1990.", choices: ["is", "was", "are", "were"], ans: 1, exp: "過去の受動態 was built。" },
      { id: "3_pa_4", q: "These cars ___ in Japan.", choices: ["make", "makes", "are made", "making"], ans: 2, exp: "are made。" },
      { id: "3_pa_5", q: "This song is loved ___ everyone.", choices: ["by", "of", "to", "for"], ans: 0, exp: "動作主は by。" },
      { id: "3_pa_6", q: "The letter ___ written yesterday.", choices: ["is", "was", "are", "were"], ans: 1, exp: "was written。" },
    ],
  },
  {
    key: "infinitive-adv", name: "不定詞（応用）", struct: "want 人 to / how to / too~to",
    questions: [
      { id: "3_ia_1", q: "I want you ___ help me.", choices: ["to", "for", "that", "of"], ans: 0, exp: "want 人 to do。" },
      { id: "3_ia_2", q: "I know how ___ swim.", choices: ["to", "for", "of", "at"], ans: 0, exp: "how to do。" },
      { id: "3_ia_3", q: "It's too hot ___ go out.", choices: ["to", "for", "of", "that"], ans: 0, exp: "too ~ to do。" },
      { id: "3_ia_4", q: "He told me ___ wait.", choices: ["to", "for", "that", "of"], ans: 0, exp: "tell 人 to do。" },
      { id: "3_ia_5", q: "It is easy ___ me to cook.", choices: ["for", "to", "of", "that"], ans: 0, exp: "It is ~ for 人 to do。" },
      { id: "3_ia_6", q: "He is too young ___ drive.", choices: ["to", "for", "of", "that"], ans: 0, exp: "too ~ to do。" },
    ],
  },
  {
    key: "comparison-3", name: "比較（最上級・比較）", struct: "the 最上級 / 比較級",
    questions: [
      { id: "3_cp_1", q: "This is the ___ movie I've ever seen.", choices: ["good", "better", "best", "well"], ans: 2, exp: "the best。" },
      { id: "3_cp_2", q: "Mt. Fuji is the ___ mountain in Japan.", choices: ["high", "higher", "highest", "more high"], ans: 2, exp: "highest。" },
      { id: "3_cp_3", q: "She sings ___ than me.", choices: ["well", "better", "best", "good"], ans: 1, exp: "well → better。" },
      { id: "3_cp_4", q: "This is the ___ of the three.", choices: ["good", "better", "best", "well"], ans: 2, exp: "the best。" },
      { id: "3_cp_5", q: "He is not as tall ___ his brother.", choices: ["as", "than", "to", "so"], ans: 0, exp: "not as ~ as。" },
    ],
  },
  {
    key: "rel-pron-subj", name: "関係代名詞（主格 who/which/that）", struct: "先行詞 + who/which/that + 動詞",
    questions: [
      { id: "3_rs_1", q: "I have a friend ___ lives in Osaka.", choices: ["which", "who", "whose", "where"], ans: 1, exp: "人・主格 → who。" },
      { id: "3_rs_2", q: "The man ___ is talking is my teacher.", choices: ["which", "who", "whom", "whose"], ans: 1, exp: "人・主格 → who。" },
      { id: "3_rs_3", q: "This is a book ___ is very famous.", choices: ["who", "which", "whose", "when"], ans: 1, exp: "物・主格 → which。" },
      { id: "3_rs_4", q: "She is the girl ___ won the prize.", choices: ["which", "that", "whose", "what"], ans: 1, exp: "人にも物にも使える that。" },
      { id: "3_rs_5", q: "Look at the dog ___ is running.", choices: ["who", "that", "whose", "what"], ans: 1, exp: "動物・主格 → that/which。" },
      { id: "3_rs_6", q: "The man ___ lives next door is a doctor.", choices: ["which", "who", "whose", "whom"], ans: 1, exp: "人・主格 → who。" },
    ],
  },
  {
    key: "rel-pron-obj", name: "関係代名詞（目的格・省略）", struct: "先行詞 + (which/that) + 主語 + 動詞",
    questions: [
      { id: "3_ro_1", q: "This is the book ___ I bought.", choices: ["who", "which", "whose", "where"], ans: 1, exp: "物・目的格 → which。" },
      { id: "3_ro_2", q: "The bag ___ I bought was cheap.", choices: ["who", "which", "whose", "where"], ans: 1, exp: "物・目的格 → which。" },
      { id: "3_ro_3", q: "The movie ___ I saw was great.", choices: ["who", "which", "whose", "where"], ans: 1, exp: "目的格 which(省略可)。" },
      { id: "3_ro_4", q: "The book ( ) I read was fun. 省略できるのは？", choices: ["which を省略", "is を省略", "I を省略", "省略不可"], ans: 0, exp: "目的格の関係代名詞は省略可。" },
      { id: "3_ro_5", q: "This is the best movie ___ I've seen.", choices: ["who", "which", "that", "what"], ans: 2, exp: "最上級の先行詞には that。" },
    ],
  },
  {
    key: "participle", name: "分詞の後置修飾", struct: "名詞 + 現在/過去分詞",
    questions: [
      { id: "3_pt_1", q: "The boy ___ over there is Tom.", choices: ["run", "runs", "running", "ran"], ans: 2, exp: "現在分詞の後置修飾。" },
      { id: "3_pt_2", q: "This is a book ___ in English.", choices: ["write", "wrote", "written", "writing"], ans: 2, exp: "過去分詞の後置修飾。" },
      { id: "3_pt_3", q: "The girl ___ the piano is Mary.", choices: ["play", "plays", "playing", "played"], ans: 2, exp: "現在分詞 playing の後置修飾。" },
      { id: "3_pt_4", q: "Look at the ___ baby.", choices: ["sleep", "slept", "sleeping", "sleeps"], ans: 2, exp: "現在分詞の前置修飾。" },
      { id: "3_pt_5", q: "The language ___ in Brazil is Portuguese.", choices: ["speak", "spoke", "spoken", "speaking"], ans: 2, exp: "過去分詞 spoken の後置修飾。" },
    ],
  },
  {
    key: "indirect-q", name: "間接疑問文", struct: "疑問詞 + 主語 + 動詞",
    questions: [
      { id: "3_iq_1", q: "I don't know where ___.", choices: ["he is", "is he", "he be", "does he"], ans: 0, exp: "間接疑問は平叙語順。" },
      { id: "3_iq_2", q: "Do you know what ___?", choices: ["this is", "is this", "this be", "does this"], ans: 0, exp: "平叙語順。" },
      { id: "3_iq_3", q: "I don't know who ___.", choices: ["she is", "is she", "does she", "she be"], ans: 0, exp: "平叙語順。" },
      { id: "3_iq_4", q: "Do you know what time ___?", choices: ["it is", "is it", "does it", "it does"], ans: 0, exp: "平叙語順。" },
      { id: "3_iq_5", q: "Tell me where ___.", choices: ["you live", "do you live", "live you", "you living"], ans: 0, exp: "平叙語順。" },
    ],
  },
  {
    key: "svoo-svoc", name: "第4・第5文型", struct: "give 人 物 / call O C",
    questions: [
      { id: "3_sv_1", q: "He gave ___ a present.", choices: ["to me", "me", "for me", "my"], ans: 1, exp: "give 人 物。" },
      { id: "3_sv_2", q: "We call ___ Mike.", choices: ["he", "his", "him", "he's"], ans: 2, exp: "call O C、O は目的格。" },
      { id: "3_sv_3", q: "She showed ___ her photos.", choices: ["to us", "us", "for us", "our"], ans: 1, exp: "show 人 物。" },
      { id: "3_sv_4", q: "They named the baby ___.", choices: ["Tom", "to Tom", "Tom's", "for Tom"], ans: 0, exp: "name O C。" },
      { id: "3_sv_5", q: "The news made me ___.", choices: ["happy", "happily", "happiness", "to happy"], ans: 0, exp: "make O C、C は形容詞。" },
      { id: "3_sv_6", q: "The movie made me ___.", choices: ["cry", "to cry", "crying", "cried"], ans: 0, exp: "make O do(原形)。" },
    ],
  },
  {
    key: "conj-that", name: "接続詞 that", struct: "think/hope + (that) + 文",
    questions: [
      { id: "3_ct_1", q: "I think ___ he is right.", choices: ["that", "what", "which", "who"], ans: 0, exp: "think that。" },
      { id: "3_ct_2", q: "I hope ___ you will succeed.", choices: ["that", "what", "which", "who"], ans: 0, exp: "hope that。" },
      { id: "3_ct_3", q: "I think ___ she is kind.", choices: ["that", "what", "which", "who"], ans: 0, exp: "think (that)。" },
      { id: "3_ct_4", q: "I know ___ he is busy.", choices: ["that", "what", "which", "who"], ans: 0, exp: "know that。" },
      { id: "3_ct_5", q: "I believe ___ it is true.", choices: ["that", "what", "which", "who"], ans: 0, exp: "believe that。" },
    ],
  },
];

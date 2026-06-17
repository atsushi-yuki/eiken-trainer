// 4級 文法ターゲット
export const G4 = [
  {
    key: "past-regular", name: "過去形（規則動詞）", struct: "動詞 + ed",
    questions: [
      { id: "4_pr_1", q: "We ___ baseball yesterday.", choices: ["play", "plays", "played", "playing"], ans: 2, exp: "規則動詞 played。" },
      { id: "4_pr_2", q: "He ___ to music last night.", choices: ["listen", "listens", "listened", "listening"], ans: 2, exp: "listened。" },
      { id: "4_pr_3", q: "She ___ the door.", choices: ["open", "opens", "opened", "opening"], ans: 2, exp: "opened。" },
      { id: "4_pr_4", q: "They ___ TV last night.", choices: ["watch", "watches", "watched", "watching"], ans: 2, exp: "watched。" },
      { id: "4_pr_5", q: "I ___ hard for the test.", choices: ["study", "studies", "studied", "studying"], ans: 2, exp: "子音+y → studied。" },
    ],
  },
  {
    key: "past-irregular", name: "過去形（不規則動詞）", struct: "不規則変化",
    questions: [
      { id: "4_pi_1", q: "I ___ to the park yesterday.", choices: ["go", "goes", "went", "going"], ans: 2, exp: "go → went。" },
      { id: "4_pi_2", q: "She ___ a letter last night.", choices: ["write", "writes", "wrote", "written"], ans: 2, exp: "write → wrote。" },
      { id: "4_pi_3", q: "I ___ a movie yesterday.", choices: ["see", "saw", "seen", "seeing"], ans: 1, exp: "see → saw。" },
      { id: "4_pi_4", q: "He ___ breakfast.", choices: ["eat", "ate", "eaten", "eating"], ans: 1, exp: "eat → ate。" },
      { id: "4_pi_5", q: "We ___ to Tokyo last week.", choices: ["go", "goed", "went", "gone"], ans: 2, exp: "go → went。" },
      { id: "4_pi_6", q: "She ___ a new bag.", choices: ["buy", "buyed", "bought", "buying"], ans: 2, exp: "buy → bought。" },
    ],
  },
  {
    key: "past-be", name: "過去形（be動詞）", struct: "was / were",
    questions: [
      { id: "4_pb_1", q: "I ___ tired yesterday.", choices: ["am", "is", "was", "were"], ans: 2, exp: "I の過去 was。" },
      { id: "4_pb_2", q: "They ___ in Osaka last week.", choices: ["was", "were", "are", "is"], ans: 1, exp: "複数主語 were。" },
      { id: "4_pb_3", q: "She ___ busy yesterday.", choices: ["is", "was", "were", "are"], ans: 1, exp: "単数 was。" },
      { id: "4_pb_4", q: "We ___ happy.", choices: ["was", "were", "are", "is"], ans: 1, exp: "we の過去 were。" },
      { id: "4_pb_5", q: "It ___ cold last night.", choices: ["was", "were", "is", "are"], ans: 0, exp: "it の過去 was。" },
    ],
  },
  {
    key: "past-neg-q", name: "過去形（否定・疑問）", struct: "did not / Did + 主語 + 原形",
    questions: [
      { id: "4_pq_1", q: "I ___ go to school yesterday.", choices: ["don't", "doesn't", "didn't", "wasn't"], ans: 2, exp: "過去否定 didn't + 原形。" },
      { id: "4_pq_2", q: "___ you watch TV last night?", choices: ["Do", "Does", "Did", "Are"], ans: 2, exp: "過去疑問 Did。" },
      { id: "4_pq_3", q: "She ___ come yesterday.", choices: ["don't", "doesn't", "didn't", "isn't"], ans: 2, exp: "didn't + 原形。" },
      { id: "4_pq_4", q: "___ he study last night?", choices: ["Do", "Does", "Did", "Was"], ans: 2, exp: "Did + 原形。" },
      { id: "4_pq_5", q: "We ___ have lunch.", choices: ["don't", "didn't", "doesn't", "weren't"], ans: 1, exp: "didn't + 原形。" },
    ],
  },
  {
    key: "future", name: "未来表現", struct: "will / be going to + 原形",
    questions: [
      { id: "4_fu_1", q: "I ___ call you later.", choices: ["will", "am", "do", "was"], ans: 0, exp: "未来 will + 原形。" },
      { id: "4_fu_2", q: "I am going ___ study.", choices: ["to", "for", "at", "on"], ans: 0, exp: "be going to + 原形。" },
      { id: "4_fu_3", q: "It ___ rain tomorrow.", choices: ["will", "is", "was", "does"], ans: 0, exp: "未来 will。" },
      { id: "4_fu_4", q: "They are ___ to play soccer.", choices: ["go", "going", "gone", "goes"], ans: 1, exp: "be going to の going。" },
      { id: "4_fu_5", q: "___ you help me?", choices: ["Will", "Are", "Do", "Did"], ans: 0, exp: "未来の疑問 Will you。" },
      { id: "4_fu_6", q: "___ you going to study?", choices: ["Do", "Are", "Will", "Did"], ans: 1, exp: "be going to の疑問は be動詞。" },
    ],
  },
  {
    key: "past-progressive", name: "過去進行形", struct: "was/were + 動詞-ing",
    questions: [
      { id: "4_ppr_1", q: "I ___ watching TV at nine.", choices: ["am", "was", "were", "is"], ans: 1, exp: "過去進行形 was + ~ing。" },
      { id: "4_ppr_2", q: "They ___ playing soccer then.", choices: ["was", "were", "are", "is"], ans: 1, exp: "複数主語 were + ~ing。" },
      { id: "4_ppr_3", q: "He ___ not sleeping then.", choices: ["did", "was", "were", "does"], ans: 1, exp: "was not + ~ing。" },
      { id: "4_ppr_4", q: "She ___ cooking at that time.", choices: ["is", "was", "were", "did"], ans: 1, exp: "単数 was + ~ing。" },
      { id: "4_ppr_5", q: "We ___ studying then.", choices: ["was", "were", "are", "did"], ans: 1, exp: "we were + ~ing。" },
    ],
  },
  {
    key: "comparative", name: "比較級", struct: "形容詞-er / more + than",
    questions: [
      { id: "4_cm_1", q: "Tom is ___ than Ken.", choices: ["tall", "taller", "tallest", "more tall"], ans: 1, exp: "比較級 taller。" },
      { id: "4_cm_2", q: "Math is ___ than English for me.", choices: ["difficult", "difficulter", "more difficult", "most difficult"], ans: 2, exp: "長い語は more。" },
      { id: "4_cm_3", q: "This bag is ___ than that one.", choices: ["cheap", "cheaper", "cheapest", "more cheap"], ans: 1, exp: "cheaper。" },
      { id: "4_cm_4", q: "This question is ___ than that.", choices: ["easy", "more easy", "easier", "easiest"], ans: 2, exp: "easy → easier。" },
      { id: "4_cm_5", q: "He runs ___ than me.", choices: ["fast", "faster", "fastest", "more fast"], ans: 1, exp: "faster。" },
    ],
  },
  {
    key: "superlative", name: "最上級", struct: "the + 形容詞-est / most",
    questions: [
      { id: "4_su_1", q: "This is the ___ book of all.", choices: ["good", "better", "best", "well"], ans: 2, exp: "good → best。" },
      { id: "4_su_2", q: "He is the ___ in his class.", choices: ["tall", "taller", "tallest", "more tall"], ans: 2, exp: "tallest。" },
      { id: "4_su_3", q: "She runs fastest ___ all.", choices: ["in", "of", "at", "for"], ans: 1, exp: "of all。" },
      { id: "4_su_4", q: "This is the ___ movie of the year.", choices: ["popular", "more popular", "most popular", "popularest"], ans: 2, exp: "長い語は most。" },
      { id: "4_su_5", q: "August is the ___ month here.", choices: ["hot", "hotter", "hottest", "most hot"], ans: 2, exp: "hottest。" },
    ],
  },
  {
    key: "as-as", name: "as ~ as 構文", struct: "as + 原級 + as",
    questions: [
      { id: "4_aa_1", q: "He is as tall ___ his father.", choices: ["as", "than", "to", "of"], ans: 0, exp: "as ~ as。" },
      { id: "4_aa_2", q: "I am as old ___ you.", choices: ["as", "than", "to", "so"], ans: 0, exp: "as ~ as。" },
      { id: "4_aa_3", q: "This is as big ___ that.", choices: ["as", "than", "to", "of"], ans: 0, exp: "as ~ as。" },
      { id: "4_aa_4", q: "She is not as busy ___ me.", choices: ["as", "than", "to", "so"], ans: 0, exp: "not as ~ as。" },
      { id: "4_aa_5", q: "Run as fast ___ you can.", choices: ["as", "than", "to", "of"], ans: 0, exp: "as ~ as you can。" },
    ],
  },
  {
    key: "infinitive", name: "不定詞（3用法）", struct: "to + 動詞原形",
    questions: [
      { id: "4_in_1", q: "I like ___ books.", choices: ["read", "to read", "reads", "reading to"], ans: 1, exp: "名詞的用法 like to read。" },
      { id: "4_in_2", q: "I went there ___ see him.", choices: ["to", "for", "of", "at"], ans: 0, exp: "副詞的用法（目的）to。" },
      { id: "4_in_3", q: "I want ___ a teacher.", choices: ["be", "to be", "being", "been"], ans: 1, exp: "want to be。" },
      { id: "4_in_4", q: "I have something ___ eat.", choices: ["to", "for", "of", "at"], ans: 0, exp: "形容詞的用法 something to eat。" },
      { id: "4_in_5", q: "It started ___ rain.", choices: ["to", "for", "of", "at"], ans: 0, exp: "start to do。" },
      { id: "4_in_6", q: "She studies hard ___ pass.", choices: ["to", "for", "of", "at"], ans: 0, exp: "目的の to。" },
    ],
  },
  {
    key: "gerund", name: "動名詞", struct: "動詞-ing（名詞として）",
    questions: [
      { id: "4_ge_1", q: "I enjoy ___ soccer.", choices: ["play", "to play", "playing", "played"], ans: 2, exp: "enjoy は動名詞。" },
      { id: "4_ge_2", q: "I finished ___ my homework.", choices: ["do", "to do", "doing", "did"], ans: 2, exp: "finish は動名詞。" },
      { id: "4_ge_3", q: "He is good at ___.", choices: ["swim", "to swim", "swimming", "swam"], ans: 2, exp: "前置詞の後は動名詞。" },
      { id: "4_ge_4", q: "___ books is fun.", choices: ["Read", "To reading", "Reading", "Reads"], ans: 2, exp: "動名詞は主語になれる。" },
      { id: "4_ge_5", q: "Thank you for ___ me.", choices: ["help", "to help", "helping", "helped"], ans: 2, exp: "for + 動名詞。" },
    ],
  },
  {
    key: "conjunction", name: "接続詞", struct: "when / because / if / so",
    questions: [
      { id: "4_cj_1", q: "___ I was young, I lived here.", choices: ["When", "What", "Who", "Which"], ans: 0, exp: "「〜のとき」When。" },
      { id: "4_cj_2", q: "I was happy ___ I passed.", choices: ["but", "because", "or", "so"], ans: 1, exp: "理由 because。" },
      { id: "4_cj_3", q: "___ you are free, let's play.", choices: ["If", "That", "What", "When"], ans: 0, exp: "条件 If。" },
      { id: "4_cj_4", q: "I was tired, ___ I went to bed.", choices: ["but", "so", "or", "because"], ans: 1, exp: "結果 so。" },
      { id: "4_cj_5", q: "I can't go ___ I'm busy.", choices: ["but", "because", "so", "or"], ans: 1, exp: "理由 because。" },
    ],
  },
  {
    key: "modal", name: "助動詞（must/should/may）", struct: "助動詞 + 動詞原形",
    questions: [
      { id: "4_md_1", q: "You ___ do your homework.", choices: ["must", "are", "do", "to"], ans: 0, exp: "must + 原形。" },
      { id: "4_md_2", q: "___ I open the window?", choices: ["May", "Do", "Am", "Is"], ans: 0, exp: "許可を求める May I。" },
      { id: "4_md_3", q: "You ___ see a doctor.", choices: ["should", "are", "do", "have"], ans: 0, exp: "should + 原形。" },
      { id: "4_md_4", q: "We ___ be quiet here.", choices: ["must", "are", "do", "have"], ans: 0, exp: "must + 原形。" },
      { id: "4_md_5", q: "___ you help me, please?", choices: ["Could", "Do", "Are", "Is"], ans: 0, exp: "Could you ~?（依頼）。" },
    ],
  },
  {
    key: "there-is", name: "There is/are 構文", struct: "There is/are + 名詞",
    questions: [
      { id: "4_th_1", q: "___ a cat on the bed.", choices: ["There is", "There are", "It is", "Here"], ans: 0, exp: "単数 There is。" },
      { id: "4_th_2", q: "___ many books on the desk.", choices: ["There is", "There are", "It is", "Here is"], ans: 1, exp: "複数 There are。" },
      { id: "4_th_3", q: "___ any milk in the cup?", choices: ["Is there", "Are there", "There is", "Have"], ans: 0, exp: "疑問は Is there。" },
      { id: "4_th_4", q: "There ___ two dogs in the park.", choices: ["is", "are", "am", "be"], ans: 1, exp: "複数 are。" },
      { id: "4_th_5", q: "There ___ a park near here.", choices: ["is", "are", "am", "have"], ans: 0, exp: "単数 is。" },
    ],
  },
];

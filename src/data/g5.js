// 5級 文法ターゲット（各ターゲット5〜10問）
// 構造: { key, name, struct(構造説明), questions[] }
export const G5 = [
  {
    key: "be-aff", name: "be動詞（肯定）", struct: "主語 + be動詞 + 補語",
    questions: [
      { id: "5_be-aff_1", q: "I ___ a student.", choices: ["am", "is", "are", "be"], ans: 0, exp: "I には am。" },
      { id: "5_be-aff_2", q: "You ___ kind.", choices: ["am", "is", "are", "be"], ans: 2, exp: "you には are。" },
      { id: "5_be-aff_3", q: "This ___ a pen.", choices: ["am", "is", "are", "do"], ans: 1, exp: "三人称単数 this には is。" },
      { id: "5_be-aff_4", q: "We ___ friends.", choices: ["am", "is", "are", "be"], ans: 2, exp: "we には are。" },
      { id: "5_be-aff_5", q: "Tom and Ken ___ tall.", choices: ["am", "is", "are", "be"], ans: 2, exp: "複数主語には are。" },
      { id: "5_be-aff_6", q: "She ___ my sister.", choices: ["am", "is", "are", "do"], ans: 1, exp: "she には is。" },
      { id: "5_be-aff_7", q: "It ___ hot today.", choices: ["am", "is", "are", "be"], ans: 1, exp: "it には is。" },
    ],
  },
  {
    key: "be-neg-q", name: "be動詞（否定・疑問）", struct: "be動詞 + not / 疑問文",
    questions: [
      { id: "5_beq_1", q: "I ___ a teacher.", choices: ["am not", "is not", "are not", "not am"], ans: 0, exp: "I の否定は am not。" },
      { id: "5_beq_2", q: "___ they your friends?", choices: ["Do", "Are", "Is", "Does"], ans: 1, exp: "be動詞の疑問文は Are。" },
      { id: "5_beq_3", q: "She ___ a doctor. (否定)", choices: ["am not", "isn't", "aren't", "don't"], ans: 1, exp: "she の否定は isn't。" },
      { id: "5_beq_4", q: "___ this your bag?", choices: ["Do", "Is", "Are", "Does"], ans: 1, exp: "単数の疑問は Is。" },
      { id: "5_beq_5", q: "We ___ late. (否定)", choices: ["isn't", "aren't", "am not", "don't"], ans: 1, exp: "we の否定は aren't。" },
      { id: "5_beq_6", q: "___ you hungry?", choices: ["Do", "Are", "Is", "Have"], ans: 1, exp: "you には Are。" },
    ],
  },
  {
    key: "verb-aff", name: "一般動詞（肯定）", struct: "主語 + 一般動詞 + 目的語",
    questions: [
      { id: "5_va_1", q: "I ___ soccer.", choices: ["plays", "play", "playing", "played"], ans: 1, exp: "I は原形 play。" },
      { id: "5_va_2", q: "They ___ English.", choices: ["study", "studies", "studying", "studied"], ans: 0, exp: "複数主語は原形 study。" },
      { id: "5_va_3", q: "We ___ in Tokyo.", choices: ["live", "lives", "living", "lived"], ans: 0, exp: "we は原形 live。" },
      { id: "5_va_4", q: "I ___ music every day.", choices: ["like", "likes", "liking", "liked"], ans: 0, exp: "I は原形 like。" },
      { id: "5_va_5", q: "You ___ fast.", choices: ["run", "runs", "running", "ran"], ans: 0, exp: "you は原形 run。" },
    ],
  },
  {
    key: "verb-neg-q", name: "一般動詞（否定・疑問）", struct: "do/does + not / 疑問文",
    questions: [
      { id: "5_vq_1", q: "I ___ like natto.", choices: ["am not", "don't", "doesn't", "not"], ans: 1, exp: "一般動詞の否定は don't。" },
      { id: "5_vq_2", q: "___ you like dogs?", choices: ["Are", "Do", "Is", "Does"], ans: 1, exp: "一般動詞の疑問は Do。" },
      { id: "5_vq_3", q: "We ___ have a car.", choices: ["aren't", "don't", "doesn't", "isn't"], ans: 1, exp: "we の否定は don't。" },
      { id: "5_vq_4", q: "___ they play tennis?", choices: ["Are", "Do", "Does", "Is"], ans: 1, exp: "複数主語の疑問は Do。" },
      { id: "5_vq_5", q: "I ___ know him.", choices: ["am not", "don't", "doesn't", "isn't"], ans: 1, exp: "I の否定は don't。" },
    ],
  },
  {
    key: "third-person", name: "三人称単数現在", struct: "He/She/It + 動詞-s",
    questions: [
      { id: "5_3p_1", q: "She ___ tennis.", choices: ["play", "plays", "playing", "played"], ans: 1, exp: "三単現は plays。" },
      { id: "5_3p_2", q: "He ___ to school.", choices: ["go", "goes", "going", "gone"], ans: 1, exp: "go は goes。" },
      { id: "5_3p_3", q: "My mother ___ dinner.", choices: ["cook", "cooks", "cooking", "cooked"], ans: 1, exp: "三単現 cooks。" },
      { id: "5_3p_4", q: "___ he play the piano?", choices: ["Do", "Does", "Is", "Are"], ans: 1, exp: "三単現の疑問は Does。" },
      { id: "5_3p_5", q: "She ___ like coffee. (否定)", choices: ["don't", "doesn't", "isn't", "not"], ans: 1, exp: "三単現の否定は doesn't。" },
      { id: "5_3p_6", q: "It ___ every winter.", choices: ["snow", "snows", "snowing", "snowed"], ans: 1, exp: "三単現 snows。" },
      { id: "5_3p_7", q: "He ___ English well.", choices: ["speak", "speaks", "speaking", "spoke"], ans: 1, exp: "三単現 speaks。" },
    ],
  },
  {
    key: "pronoun", name: "代名詞（格変化）", struct: "主格・所有格・目的格",
    questions: [
      { id: "5_pn_1", q: "This is ___ book. (私の)", choices: ["I", "my", "me", "mine"], ans: 1, exp: "所有格 my。" },
      { id: "5_pn_2", q: "Please help ___. (私を)", choices: ["I", "my", "me", "mine"], ans: 2, exp: "目的格 me。" },
      { id: "5_pn_3", q: "That is ___ house. (彼らの)", choices: ["they", "their", "them", "theirs"], ans: 1, exp: "所有格 their。" },
      { id: "5_pn_4", q: "This is ___ bike. (彼の)", choices: ["he", "his", "him", "her"], ans: 1, exp: "所有格 his。" },
      { id: "5_pn_5", q: "I know ___. (彼を)", choices: ["he", "his", "him", "he's"], ans: 2, exp: "目的格 him。" },
      { id: "5_pn_6", q: "Look at ___. (彼女を)", choices: ["she", "her", "hers", "she's"], ans: 1, exp: "目的格 her。" },
      { id: "5_pn_7", q: "___ are good friends. (私たちは)", choices: ["Us", "Our", "We", "Ours"], ans: 2, exp: "主格 we。" },
    ],
  },
  {
    key: "plural", name: "名詞の複数形", struct: "名詞 + (e)s",
    questions: [
      { id: "5_pl_1", q: "I have two ___.", choices: ["book", "books", "bookes", "a book"], ans: 1, exp: "複数形 books。" },
      { id: "5_pl_2", q: "There are three ___.", choices: ["cat", "cats", "cates", "a cat"], ans: 1, exp: "複数形 cats。" },
      { id: "5_pl_3", q: "I have two ___.", choices: ["box", "boxs", "boxes", "boxies"], ans: 2, exp: "x で終わる語は es。" },
      { id: "5_pl_4", q: "I like ___.", choices: ["a apple", "apple", "apples", "an apples"], ans: 2, exp: "一般的な複数 apples。" },
      { id: "5_pl_5", q: "She has many ___.", choices: ["dish", "dishs", "dishes", "dishies"], ans: 2, exp: "sh で終わる語は es。" },
      { id: "5_pl_6", q: "We see three ___.", choices: ["baby", "babys", "babies", "babyes"], ans: 2, exp: "子音+y は y→ies。" },
    ],
  },
  {
    key: "article", name: "冠詞 a / an", struct: "a/an + 名詞",
    questions: [
      { id: "5_ar_1", q: "I have ___ apple.", choices: ["a", "an", "the", "x"], ans: 1, exp: "母音の前は an。" },
      { id: "5_ar_2", q: "I have ___ dog.", choices: ["a", "an", "of", "to"], ans: 0, exp: "子音の前は a。" },
      { id: "5_ar_3", q: "I see ___ orange.", choices: ["a", "an", "the", "x"], ans: 1, exp: "母音の前は an。" },
      { id: "5_ar_4", q: "She is ___ teacher.", choices: ["a", "an", "of", "to"], ans: 0, exp: "子音の前は a。" },
      { id: "5_ar_5", q: "He has ___ umbrella.", choices: ["a", "an", "the", "x"], ans: 1, exp: "母音の前は an。" },
    ],
  },
  {
    key: "wh-question", name: "疑問詞", struct: "What/Who/Where/When/Whose + 疑問文",
    questions: [
      { id: "5_wh_1", q: "___ is this? — It's a cat.", choices: ["Who", "What", "Where", "When"], ans: 1, exp: "「何」は What。" },
      { id: "5_wh_2", q: "___ is your name?", choices: ["Who", "What", "Where", "When"], ans: 1, exp: "名前は What。" },
      { id: "5_wh_3", q: "___ do you live?", choices: ["What", "Where", "When", "Who"], ans: 1, exp: "場所は Where。" },
      { id: "5_wh_4", q: "___ pen is this? — It's mine.", choices: ["Who", "Whose", "What", "Which"], ans: 1, exp: "「誰の」は Whose。" },
      { id: "5_wh_5", q: "___ is that man?", choices: ["Who", "What", "Where", "Whose"], ans: 0, exp: "「誰」は Who。" },
      { id: "5_wh_6", q: "___ is your birthday?", choices: ["What", "When", "Who", "Whose"], ans: 1, exp: "時を聞く When。" },
      { id: "5_wh_7", q: "___ time is it?", choices: ["What", "When", "Who", "Where"], ans: 0, exp: "時刻は What time。" },
    ],
  },
  {
    key: "progressive", name: "現在進行形", struct: "be動詞 + 動詞-ing",
    questions: [
      { id: "5_pr_1", q: "I ___ watching TV now.", choices: ["am", "is", "are", "do"], ans: 0, exp: "I am + ~ing。" },
      { id: "5_pr_2", q: "They are ___ in the park.", choices: ["run", "runs", "running", "ran"], ans: 2, exp: "run は running。" },
      { id: "5_pr_3", q: "He is ___ now.", choices: ["sleep", "sleeps", "sleeping", "slept"], ans: 2, exp: "進行形 sleeping。" },
      { id: "5_pr_4", q: "We are ___ lunch.", choices: ["have", "has", "having", "had"], ans: 2, exp: "have は having。" },
      { id: "5_pr_5", q: "___ you reading a book?", choices: ["Do", "Are", "Is", "Does"], ans: 1, exp: "進行形の疑問は be動詞。" },
      { id: "5_pr_6", q: "She is ___ a letter.", choices: ["write", "writes", "writing", "wrote"], ans: 2, exp: "write は writing。" },
    ],
  },
  {
    key: "can", name: "助動詞 can", struct: "can + 動詞原形",
    questions: [
      { id: "5_can_1", q: "I ___ swim well.", choices: ["can", "am", "do", "is"], ans: 0, exp: "can + 原形。" },
      { id: "5_can_2", q: "___ you play the guitar?", choices: ["Are", "Do", "Can", "Is"], ans: 2, exp: "能力を聞く Can you。" },
      { id: "5_can_3", q: "She ___ speak English.", choices: ["can", "cans", "is", "does"], ans: 0, exp: "can に s は付かない。" },
      { id: "5_can_4", q: "I ___ swim. (否定)", choices: ["can not be", "cannot", "don't can", "am not"], ans: 1, exp: "cannot / can't。" },
      { id: "5_can_5", q: "___ I open the window?", choices: ["Can", "Am", "Do", "Is"], ans: 0, exp: "許可を求める Can I。" },
    ],
  },
  {
    key: "imperative", name: "命令文", struct: "動詞原形 で始める",
    questions: [
      { id: "5_im_1", q: "___ the door, please.", choices: ["Opens", "Opening", "Open", "To open"], ans: 2, exp: "命令文は原形。" },
      { id: "5_im_2", q: "___ quiet, please.", choices: ["Be", "Is", "Are", "Do"], ans: 0, exp: "be動詞の命令文は Be。" },
      { id: "5_im_3", q: "___ play tennis! (〜しよう)", choices: ["Let", "Let's", "Lets", "Let us to"], ans: 1, exp: "Let's + 原形。" },
      { id: "5_im_4", q: "___ run here. (〜するな)", choices: ["Don't", "Not", "No", "Doesn't"], ans: 0, exp: "否定命令は Don't + 原形。" },
      { id: "5_im_5", q: "___ careful!", choices: ["Be", "Do", "Are", "Is"], ans: 0, exp: "Be careful。" },
    ],
  },
  {
    key: "preposition", name: "前置詞（場所・時）", struct: "in/on/at/under/by + 名詞",
    questions: [
      { id: "5_prep_1", q: "The cat is ___ the box.", choices: ["in", "of", "to", "for"], ans: 0, exp: "「中に」は in。" },
      { id: "5_prep_2", q: "The book is ___ the desk.", choices: ["on", "of", "to", "for"], ans: 0, exp: "「上に」は on。" },
      { id: "5_prep_3", q: "I get up ___ seven.", choices: ["in", "at", "on", "to"], ans: 1, exp: "時刻には at。" },
      { id: "5_prep_4", q: "I play soccer ___ Sunday.", choices: ["in", "at", "on", "to"], ans: 2, exp: "曜日には on。" },
      { id: "5_prep_5", q: "The ball is ___ the desk. (下に)", choices: ["on", "under", "in", "at"], ans: 1, exp: "「下に」は under。" },
      { id: "5_prep_6", q: "I live ___ Japan.", choices: ["at", "in", "on", "to"], ans: 1, exp: "国には in。" },
    ],
  },
  {
    key: "demonstrative", name: "指示詞 this/that/these/those", struct: "this/that + 名詞",
    questions: [
      { id: "5_dem_1", q: "___ are my books. (これらは)", choices: ["This", "That", "These", "It"], ans: 2, exp: "複数の「これら」は These。" },
      { id: "5_dem_2", q: "___ is my pen. (あれは)", choices: ["These", "Those", "That", "They"], ans: 2, exp: "単数の「あれ」は That。" },
      { id: "5_dem_3", q: "___ is a dog. (これは)", choices: ["This", "These", "Those", "They"], ans: 0, exp: "単数の「これ」は This。" },
      { id: "5_dem_4", q: "___ are flowers. (あれらは)", choices: ["That", "This", "Those", "It"], ans: 2, exp: "複数の「あれら」は Those。" },
      { id: "5_dem_5", q: "How much is ___ cap?", choices: ["these", "those", "this", "they"], ans: 2, exp: "単数名詞には this。" },
    ],
  },
];

import { useState, useEffect, useCallback, useRef, useMemo } from "react";

// ======================== DATA ========================

const ALL_COUNTRIES = [
  // Tier 1 — Most popular
  { code: "pl", pl: "Polska", tier: 1 },
  { code: "de", pl: "Niemcy", tier: 1 },
  { code: "fr", pl: "Francja", tier: 1 },
  { code: "gb", pl: "Wielka Brytania", tier: 1 },
  { code: "it", pl: "Włochy", tier: 1 },
  { code: "es", pl: "Hiszpania", tier: 1 },
  { code: "us", pl: "Stany Zjednoczone", tier: 1 },
  { code: "cn", pl: "Chiny", tier: 1 },
  { code: "jp", pl: "Japonia", tier: 1 },
  { code: "in", pl: "Indie", tier: 1 },
  { code: "br", pl: "Brazylia", tier: 1 },
  { code: "au", pl: "Australia", tier: 1 },
  { code: "ca", pl: "Kanada", tier: 1 },
  { code: "ru", pl: "Rosja", tier: 1 },
  { code: "ua", pl: "Ukraina", tier: 1 },
  { code: "cz", pl: "Czechy", tier: 1 },
  { code: "sk", pl: "Słowacja", tier: 1 },
  { code: "at", pl: "Austria", tier: 1 },
  { code: "ch", pl: "Szwajcaria", tier: 1 },
  { code: "se", pl: "Szwecja", tier: 1 },
  { code: "no", pl: "Norwegia", tier: 1 },
  { code: "dk", pl: "Dania", tier: 1 },
  { code: "fi", pl: "Finlandia", tier: 1 },
  { code: "nl", pl: "Holandia", tier: 1 },
  { code: "be", pl: "Belgia", tier: 1 },
  { code: "ie", pl: "Irlandia", tier: 1 },
  { code: "pt", pl: "Portugalia", tier: 1 },
  { code: "gr", pl: "Grecja", tier: 1 },
  { code: "tr", pl: "Turcja", tier: 1 },
  { code: "eg", pl: "Egipt", tier: 1 },
  { code: "mx", pl: "Meksyk", tier: 1 },
  { code: "kr", pl: "Korea Południowa", tier: 1 },
  { code: "ar", pl: "Argentyna", tier: 1 },
  { code: "za", pl: "Republika Południowej Afryki", tier: 1 },
  { code: "il", pl: "Izrael", tier: 1 },
  { code: "hu", pl: "Węgry", tier: 1 },
  { code: "hr", pl: "Chorwacja", tier: 1 },
  { code: "ro", pl: "Rumunia", tier: 1 },
  { code: "bg", pl: "Bułgaria", tier: 1 },
  { code: "lt", pl: "Litwa", tier: 1 },
  { code: "nz", pl: "Nowa Zelandia", tier: 1 },
  { code: "is", pl: "Islandia", tier: 1 },

  // Tier 2 — Moderately known
  { code: "by", pl: "Białoruś", tier: 2 },
  { code: "ee", pl: "Estonia", tier: 2 },
  { code: "lv", pl: "Łotwa", tier: 2 },
  { code: "si", pl: "Słowenia", tier: 2 },
  { code: "lu", pl: "Luksemburg", tier: 2 },
  { code: "mt", pl: "Malta", tier: 2 },
  { code: "cy", pl: "Cypr", tier: 2 },
  { code: "rs", pl: "Serbia", tier: 2 },
  { code: "ba", pl: "Bośnia i Hercegowina", tier: 2 },
  { code: "me", pl: "Czarnogóra", tier: 2 },
  { code: "al", pl: "Albania", tier: 2 },
  { code: "mk", pl: "Macedonia Północna", tier: 2 },
  { code: "md", pl: "Mołdawia", tier: 2 },
  { code: "ge", pl: "Gruzja", tier: 2 },
  { code: "am", pl: "Armenia", tier: 2 },
  { code: "az", pl: "Azerbejdżan", tier: 2 },
  { code: "ir", pl: "Iran", tier: 2 },
  { code: "iq", pl: "Irak", tier: 2 },
  { code: "sa", pl: "Arabia Saudyjska", tier: 2 },
  { code: "ae", pl: "Zjednoczone Emiraty Arabskie", tier: 2 },
  { code: "pk", pl: "Pakistan", tier: 2 },
  { code: "bd", pl: "Bangladesz", tier: 2 },
  { code: "th", pl: "Tajlandia", tier: 2 },
  { code: "vn", pl: "Wietnam", tier: 2 },
  { code: "id", pl: "Indonezja", tier: 2 },
  { code: "ph", pl: "Filipiny", tier: 2 },
  { code: "my", pl: "Malezja", tier: 2 },
  { code: "sg", pl: "Singapur", tier: 2 },
  { code: "tw", pl: "Tajwan", tier: 2 },
  { code: "kp", pl: "Korea Północna", tier: 2 },
  { code: "kz", pl: "Kazachstan", tier: 2 },
  { code: "co", pl: "Kolumbia", tier: 2 },
  { code: "cl", pl: "Chile", tier: 2 },
  { code: "pe", pl: "Peru", tier: 2 },
  { code: "cu", pl: "Kuba", tier: 2 },
  { code: "ma", pl: "Maroko", tier: 2 },
  { code: "ng", pl: "Nigeria", tier: 2 },
  { code: "ke", pl: "Kenia", tier: 2 },
  { code: "et", pl: "Etiopia", tier: 2 },
  { code: "dz", pl: "Algieria", tier: 2 },
  { code: "tn", pl: "Tunezja", tier: 2 },
  { code: "gh", pl: "Ghana", tier: 2 },
  { code: "tz", pl: "Tanzania", tier: 2 },
  { code: "sy", pl: "Syria", tier: 2 },
  { code: "jo", pl: "Jordania", tier: 2 },
  { code: "lb", pl: "Liban", tier: 2 },
  { code: "np", pl: "Nepal", tier: 2 },
  { code: "mm", pl: "Mjanma", tier: 2 },
  { code: "kh", pl: "Kambodża", tier: 2 },
  { code: "lk", pl: "Sri Lanka", tier: 2 },
  { code: "uy", pl: "Urugwaj", tier: 2 },
  { code: "ec", pl: "Ekwador", tier: 2 },

  // Tier 3 — Less commonly known
  { code: "af", pl: "Afganistan", tier: 3 },
  { code: "ad", pl: "Andora", tier: 3 },
  { code: "ao", pl: "Angola", tier: 3 },
  { code: "ag", pl: "Antigua i Barbuda", tier: 3 },
  { code: "bs", pl: "Bahamy", tier: 3 },
  { code: "bh", pl: "Bahrajn", tier: 3 },
  { code: "bb", pl: "Barbados", tier: 3 },
  { code: "bz", pl: "Belize", tier: 3 },
  { code: "bj", pl: "Benin", tier: 3 },
  { code: "bt", pl: "Bhutan", tier: 3 },
  { code: "bo", pl: "Boliwia", tier: 3 },
  { code: "bw", pl: "Botswana", tier: 3 },
  { code: "bn", pl: "Brunei", tier: 3 },
  { code: "bf", pl: "Burkina Faso", tier: 3 },
  { code: "bi", pl: "Burundi", tier: 3 },
  { code: "cv", pl: "Cabo Verde", tier: 3 },
  { code: "cm", pl: "Kamerun", tier: 3 },
  { code: "cf", pl: "Republika Środkowoafrykańska", tier: 3 },
  { code: "td", pl: "Czad", tier: 3 },
  { code: "km", pl: "Komory", tier: 3 },
  { code: "cd", pl: "Demokratyczna Republika Konga", tier: 3 },
  { code: "cg", pl: "Kongo", tier: 3 },
  { code: "cr", pl: "Kostaryka", tier: 3 },
  { code: "ci", pl: "Wybrzeże Kości Słoniowej", tier: 3 },
  { code: "dj", pl: "Dżibuti", tier: 3 },
  { code: "dm", pl: "Dominika", tier: 3 },
  { code: "do", pl: "Dominikana", tier: 3 },
  { code: "sv", pl: "Salwador", tier: 3 },
  { code: "gq", pl: "Gwinea Równikowa", tier: 3 },
  { code: "er", pl: "Erytrea", tier: 3 },
  { code: "sz", pl: "Eswatini", tier: 3 },
  { code: "fj", pl: "Fidżi", tier: 3 },
  { code: "ga", pl: "Gabon", tier: 3 },
  { code: "gm", pl: "Gambia", tier: 3 },
  { code: "gd", pl: "Grenada", tier: 3 },
  { code: "gt", pl: "Gwatemala", tier: 3 },
  { code: "gn", pl: "Gwinea", tier: 3 },
  { code: "gw", pl: "Gwinea Bissau", tier: 3 },
  { code: "gy", pl: "Gujana", tier: 3 },
  { code: "ht", pl: "Haiti", tier: 3 },
  { code: "hn", pl: "Honduras", tier: 3 },
  { code: "jm", pl: "Jamajka", tier: 3 },
  { code: "kw", pl: "Kuwejt", tier: 3 },
  { code: "kg", pl: "Kirgistan", tier: 3 },
  { code: "la", pl: "Laos", tier: 3 },
  { code: "ls", pl: "Lesotho", tier: 3 },
  { code: "lr", pl: "Liberia", tier: 3 },
  { code: "ly", pl: "Libia", tier: 3 },
  { code: "li", pl: "Liechtenstein", tier: 3 },
  { code: "mg", pl: "Madagaskar", tier: 3 },
  { code: "mw", pl: "Malawi", tier: 3 },
  { code: "mv", pl: "Malediwy", tier: 3 },
  { code: "ml", pl: "Mali", tier: 3 },
  { code: "mh", pl: "Wyspy Marshalla", tier: 3 },
  { code: "mr", pl: "Mauretania", tier: 3 },
  { code: "mu", pl: "Mauritius", tier: 3 },
  { code: "fm", pl: "Mikronezja", tier: 3 },
  { code: "mc", pl: "Monako", tier: 3 },
  { code: "mn", pl: "Mongolia", tier: 3 },
  { code: "mz", pl: "Mozambik", tier: 3 },
  { code: "na", pl: "Namibia", tier: 3 },
  { code: "nr", pl: "Nauru", tier: 3 },
  { code: "ni", pl: "Nikaragua", tier: 3 },
  { code: "ne", pl: "Niger", tier: 3 },
  { code: "om", pl: "Oman", tier: 3 },
  { code: "pw", pl: "Palau", tier: 3 },
  { code: "pa", pl: "Panama", tier: 3 },
  { code: "pg", pl: "Papua-Nowa Gwinea", tier: 3 },
  { code: "py", pl: "Paragwaj", tier: 3 },
  { code: "qa", pl: "Katar", tier: 3 },
  { code: "rw", pl: "Rwanda", tier: 3 },
  { code: "kn", pl: "Saint Kitts i Nevis", tier: 3 },
  { code: "lc", pl: "Saint Lucia", tier: 3 },
  { code: "vc", pl: "Saint Vincent i Grenadyny", tier: 3 },
  { code: "ws", pl: "Samoa", tier: 3 },
  { code: "sm", pl: "San Marino", tier: 3 },
  { code: "st", pl: "Wyspy Świętego Tomasza i Książęca", tier: 3 },
  { code: "sn", pl: "Senegal", tier: 3 },
  { code: "sc", pl: "Seszele", tier: 3 },
  { code: "sl", pl: "Sierra Leone", tier: 3 },
  { code: "sb", pl: "Wyspy Salomona", tier: 3 },
  { code: "so", pl: "Somalia", tier: 3 },
  { code: "ss", pl: "Sudan Południowy", tier: 3 },
  { code: "sd", pl: "Sudan", tier: 3 },
  { code: "sr", pl: "Surinam", tier: 3 },
  { code: "tj", pl: "Tadżykistan", tier: 3 },
  { code: "tl", pl: "Timor Wschodni", tier: 3 },
  { code: "tg", pl: "Togo", tier: 3 },
  { code: "to", pl: "Tonga", tier: 3 },
  { code: "tt", pl: "Trynidad i Tobago", tier: 3 },
  { code: "tm", pl: "Turkmenistan", tier: 3 },
  { code: "tv", pl: "Tuvalu", tier: 3 },
  { code: "ug", pl: "Uganda", tier: 3 },
  { code: "uz", pl: "Uzbekistan", tier: 3 },
  { code: "vu", pl: "Vanuatu", tier: 3 },
  { code: "va", pl: "Watykan", tier: 3 },
  { code: "ve", pl: "Wenezuela", tier: 3 },
  { code: "ye", pl: "Jemen", tier: 3 },
  { code: "zm", pl: "Zambia", tier: 3 },
  { code: "zw", pl: "Zimbabwe", tier: 3 },
  { code: "ps", pl: "Palestyna", tier: 3 },
];

const SPEECH_ALIASES = {
  us: ["ameryka", "usa", "stany", "stany zjednoczone ameryki"],
  gb: ["anglia", "wielka brytania", "zjednoczone królestwo"],
  za: ["rpa", "afryka południowa"],
  kr: ["korea", "korea południowa"],
  kp: ["korea północna"],
  ae: ["emiraty", "zea"],
  cd: ["kongo demokratyczne", "drkongo"],
  cf: ["republika środkowoafrykańska", "środkowoafrykańska"],
  cz: ["republika czeska"],
  ba: ["bośnia"],
  do: ["republika dominikańska"],
};

// ======================== HELPERS ========================

const flagEmoji = (code) =>
  code.toUpperCase().replace(/./g, (c) => String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65));

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const QUIZ_LENGTH = 10;

function speak(text, lang = "pl-PL") {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = 0.85;
  u.pitch = 1.1;
  const voices = window.speechSynthesis.getVoices();
  const plVoice = voices.find((v) => v.lang.startsWith("pl"));
  if (plVoice) u.voice = plVoice;
  window.speechSynthesis.speak(u);
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] !== b[j - 1] ? 1 : 0)
      );
  return dp[m][n];
}

function matchesCountry(spokenAlts, country) {
  const target = country.pl.toLowerCase().trim();
  const aliases = (SPEECH_ALIASES[country.code] || []).map((a) => a.toLowerCase());
  const allTargets = [target, ...aliases];
  return spokenAlts.some((spoken) => {
    const s = spoken.toLowerCase().trim();
    return allTargets.some((t) => {
      if (s === t || s.includes(t) || t.includes(s)) return true;
      if (t.length > 3 && levenshtein(s, t) <= 2) return true;
      return false;
    });
  });
}

// ======================== SPEECH RECOGNITION HOOK ========================

function useSpeechRecognition({ onResult, lang = "pl-PL" }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [supported, setSupported] = useState(false);
  const onResultRef = useRef(onResult);
  onResultRef.current = onResult;
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    setSupported(true);
    const r = new SR();
    r.lang = lang;
    r.continuous = false;
    r.interimResults = true;
    r.maxAlternatives = 5;
    r.onresult = (event) => {
      const text = Array.from(event.results).map((r) => r[0].transcript).join("");
      setTranscript(text);
      if (event.results[0]?.isFinal) {
        const alts = Array.from(event.results[0]).map((a) => a.transcript.toLowerCase().trim());
        onResultRef.current(alts);
      }
    };
    r.onend = () => setIsListening(false);
    r.onerror = () => setIsListening(false);
    recognitionRef.current = r;
    return () => { try { r.abort(); } catch (e) {} };
  }, [lang]);

  const start = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      setTranscript("");
      try { recognitionRef.current.start(); setIsListening(true); } catch (e) {}
    }
  }, [isListening]);

  const stop = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }
  }, [isListening]);

  return { isListening, transcript, supported, start, stop };
}

// ======================== STYLES ========================

const gold = "#c9a84c";
const goldLight = "#e8c96e";
const dmSans = "'DM Sans', sans-serif";
const playfair = "'Playfair Display', Georgia, serif";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;700&display=swap');
  @keyframes fadeSlideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes scaleIn { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }
  @keyframes shimmer { 0% { background-position:-200% center; } 100% { background-position:200% center; } }
  @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
  @keyframes confettiDrop { 0% { transform:translateY(-10px) rotate(0deg); opacity:1; } 100% { transform:translateY(80px) rotate(360deg); opacity:0; } }
  @keyframes micPulse { 0%,100% { box-shadow:0 0 0 0 rgba(255,80,80,0.4); } 50% { box-shadow:0 0 0 14px rgba(255,80,80,0); } }
  @keyframes streakPulse { 0% { box-shadow:0 0 0 0 rgba(201,168,76,0.4); } 70% { box-shadow:0 0 0 12px rgba(201,168,76,0); } 100% { box-shadow:0 0 0 0 rgba(201,168,76,0); } }
  .btn { transition: all 0.2s ease; cursor: pointer; }
  .btn:hover { transform: translateY(-2px); filter: brightness(1.1); }
  .btn:active { transform: translateY(0); }
`;

// ======================== APP ========================

export default function App() {
  const [mode, setMode] = useState("menu"); // menu | learn | quiz
  const [tier, setTier] = useState(1);

  // Learn state
  const [learnIndex, setLearnIndex] = useState(0);
  const [learnList, setLearnList] = useState([]);
  const [nameVisible, setNameVisible] = useState(false);

  // Quiz state
  const [quizList, setQuizList] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState(null); // null | country object picked
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState(null);

  const countries = useMemo(
    () => ALL_COUNTRIES.filter((c) => c.tier <= tier),
    [tier]
  );

  const tierCounts = useMemo(() => ({
    1: ALL_COUNTRIES.filter((c) => c.tier <= 1).length,
    2: ALL_COUNTRIES.filter((c) => c.tier <= 2).length,
    3: ALL_COUNTRIES.length,
  }), []);

  // Voice recognition
  const voiceHandlerRef = useRef(null);
  const speech = useSpeechRecognition({
    onResult: (alts) => { if (voiceHandlerRef.current) voiceHandlerRef.current(alts); },
    lang: "pl-PL",
  });

  // ---- Learn mode ----
  const startLearn = useCallback(() => {
    const list = shuffle(countries);
    setLearnList(list);
    setLearnIndex(0);
    setNameVisible(false);
    setMode("learn");
  }, [countries]);

  const learnCountry = learnList[learnIndex];

  const learnReveal = () => {
    setNameVisible(true);
    if (learnCountry) speak(learnCountry.pl);
  };

  const learnNext = () => {
    const ni = learnIndex + 1;
    if (ni >= learnList.length) {
      // Loop — reshuffle
      setLearnList(shuffle(countries));
      setLearnIndex(0);
    } else {
      setLearnIndex(ni);
    }
    setNameVisible(false);
  };

  const learnPrev = () => {
    if (learnIndex > 0) {
      setLearnIndex(learnIndex - 1);
      setNameVisible(false);
    }
  };

  // ---- Quiz mode ----
  const makeOptions = (correct, pool) =>
    shuffle([correct, ...shuffle(pool.filter((c) => c.code !== correct.code)).slice(0, 3)]);

  const startQuiz = useCallback(() => {
    const list = shuffle(countries).slice(0, QUIZ_LENGTH);
    setQuizList(list);
    setQuizIndex(0);
    setOptions(makeOptions(list[0], countries));
    setAnswered(null);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setShowConfetti(false);
    setVoiceFeedback(null);
    setMode("quiz");
  }, [countries]);

  const quizCountry = quizList[quizIndex];
  const quizDone = quizIndex >= QUIZ_LENGTH && quizList.length > 0;
  const quizPct = quizDone ? Math.round((score / QUIZ_LENGTH) * 100) : 0;

  const pickAnswer = (opt) => {
    if (answered) return;
    setAnswered(opt);
    const correct = opt.code === quizCountry.code;
    const ns = correct ? streak + 1 : 0;
    setStreak(ns);
    if (ns > bestStreak) setBestStreak(ns);
    if (correct) {
      setScore((s) => s + 1);
      if (ns >= 3) setShowConfetti(true);
      speak(`Brawo! To ${quizCountry.pl}`);
    } else {
      speak(`To ${quizCountry.pl}`);
    }
  };

  const quizNext = () => {
    const ni = quizIndex + 1;
    setShowConfetti(false);
    setVoiceFeedback(null);
    if (ni >= QUIZ_LENGTH) {
      setQuizIndex(ni); // triggers quizDone
      return;
    }
    setQuizIndex(ni);
    setOptions(makeOptions(quizList[ni], countries));
    setAnswered(null);
  };

  // Wire up voice handler for quiz
  useEffect(() => {
    if (mode === "quiz" && quizCountry && !answered && !quizDone) {
      voiceHandlerRef.current = (alts) => {
        // Try to match against the 4 visible options
        const match = options.find((opt) => matchesCountry(alts, opt));
        if (match) {
          pickAnswer(match);
        } else {
          speak("Spróbuj jeszcze raz");
          setVoiceFeedback("Spróbuj jeszcze raz");
          setTimeout(() => setVoiceFeedback(null), 2000);
        }
      };
    } else {
      voiceHandlerRef.current = null;
    }
  });

  // ---- Medal ----
  const getMedal = (pct) => {
    if (pct >= 90) return { icon: "🥇", label: "Mistrz flag!" };
    if (pct >= 70) return { icon: "🥈", label: "Świetny wynik!" };
    if (pct >= 50) return { icon: "🥉", label: "Niezły start!" };
    return { icon: "📚", label: "Ćwicz dalej!" };
  };

  // ======================== RENDER ========================
  return (
    <div style={{
      background: "linear-gradient(160deg, #080e18 0%, #0d1b2a 30%, #162d4a 70%, #0d1b2a 100%)",
      minHeight: "100vh", padding: "24px 16px 64px",
      display: "flex", flexDirection: "column", alignItems: "center",
      fontFamily: playfair, position: "relative", overflow: "hidden",
    }}>
      <style>{CSS}</style>

      {/* Bg blobs */}
      <div style={{ position: "absolute", top: -200, right: -200, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -100, left: -150, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(30,80,140,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 24, animation: "fadeSlideUp 0.6s ease" }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: "#f0e6d0", margin: 0, lineHeight: 1.1 }}>
          Flagi{" "}
          <span style={{
            color: gold,
            backgroundImage: `linear-gradient(90deg, ${gold}, ${goldLight}, ${gold})`,
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            animation: "shimmer 4s linear infinite",
          }}>Świata</span>
        </h1>
      </div>

      {/* Back button */}
      {mode !== "menu" && (
        <button className="btn" onClick={() => setMode("menu")} style={{
          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 10, padding: "8px 24px", color: "#7a8a9e",
          fontFamily: dmSans, fontSize: 13, fontWeight: 600, marginBottom: 24,
        }}>
          ← Menu
        </button>
      )}

      {/* ==================== MENU ==================== */}
      {mode === "menu" && (
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 24,
          width: "100%", maxWidth: 400, animation: "fadeSlideUp 0.5s ease", marginTop: 12,
        }}>
          <div style={{ fontSize: 64, animation: "float 4s ease-in-out infinite" }}>🌍</div>

          {/* Tier picker */}
          <div style={{
            display: "flex", gap: 6, width: "100%",
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14, padding: 6,
          }}>
            {[
              { t: 1, label: "Popularne", emoji: "⭐" },
              { t: 2, label: "Więcej", emoji: "🌟" },
              { t: 3, label: "Wszystkie", emoji: "🌍" },
            ].map(({ t, label, emoji }) => (
              <button key={t} onClick={() => setTier(t)} style={{
                flex: 1, background: tier === t ? "rgba(201,168,76,0.15)" : "transparent",
                border: tier === t ? `1px solid rgba(201,168,76,0.4)` : "1px solid transparent",
                borderRadius: 10, padding: "14px 6px", cursor: "pointer", textAlign: "center",
                color: tier === t ? gold : "#5a7a9a", fontFamily: dmSans, fontSize: 13, fontWeight: 700,
              }}>
                <div>{emoji} {label}</div>
                <div style={{ fontSize: 11, opacity: 0.6, marginTop: 2 }}>{tierCounts[t]}</div>
              </button>
            ))}
          </div>

          {/* Mode cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
            <button className="btn" onClick={startLearn} style={{
              background: "rgba(90,160,255,0.06)", border: "1px solid rgba(90,160,255,0.2)",
              borderRadius: 18, padding: "28px 28px", textAlign: "left",
              display: "flex", alignItems: "center", gap: 20,
            }}>
              <div style={{ fontSize: 40 }}>📖</div>
              <div>
                <div style={{ color: "#f0e6d0", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Nauka</div>
                <div style={{ color: "#6a7b90", fontSize: 13, fontFamily: dmSans }}>
                  Przeglądaj flagi · słuchaj nazw · ucz się
                </div>
              </div>
            </button>

            <button className="btn" onClick={startQuiz} style={{
              background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)",
              borderRadius: 18, padding: "28px 28px", textAlign: "left",
              display: "flex", alignItems: "center", gap: 20,
            }}>
              <div style={{ fontSize: 40 }}>🎯</div>
              <div>
                <div style={{ color: "#f0e6d0", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Quiz</div>
                <div style={{ color: "#6a7b90", fontSize: 13, fontFamily: dmSans }}>
                  {QUIZ_LENGTH} pytań · powiedz lub wybierz · zdobywaj punkty
                </div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* ==================== LEARN MODE ==================== */}
      {mode === "learn" && learnCountry && (
        <div style={{
          width: "100%", maxWidth: 440,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
          animation: "scaleIn 0.35s ease",
        }}>
          {/* Progress */}
          <div style={{
            fontSize: 12, color: "#5a7a9a", fontFamily: dmSans, fontWeight: 600,
            letterSpacing: 2,
          }}>
            {learnIndex + 1} / {learnList.length}
          </div>

          {/* Card */}
          <div key={learnIndex} style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 24, padding: "36px 28px 28px", width: "100%",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 24,
            boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
            animation: "scaleIn 0.3s ease",
          }}>
            {/* Flag */}
            <div style={{
              width: "100%", maxWidth: 280, aspectRatio: "3/2", borderRadius: 14, overflow: "hidden",
              background: "#1a2f4a", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
            }}>
              <span style={{ fontSize: 110, lineHeight: 1 }}>{flagEmoji(learnCountry.code)}</span>
            </div>

            {/* Name area */}
            {!nameVisible ? (
              <button className="btn" onClick={learnReveal} style={{
                background: "linear-gradient(135deg, #5fa8ff, #8fc4ff)",
                border: "none", borderRadius: 14, padding: "18px 44px",
                color: "#0d1b2a", fontFamily: dmSans, fontSize: 16, fontWeight: 700,
                letterSpacing: 1, boxShadow: "0 6px 24px rgba(90,160,255,0.3)",
              }}>
                🔊 Posłuchaj nazwy
              </button>
            ) : (
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
                animation: "scaleIn 0.3s ease",
              }}>
                <div style={{
                  fontSize: 32, fontWeight: 900, color: "#f0e6d0", textAlign: "center",
                }}>{learnCountry.pl}</div>
                <button className="btn" onClick={() => speak(learnCountry.pl)} style={{
                  background: "rgba(90,160,255,0.12)", border: "1px solid rgba(90,160,255,0.3)",
                  borderRadius: 10, padding: "10px 24px",
                  color: "#8fc4ff", fontFamily: dmSans, fontSize: 13, fontWeight: 600,
                }}>
                  🔊 Powtórz
                </button>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", gap: 12, width: "100%" }}>
            <button className="btn" onClick={learnPrev} disabled={learnIndex === 0} style={{
              flex: 1, background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14,
              padding: "16px", color: learnIndex === 0 ? "#3a4a5a" : "#8a9aaa",
              fontFamily: dmSans, fontSize: 15, fontWeight: 700,
              cursor: learnIndex === 0 ? "default" : "pointer",
            }}>
              ← Poprzednia
            </button>
            <button className="btn" onClick={learnNext} style={{
              flex: 1, background: `linear-gradient(135deg, ${gold}, ${goldLight})`,
              border: "none", borderRadius: 14, padding: "16px",
              color: "#0d1b2a", fontFamily: dmSans, fontSize: 15, fontWeight: 700,
              boxShadow: "0 6px 24px rgba(201,168,76,0.3)",
            }}>
              Następna →
            </button>
          </div>
        </div>
      )}

      {/* ==================== QUIZ MODE ==================== */}
      {mode === "quiz" && !quizDone && quizCountry && (
        <div key={quizIndex} style={{
          width: "100%", maxWidth: 440,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
          animation: "scaleIn 0.35s ease",
        }}>
          {/* Score bar */}
          <div style={{
            display: "flex", gap: 20, background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(201,168,76,0.15)",
            borderRadius: 14, padding: "12px 28px",
            animation: streak >= 3 ? "streakPulse 1.5s ease infinite" : "none",
          }}>
            {[["Punkty", score], ["Seria", streak], ["Pytanie", `${quizIndex + 1}/${QUIZ_LENGTH}`]].map(([lbl, val], i) => (
              <div key={lbl} style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: 24, fontWeight: 700, color: lbl === "Seria" && streak >= 3 ? "#e8c96e" : gold,
                  lineHeight: 1, fontFamily: playfair,
                }}>
                  {val}{lbl === "Seria" && streak >= 3 ? "🔥" : ""}
                </div>
                <div style={{
                  fontSize: 9, letterSpacing: 2, textTransform: "uppercase",
                  color: "#6a7b90", marginTop: 4, fontFamily: dmSans, fontWeight: 500,
                }}>{lbl}</div>
              </div>
            ))}
          </div>

          {/* Main card */}
          <div style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 24, padding: "28px 24px 24px", width: "100%",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 18,
            position: "relative", boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
          }}>
            {/* Confetti */}
            {showConfetti && Array.from({ length: 12 }).map((_, i) => (
              <div key={i} style={{
                position: "absolute", left: `${10 + Math.random() * 80}%`, top: -5,
                width: 6, height: 6,
                borderRadius: i % 2 === 0 ? "50%" : "1px",
                background: [gold, "#48c774", "#e8c96e", "#ff7f7f", "#5fa8ff"][i % 5],
                animation: `confettiDrop ${0.8 + Math.random() * 0.6}s ${Math.random() * 0.3}s ease-out forwards`,
                opacity: 0.8,
              }} />
            ))}

            {/* Dot progress */}
            <div style={{ display: "flex", gap: 5, justifyContent: "center" }}>
              {quizList.map((_, i) => (
                <div key={i} style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: i < quizIndex
                    ? (i < score ? "#48c774" : "rgba(255,89,89,0.6)")
                    : i === quizIndex ? "rgba(201,168,76,0.6)" : "rgba(255,255,255,0.08)",
                  transition: "all 0.3s ease",
                }} />
              ))}
            </div>

            {/* Flag */}
            <div style={{
              width: "100%", maxWidth: 280, aspectRatio: "3/2", borderRadius: 14, overflow: "hidden",
              background: "#1a2f4a", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
            }}>
              <span style={{ fontSize: 110, lineHeight: 1 }}>{flagEmoji(quizCountry.code)}</span>
            </div>

            {/* Feedback */}
            <div style={{ minHeight: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              {answered ? (
                <div style={{
                  fontSize: 18, fontWeight: 700, textAlign: "center",
                  color: answered.code === quizCountry.code ? "#48c774" : "#ff7f7f",
                  animation: "scaleIn 0.25s ease",
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  {answered.code === quizCountry.code ? "✓ " : "✗ "}
                  {quizCountry.pl}
                  <button className="btn" onClick={() => speak(quizCountry.pl)} style={{
                    background: "rgba(90,160,255,0.15)", border: "none",
                    borderRadius: "50%", width: 30, height: 30,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14,
                  }}>🔊</button>
                </div>
              ) : (
                <>
                  {voiceFeedback && (
                    <div style={{ fontSize: 12, color: "#ff7f7f", fontFamily: dmSans, animation: "scaleIn 0.2s ease" }}>
                      {voiceFeedback}
                    </div>
                  )}
                  {speech.isListening && speech.transcript && (
                    <div style={{ fontSize: 14, color: "#e8c96e", fontFamily: dmSans, fontStyle: "italic" }}>
                      „{speech.transcript}"
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Mic button */}
            {!answered && speech.supported && (
              <button className="btn" onClick={() => speech.isListening ? speech.stop() : speech.start()} style={{
                width: 56, height: 56, borderRadius: "50%",
                background: speech.isListening ? "rgba(255,80,80,0.2)" : "rgba(201,168,76,0.1)",
                border: `2px solid ${speech.isListening ? "rgba(255,80,80,0.6)" : "rgba(201,168,76,0.3)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                animation: speech.isListening ? "micPulse 1.5s ease infinite" : "none",
                fontSize: 24,
              }}>
                {speech.isListening ? "🔴" : "🎤"}
              </button>
            )}

            {/* Options — each with a speaker button */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%" }}>
              {options.map((opt, i) => {
                let bg = "rgba(255,255,255,0.035)";
                let border = "rgba(255,255,255,0.1)";
                let color = "#d4c8b0";
                if (answered) {
                  if (opt.code === quizCountry.code) {
                    bg = "rgba(72,199,116,0.14)"; border = "#48c774"; color = "#48c774";
                  } else if (opt.code === answered.code) {
                    bg = "rgba(255,89,89,0.1)"; border = "rgba(255,89,89,0.5)"; color = "#ff7f7f";
                  } else {
                    bg = "rgba(255,255,255,0.02)"; border = "rgba(255,255,255,0.05)"; color = "rgba(255,255,255,0.25)";
                  }
                }
                return (
                  <button key={opt.code} className="btn"
                    onClick={() => pickAnswer(opt)} disabled={!!answered}
                    style={{
                      background: bg, border: `1.5px solid ${border}`,
                      borderRadius: 12, padding: "14px 8px", color,
                      fontFamily: dmSans, fontSize: 14, fontWeight: 700,
                      cursor: answered ? "default" : "pointer",
                      textAlign: "center",
                      animation: `fadeSlideUp 0.3s ${0.05 * i}s ease both`,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    }}>
                    {opt.pl}
                    {!answered && (
                      <span onClick={(e) => { e.stopPropagation(); speak(opt.pl); }}
                        style={{ fontSize: 13, opacity: 0.5, cursor: "pointer" }}>🔊</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Next */}
            {answered && (
              <button className="btn" onClick={quizNext} style={{
                background: `linear-gradient(135deg, ${gold}, ${goldLight})`,
                border: "none", borderRadius: 12, padding: "14px 40px",
                color: "#0d1b2a", fontFamily: dmSans, fontSize: 14, fontWeight: 700,
                letterSpacing: 1, boxShadow: "0 6px 24px rgba(201,168,76,0.3)",
                animation: "fadeSlideUp 0.3s ease",
              }}>
                {quizIndex + 1 < QUIZ_LENGTH ? "Następne →" : "Wyniki →"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* ==================== QUIZ RESULTS ==================== */}
      {mode === "quiz" && quizDone && (() => {
        const medal = getMedal(quizPct);
        return (
          <div style={{
            width: "100%", maxWidth: 420,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 24,
            animation: "fadeSlideUp 0.6s ease",
          }}>
            <div style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 24, padding: "48px 32px 36px", width: "100%", textAlign: "center",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
              boxShadow: "0 24px 64px rgba(0,0,0,0.3)", position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)",
                width: 200, height: 200, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />
              <div style={{ fontSize: 72, animation: "float 3s ease-in-out infinite", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}>
                {medal.icon}
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#f0e6d0" }}>{medal.label}</div>
              <div style={{
                fontSize: 52, fontWeight: 700, color: gold, lineHeight: 1,
                backgroundImage: `linear-gradient(90deg, ${gold}, ${goldLight}, ${gold})`,
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                animation: "shimmer 3s linear infinite",
              }}>{score}/{QUIZ_LENGTH}</div>
              <div style={{ color: "#6a7b90", fontSize: 14, fontFamily: dmSans }}>
                {quizPct}% poprawnych
              </div>
              {bestStreak >= 2 && (
                <div style={{ color: "#e8c96e", fontSize: 13, fontFamily: dmSans }}>
                  🔥 Najlepsza seria: {bestStreak}
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: 12, width: "100%" }}>
              <button className="btn" onClick={() => setMode("menu")} style={{
                flex: 1, background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "16px",
                color: "#8a9aaa", fontFamily: dmSans, fontSize: 14, fontWeight: 700,
              }}>
                Menu
              </button>
              <button className="btn" onClick={startQuiz} style={{
                flex: 1, background: `linear-gradient(135deg, ${gold}, ${goldLight})`,
                border: "none", borderRadius: 14, padding: "16px",
                color: "#0d1b2a", fontFamily: dmSans, fontSize: 14, fontWeight: 700,
                boxShadow: "0 6px 24px rgba(201,168,76,0.3)",
              }}>
                Jeszcze raz!
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

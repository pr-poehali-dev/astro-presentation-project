import { useState, useEffect, useCallback } from "react";

// ---------------------------------------------------------------------------
// Data-shape interfaces
// ---------------------------------------------------------------------------

interface PointItem {
  emoji: string;
  text: string;
}

interface PlanetItem {
  symbol: string;
  name: string;
  meaning: string;
}

interface SignItem {
  symbol: string;
  name: string;
  key: string;
}

interface HouseItem {
  num: string;
  name: string;
  desc: string;
}

interface TrinityItem {
  symbol: string;
  name: string;
  label: string;
  desc: string;
  color: string;
}

interface HowToStep {
  num: string;
  title: string;
  desc: string;
}

// ---------------------------------------------------------------------------
// Slide-type interfaces (discriminated union)
// ---------------------------------------------------------------------------

interface SlideTitleData {
  id: number;
  type: "title";
  title: string;
  subtitle: string;
  label: string;
}

interface SlideIntroData {
  id: number;
  type: "intro";
  title: string;
  icon: string;
  points: PointItem[];
}

interface SlidePlanetsData {
  id: number;
  type: "planets";
  title: string;
  icon: string;
  subtitle: string;
  planets: PlanetItem[];
}

interface SlideSignsData {
  id: number;
  type: "signs";
  title: string;
  icon: string;
  subtitle: string;
  signs: SignItem[];
}

interface SlideHousesData {
  id: number;
  type: "houses";
  title: string;
  icon: string;
  subtitle: string;
  houses: HouseItem[];
}

interface SlideTrinityData {
  id: number;
  type: "trinity";
  title: string;
  icon: string;
  subtitle: string;
  trinity: TrinityItem[];
}

interface SlideHowToData {
  id: number;
  type: "howto";
  title: string;
  icon: string;
  steps: HowToStep[];
}

interface SlidePracticeData {
  id: number;
  type: "practice";
  title: string;
  icon: string;
  subtitle: string;
  note: string;
  steps: string[];
  tip: string;
}

interface SlideFinaleData {
  id: number;
  type: "finale";
  title: string;
  subtitle: string;
  quote: string;
  author: string;
  cta: string;
}

type SlideData =
  | SlideTitleData
  | SlideIntroData
  | SlidePlanetsData
  | SlideSignsData
  | SlideHousesData
  | SlideTrinityData
  | SlideHowToData
  | SlidePracticeData
  | SlideFinaleData;

// ---------------------------------------------------------------------------

const CHART_IMAGE = "https://cdn.poehali.dev/projects/393f8f81-3591-4b14-8e53-653d165570c7/files/51470be6-088c-479e-8b30-ca22f972462d.jpg";

const ZODIAC_SIGNS = ["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];

const slides = [
  {
    id: 0,
    type: "title",
    title: "Натальная астрология",
    subtitle: "Карта звёздного неба в момент вашего рождения",
    label: "Пятничный астроликбез ✨",
  },
  {
    id: 1,
    type: "intro",
    title: "Что такое натальная карта?",
    icon: "🌌",
    points: [
      { emoji: "🗺️", text: "Снимок неба в момент рождения — положения планет, Солнца, Луны" },
      { emoji: "🎭", text: "Не предсказание судьбы, а карта личности: таланты, склонности, паттерны" },
      { emoji: "🔭", text: "Астрология — язык символов и архетипов, не религия и не наука" },
      { emoji: "💡", text: "Главный смысл: лучше понять себя и других" },
    ],
  },
  {
    id: 2,
    type: "planets",
    title: "Планеты — действующие лица",
    icon: "🪐",
    subtitle: "Каждая планета отвечает за свою сферу жизни",
    planets: [
      { symbol: "☀️", name: "Солнце", meaning: "Ego, воля, жизненная сила, то, кем мы стремимся стать" },
      { symbol: "🌙", name: "Луна", meaning: "Эмоции, привычки, подсознание, потребности в безопасности" },
      { symbol: "☿", name: "Меркурий", meaning: "Мышление, речь, коммуникации, обучение" },
      { symbol: "♀", name: "Венера", meaning: "Любовь, красота, ценности, удовольствие" },
      { symbol: "♂", name: "Марс", meaning: "Энергия, желание, действие, сексуальность" },
      { symbol: "♃", name: "Юпитер", meaning: "Удача, рост, философия, расширение" },
      { symbol: "♄", name: "Сатурн", meaning: "Ограничения, структура, уроки, кармические задачи" },
    ],
  },
  {
    id: 3,
    type: "signs",
    title: "Знаки зодиака — стиль и характер",
    icon: "⭐",
    subtitle: "Знак = КАК планета выражает свою энергию",
    signs: [
      { symbol: "♈", name: "Овен", key: "Напор, пионерство" },
      { symbol: "♉", name: "Телец", key: "Стабильность, чувственность" },
      { symbol: "♊", name: "Близнецы", key: "Общение, любопытство" },
      { symbol: "♋", name: "Рак", key: "Забота, интуиция" },
      { symbol: "♌", name: "Лев", key: "Творчество, лидерство" },
      { symbol: "♍", name: "Дева", key: "Анализ, практичность" },
      { symbol: "♎", name: "Весы", key: "Гармония, партнёрство" },
      { symbol: "♏", name: "Скорпион", key: "Глубина, трансформация" },
      { symbol: "♐", name: "Стрелец", key: "Свобода, философия" },
      { symbol: "♑", name: "Козерог", key: "Амбиции, дисциплина" },
      { symbol: "♒", name: "Водолей", key: "Новаторство, независимость" },
      { symbol: "♓", name: "Рыбы", key: "Мечты, сострадание" },
    ],
  },
  {
    id: 4,
    type: "houses",
    title: "Дома — сферы жизни",
    icon: "🏛️",
    subtitle: "12 домов = 12 областей опыта",
    houses: [
      { num: "I", name: "Личность", desc: "Внешность, характер, как вас видят" },
      { num: "II", name: "Ресурсы", desc: "Деньги, ценности, самооценка" },
      { num: "III", name: "Коммуникации", desc: "Речь, ближнее окружение, обучение" },
      { num: "IV", name: "Дом и корни", desc: "Семья, детство, основа личности" },
      { num: "V", name: "Творчество", desc: "Хобби, романы, дети, удовольствие" },
      { num: "VI", name: "Здоровье", desc: "Работа, режим, повседневные ритуалы" },
      { num: "VII", name: "Партнёрства", desc: "Брак, деловые союзы, открытые враги" },
      { num: "VIII", name: "Трансформация", desc: "Смерть, секс, чужие ресурсы, тайны" },
      { num: "IX", name: "Философия", desc: "Путешествия, высшее образование, вера" },
      { num: "X", name: "Карьера", desc: "Статус, репутация, призвание" },
      { num: "XI", name: "Общество", desc: "Друзья, группы, мечты о будущем" },
      { num: "XII", name: "Тайное", desc: "Изоляция, карма, скрытые враги, духовность" },
    ],
  },
  {
    id: 5,
    type: "trinity",
    title: "Большая тройка",
    icon: "🔺",
    subtitle: "Три главных элемента карты",
    trinity: [
      {
        symbol: "☀️",
        name: "Знак Солнца",
        label: "Кто я?",
        desc: "Ваша суть, эго, то, к чему вы стремитесь. Тот «я», которым хотите быть.",
        color: "#F59E0B",
      },
      {
        symbol: "🌙",
        name: "Знак Луны",
        label: "Что мне нужно?",
        desc: "Ваши глубинные потребности, эмоциональные реакции, внутренний мир.",
        color: "#818CF8",
      },
      {
        symbol: "⬆️",
        name: "Асцендент",
        label: "Каким меня видят?",
        desc: "Маска, первое впечатление. Как вас воспринимают незнакомые люди.",
        color: "#34D399",
      },
    ],
  },
  {
    id: 6,
    type: "howto",
    title: "Как читать карту",
    icon: "📖",
    steps: [
      { num: "01", title: "Найти Большую тройку", desc: "Солнце, Луна, Асцендент — базовый портрет личности" },
      { num: "02", title: "Посмотреть на стихии", desc: "Огонь / Земля / Воздух / Вода — какие преобладают?" },
      { num: "03", title: "Изучить планеты в домах", desc: "Где сконцентрирована ваша энергия и внимание?" },
      { num: "04", title: "Найти аспекты", desc: "Гармоничные (трин, секстиль) и напряжённые (квадрат, оппозиция)" },
      { num: "05", title: "Синтез", desc: "Карта — это система, а не набор изолированных факторов" },
    ],
  },
  {
    id: 7,
    type: "practice",
    title: "Разбираем карту участника",
    icon: "🔮",
    subtitle: "Время практики",
    note: "Для разбора нужны: дата рождения, время рождения (как можно точнее), город рождения",
    steps: [
      "Построить карту на astro.com или similar сервисе",
      "Найти Солнце → Луну → Асцендент",
      "Определить преобладающую стихию",
      "Посмотреть, какие дома наполнены планетами",
      "Обсудить, что откликается",
    ],
    tip: "Главный вопрос не «верно ли это», а «что это пробуждает?» 🌟",
  },
  {
    id: 8,
    type: "finale",
    title: "Звёзды не управляют — они указывают",
    subtitle: "Астрология — это инструмент самопознания, а не приговор",
    quote: "«Звёзды склоняют, но не обязывают»",
    author: "— Средневековый астрологический принцип",
    cta: "Хорошего вам уикенда! 🌙✨",
  },
];

function StarField() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: `${(i * 37 + 13) % 100}%`,
    top: `${(i * 53 + 7) % 100}%`,
    size: `${((i * 11) % 20 + 5) / 10}px`,
    opacity: ((i * 7) % 7 + 1) / 10,
    duration: `${((i * 3) % 30 + 20) / 10}s`,
    delay: `${((i * 7) % 40) / 10}s`,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animation: `twinkle ${star.duration} ease-in-out infinite`,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  );
}

function ZodiacRing() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <div
        className="absolute rounded-full border border-amber-500/10"
        style={{ width: "600px", height: "600px", animation: "spin-slow 60s linear infinite" }}
      >
        {ZODIAC_SIGNS.map((sign, i) => {
          const angle = (i / 12) * 360;
          const rad = (angle - 90) * (Math.PI / 180);
          const x = 300 + 270 * Math.cos(rad);
          const y = 300 + 270 * Math.sin(rad);
          return (
            <span
              key={i}
              className="absolute text-amber-400/20 text-lg font-light"
              style={{ left: x - 10, top: y - 10 }}
            >
              {sign}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function SlideTitle({ slide }: { slide: SlideTitleData }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8 relative">
      <ZodiacRing />
      <div className="relative z-10 space-y-6 slide-content-anim">
        <p className="text-amber-400/70 tracking-[0.4em] text-sm font-raleway uppercase">{slide.label}</p>
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
        <img
          src={CHART_IMAGE}
          alt="natal chart"
          className="w-48 h-48 rounded-full object-cover mx-auto border-2 border-amber-400/30 shadow-2xl opacity-90"
          style={{ boxShadow: "0 0 60px rgba(109,40,217,0.4)" }}
        />
        <h1 className="font-cormorant text-6xl md:text-8xl text-amber-100 font-light tracking-wider leading-tight">
          {slide.title}
        </h1>
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mx-auto" />
        <p className="font-raleway text-purple-200/70 text-lg font-light tracking-wide max-w-xl">{slide.subtitle}</p>
      </div>
    </div>
  );
}

function SlideIntro({ slide }: { slide: SlideIntroData }) {
  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-16 max-w-4xl mx-auto">
      <div className="space-y-8 slide-content-anim">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{slide.icon}</span>
          <h2 className="font-cormorant text-4xl md:text-5xl text-amber-100 font-light tracking-wide">{slide.title}</h2>
        </div>
        <div className="w-full h-px bg-gradient-to-r from-amber-400/40 to-transparent" />
        <div className="space-y-4">
          {slide.points.map((p: PointItem, i: number) => (
            <div
              key={i}
              className="flex items-start gap-4 p-4 rounded-lg border border-purple-500/20 bg-purple-950/30 backdrop-blur-sm"
            >
              <span className="text-2xl flex-shrink-0">{p.emoji}</span>
              <p className="font-raleway text-purple-100/80 text-lg leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlidePlanets({ slide }: { slide: SlidePlanetsData }) {
  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-16 max-w-5xl mx-auto">
      <div className="space-y-6 slide-content-anim">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{slide.icon}</span>
          <div>
            <h2 className="font-cormorant text-4xl md:text-5xl text-amber-100 font-light tracking-wide">{slide.title}</h2>
            <p className="font-raleway text-purple-300/60 text-sm mt-1">{slide.subtitle}</p>
          </div>
        </div>
        <div className="w-full h-px bg-gradient-to-r from-amber-400/40 to-transparent" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {slide.planets.map((p: PlanetItem, i: number) => (
            <div
              key={i}
              className="flex items-center gap-4 p-3 rounded-lg border border-purple-500/20 bg-purple-950/30 backdrop-blur-sm hover:border-amber-400/30 transition-colors"
            >
              <span className="text-2xl w-10 text-center font-cormorant text-amber-300">{p.symbol}</span>
              <div>
                <span className="font-cormorant text-amber-200 text-lg font-medium">{p.name}</span>
                <p className="font-raleway text-purple-200/60 text-sm">{p.meaning}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideSigns({ slide }: { slide: SlideSignsData }) {
  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-16 max-w-5xl mx-auto">
      <div className="space-y-6 slide-content-anim">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{slide.icon}</span>
          <div>
            <h2 className="font-cormorant text-4xl md:text-5xl text-amber-100 font-light tracking-wide">{slide.title}</h2>
            <p className="font-raleway text-purple-300/60 text-sm mt-1">{slide.subtitle}</p>
          </div>
        </div>
        <div className="w-full h-px bg-gradient-to-r from-amber-400/40 to-transparent" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {slide.signs.map((s: SignItem, i: number) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-lg border border-purple-500/20 bg-purple-950/30 backdrop-blur-sm hover:border-amber-400/40 hover:bg-purple-900/40 transition-all"
            >
              <span className="text-xl font-cormorant text-amber-300">{s.symbol}</span>
              <div>
                <p className="font-cormorant text-amber-100 font-medium leading-tight">{s.name}</p>
                <p className="font-raleway text-purple-300/60 text-xs">{s.key}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideHouses({ slide }: { slide: SlideHousesData }) {
  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-16 max-w-5xl mx-auto">
      <div className="space-y-5 slide-content-anim">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{slide.icon}</span>
          <div>
            <h2 className="font-cormorant text-4xl md:text-5xl text-amber-100 font-light tracking-wide">{slide.title}</h2>
            <p className="font-raleway text-purple-300/60 text-sm mt-1">{slide.subtitle}</p>
          </div>
        </div>
        <div className="w-full h-px bg-gradient-to-r from-amber-400/40 to-transparent" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {slide.houses.map((h: HouseItem, i: number) => (
            <div
              key={i}
              className="p-3 rounded-lg border border-purple-500/20 bg-purple-950/30 backdrop-blur-sm flex gap-3 items-start hover:border-amber-400/30 transition-colors"
            >
              <span className="font-cormorant text-amber-400/80 text-lg font-semibold w-8 flex-shrink-0">{h.num}</span>
              <div>
                <p className="font-cormorant text-amber-100 text-base font-medium leading-tight">{h.name}</p>
                <p className="font-raleway text-purple-300/60 text-xs mt-0.5">{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideTrinity({ slide }: { slide: SlideTrinityData }) {
  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-16 max-w-4xl mx-auto">
      <div className="space-y-8 slide-content-anim">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{slide.icon}</span>
          <div>
            <h2 className="font-cormorant text-4xl md:text-5xl text-amber-100 font-light tracking-wide">{slide.title}</h2>
            <p className="font-raleway text-purple-300/60 text-sm mt-1">{slide.subtitle}</p>
          </div>
        </div>
        <div className="w-full h-px bg-gradient-to-r from-amber-400/40 to-transparent" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {slide.trinity.map((t: TrinityItem, i: number) => (
            <div
              key={i}
              className="relative p-6 rounded-xl bg-purple-950/40 backdrop-blur-sm text-center flex flex-col items-center gap-3"
              style={{ border: `1px solid ${t.color}40` }}
            >
              <div
                className="absolute inset-0 rounded-xl opacity-5"
                style={{ background: `radial-gradient(circle at center, ${t.color}, transparent)` }}
              />
              <span className="text-4xl">{t.symbol}</span>
              <p className="font-cormorant text-xl font-semibold" style={{ color: t.color }}>{t.label}</p>
              <p className="font-cormorant text-amber-100 text-lg">{t.name}</p>
              <p className="font-raleway text-purple-200/60 text-sm leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideHowTo({ slide }: { slide: SlideHowToData }) {
  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-16 max-w-4xl mx-auto">
      <div className="space-y-8 slide-content-anim">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{slide.icon}</span>
          <h2 className="font-cormorant text-4xl md:text-5xl text-amber-100 font-light tracking-wide">{slide.title}</h2>
        </div>
        <div className="w-full h-px bg-gradient-to-r from-amber-400/40 to-transparent" />
        <div className="space-y-4">
          {slide.steps.map((s: HowToStep, i: number) => (
            <div key={i} className="flex items-start gap-5 group">
              <span className="font-cormorant text-3xl text-amber-500/30 font-bold flex-shrink-0 group-hover:text-amber-400/60 transition-colors">{s.num}</span>
              <div className="flex-1 border-b border-purple-500/20 pb-4">
                <p className="font-cormorant text-xl text-amber-100 font-medium">{s.title}</p>
                <p className="font-raleway text-purple-200/60 text-sm mt-1">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlidePractice({ slide }: { slide: SlidePracticeData }) {
  return (
    <div className="flex flex-col justify-center h-full px-8 md:px-16 max-w-4xl mx-auto">
      <div className="space-y-6 slide-content-anim">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{slide.icon}</span>
          <div>
            <h2 className="font-cormorant text-4xl md:text-5xl text-amber-100 font-light tracking-wide">{slide.title}</h2>
            <p className="font-raleway text-purple-300/60 text-sm mt-1">{slide.subtitle}</p>
          </div>
        </div>
        <div className="w-full h-px bg-gradient-to-r from-amber-400/40 to-transparent" />
        <div className="p-4 rounded-lg border border-amber-500/30 bg-amber-950/20 backdrop-blur-sm">
          <p className="font-raleway text-amber-200/80 text-sm">📌 {slide.note}</p>
        </div>
        <div className="space-y-3">
          {slide.steps.map((s: string, i: number) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-purple-500/20 bg-purple-950/30">
              <span className="w-7 h-7 rounded-full border border-amber-400/40 flex items-center justify-center font-cormorant text-amber-300 text-sm font-bold flex-shrink-0">{i + 1}</span>
              <p className="font-raleway text-purple-100/80">{s}</p>
            </div>
          ))}
        </div>
        <p className="font-cormorant text-amber-300/80 text-xl italic text-center">{slide.tip}</p>
      </div>
    </div>
  );
}

function SlideFinale({ slide }: { slide: SlideFinaleData }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8 relative">
      <ZodiacRing />
      <div className="relative z-10 space-y-8 max-w-2xl slide-content-anim">
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
        <h2 className="font-cormorant text-4xl md:text-6xl text-amber-100 font-light tracking-wide leading-tight">
          {slide.title}
        </h2>
        <p className="font-raleway text-purple-200/70 text-lg font-light">{slide.subtitle}</p>
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mx-auto" />
        <div className="space-y-2">
          <p className="font-cormorant text-2xl text-amber-300/90 italic">{slide.quote}</p>
          <p className="font-raleway text-purple-400/60 text-sm">{slide.author}</p>
        </div>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mx-auto" />
        <p className="font-cormorant text-3xl text-amber-200">{slide.cta}</p>
      </div>
    </div>
  );
}

function renderSlide(slide: (typeof slides)[number]) {
  switch (slide.type) {
    case "title": return <SlideTitle slide={slide} />;
    case "intro": return <SlideIntro slide={slide} />;
    case "planets": return <SlidePlanets slide={slide} />;
    case "signs": return <SlideSigns slide={slide} />;
    case "houses": return <SlideHouses slide={slide} />;
    case "trinity": return <SlideTrinity slide={slide} />;
    case "howto": return <SlideHowTo slide={slide} />;
    case "practice": return <SlidePractice slide={slide} />;
    case "finale": return <SlideFinale slide={slide} />;
    default: return null;
  }
}

const slideLabels = [
  "Заглавный", "Что это?", "Планеты", "Знаки", "Дома", "Тройка", "Как читать", "Практика", "Финал"
];

const Index = () => {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const goTo = useCallback((idx: number, dir: "next" | "prev" = "next") => {
    if (idx === current) return;
    setDirection(dir);
    setAnimKey((k) => k + 1);
    setCurrent(idx);
  }, [current]);

  const next = useCallback(() => {
    if (current < slides.length - 1) goTo(current + 1, "next");
  }, [current, goTo]);

  const prev = useCallback(() => {
    if (current > 0) goTo(current - 1, "prev");
  }, [current, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  return (
    <>
      <style>{`
        .font-cormorant { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-raleway { font-family: 'Raleway', sans-serif; }
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.3); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes enter-from-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes enter-from-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .slide-enter-next { animation: enter-from-right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
        .slide-enter-prev { animation: enter-from-left 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
        @keyframes content-fade {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .slide-content-anim { animation: content-fade 0.5s ease-out 0.1s both; }
        ::-webkit-scrollbar { display: none; }
        * { scrollbar-width: none; }
      `}</style>

      <div
        className="relative w-screen h-screen overflow-hidden flex flex-col"
        style={{
          background: "radial-gradient(ellipse at 20% 20%, #1a0a3a 0%, #0d0620 40%, #080014 100%)",
        }}
      >
        <StarField />

        <div className="fixed top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
        <div className="fixed bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-5 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #b45309, transparent)" }} />

        {/* Header */}
        <div className="relative z-20 flex items-center justify-between px-6 py-3 border-b border-purple-500/10">
          <div className="flex items-center gap-2">
            <span className="text-amber-400/60 text-lg">✦</span>
            <span className="font-cormorant text-amber-200/50 text-sm tracking-widest uppercase">Натальная астрология</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? "next" : "prev")}
                className="px-2 py-1 rounded text-xs transition-all"
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  color: i === current ? "#F59E0B" : "rgba(167,139,250,0.4)",
                  background: i === current ? "rgba(245,158,11,0.1)" : "transparent",
                  border: i === current ? "1px solid rgba(245,158,11,0.3)" : "1px solid transparent",
                }}
                title={slideLabels[i]}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <span className="font-raleway text-purple-400/40 text-xs tracking-wider">
            {current + 1} / {slides.length}
          </span>
        </div>

        {/* Slide */}
        <div className="relative z-10 flex-1 overflow-hidden">
          <div
            key={animKey}
            className={direction === "next" ? "slide-enter-next" : "slide-enter-prev"}
            style={{ height: "100%" }}
          >
            {renderSlide(slides[current])}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-20 flex items-center justify-between px-6 py-4 border-t border-purple-500/10">
          <button
            onClick={prev}
            disabled={current === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-purple-500/20 transition-all disabled:opacity-20 hover:border-amber-400/40 hover:bg-amber-400/5"
            style={{ fontFamily: "'Raleway', sans-serif", color: "rgba(196,181,253,0.8)", fontSize: "14px" }}
          >
            ← Назад
          </button>

          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? "next" : "prev")}
                className="rounded-full transition-all"
                style={{
                  width: i === current ? "24px" : "6px",
                  height: "6px",
                  background: i === current ? "#F59E0B" : "rgba(167,139,250,0.3)",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={current === slides.length - 1}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-500/30 transition-all disabled:opacity-20 hover:border-amber-400/60 hover:bg-amber-400/10"
            style={{ fontFamily: "'Raleway', sans-serif", color: "#F59E0B", fontSize: "14px" }}
          >
            Далее →
          </button>
        </div>

        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-10 opacity-20 pointer-events-none">
          <p className="font-raleway text-purple-300 text-xs tracking-widest">← → клавиши или пробел</p>
        </div>
      </div>
    </>
  );
};

export default Index;
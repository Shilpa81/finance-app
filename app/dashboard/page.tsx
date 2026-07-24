// 'use client';

// import { useState } from 'react';

// /* ─────────────────────────────────────────
//    Types
// ───────────────────────────────────────── */
// type Answer = {
//   id: string;
//   label: string;
//   icon: string;
//   desc?: string;
// };

// type Step = {
//   id: string;
//   question: string;
//   subtitle?: string;
//   answers: Answer[];
// };

// type ProductResult = {
//   id: string;
//   icon: string;
//   color: string;
//   bg: string;
//   name: string;
//   tagline: string;
//   desc: string;
//   tag: string;
// };

// /* ─────────────────────────────────────────
//    Steps data
// ───────────────────────────────────────── */
// const steps: Step[] = [
//   {
//     id: 'goal',
//     question: "What's your primary financial goal?",
//     subtitle: 'Choose the option that best describes what you want to achieve.',
//     answers: [
//       { id: 'protect',  icon: '🛡️', label: 'Protect my family',      desc: 'Ensure your loved ones are financially secure' },
//       { id: 'grow',     icon: '📈', label: 'Grow my wealth',          desc: 'Build long-term savings and investments' },
//       { id: 'estate',   icon: '📜', label: 'Plan my estate',          desc: 'Secure your assets and legacy' },
//       { id: 'health',   icon: '❤️', label: 'Cover healthcare costs',  desc: 'Protect against medical and care expenses' },
//       { id: 'career',   icon: '🌟', label: 'Start a financial career', desc: 'Join the NAIN partnership program' },
//     ],
//   },
//   {
//     id: 'who',
//     question: 'Who are you planning for?',
//     subtitle: 'This helps us find the most relevant product for your situation.',
//     answers: [
//       { id: 'self',       icon: '🙋', label: 'Just myself' },
//       { id: 'family',     icon: '👨‍👩‍👧', label: 'My family' },
//       { id: 'special',    icon: '🤝', label: 'A loved one with special needs' },
//       { id: 'business',   icon: '🏢', label: 'My business' },
//     ],
//   },
//   {
//     id: 'age',
//     question: "What's your age range?",
//     subtitle: 'Different life stages call for different financial strategies.',
//     answers: [
//       { id: '18',  icon: '🎓', label: '18 – 35', desc: 'Building a foundation' },
//       { id: '36',  icon: '💼', label: '36 – 50', desc: 'Growing your wealth' },
//       { id: '51',  icon: '🏠', label: '51 – 65', desc: 'Pre-retirement planning' },
//       { id: '65',  icon: '🌴', label: '65+',     desc: 'Retirement & beyond' },
//     ],
//   },
//   {
//     id: 'risk',
//     question: 'How comfortable are you with financial risk?',
//     subtitle: 'Be honest — there are no wrong answers.',
//     answers: [
//       { id: 'low',      icon: '🔒', label: 'Conservative',    desc: 'I prefer safety over high returns' },
//       { id: 'moderate', icon: '⚖️', label: 'Moderate',        desc: 'A balance of safety and growth' },
//       { id: 'high',     icon: '🚀', label: 'Growth-focused',  desc: 'I can handle market ups and downs' },
//     ],
//   },
//   {
//     id: 'timeline',
//     question: 'When do you need this plan in place?',
//     subtitle: 'We\'ll prioritize solutions that fit your timeline.',
//     answers: [
//       { id: 'now',    icon: '⚡', label: 'Right away',       desc: 'I need coverage immediately' },
//       { id: '6mo',    icon: '📅', label: 'Within 6 months',  desc: 'I\'m researching my options' },
//       { id: '1yr',    icon: '🗓️', label: 'Within a year',    desc: 'Planning for the future' },
//       { id: 'unsure', icon: '🤔', label: 'Not sure yet',     desc: 'I\'m just exploring' },
//     ],
//   },
// ];

// /* ─────────────────────────────────────────
//    Product mapping logic
// ───────────────────────────────────────── */
// const products: Record<string, ProductResult> = {
//   will: {
//     id: 'will', icon: '📜', color: '#378ADD', bg: 'rgba(55,138,221,0.12)',
//     tag: 'Estate Planning', name: 'Will & Trust Draft',
//     tagline: 'Secure your assets and final wishes',
//     desc: 'Our Premium Probate Avoidance Package drafts your Will, Trust, Power of Attorney, Healthcare Directive, and three other critical documents to fully protect your estate and legacy.',
//   },
//   snt: {
//     id: 'snt', icon: '🤝', color: '#639922', bg: 'rgba(99,153,34,0.12)',
//     tag: 'Special Needs', name: 'Special Needs Trust',
//     tagline: 'Protect a loved one\'s financial future',
//     desc: 'A special needs trust lets family members contribute funds for a disabled loved one while preserving their Medicaid and SSI eligibility — covering expenses government benefits do not.',
//   },
//   term: {
//     id: 'term', icon: '🛡️', color: '#BA7517', bg: 'rgba(186,117,23,0.12)',
//     tag: 'Life Insurance', name: 'Term Life Insurance',
//     tagline: 'Affordable protection for your family',
//     desc: 'A straightforward term life policy ensures your family receives a tax-free benefit if the unexpected happens. Choose your term and coverage amount to match your life stage and budget.',
//   },
//   iul: {
//     id: 'iul', icon: '📈', color: '#378ADD', bg: 'rgba(55,138,221,0.12)',
//     tag: 'Life Insurance', name: 'Index Universal Life',
//     tagline: 'Coverage that grows with the market',
//     desc: 'IUL combines lifelong protection with cash value growth tied to a market index — with a guaranteed floor so you never lose principal. Access your cash value anytime.',
//   },
//   fia: {
//     id: 'fia', icon: '📊', color: '#1D9E75', bg: 'rgba(29,158,117,0.12)',
//     tag: 'Annuity', name: 'Fixed Index Annuities',
//     tagline: 'Guaranteed principal with growth potential',
//     desc: 'A fixed indexed annuity guarantees your principal and provides index-linked growth — with the potential for lifelong income withdrawals to fund your retirement years.',
//   },
//   ltc: {
//     id: 'ltc', icon: '🏥', color: '#BA7517', bg: 'rgba(186,117,23,0.12)',
//     tag: 'Care Coverage', name: 'Long Term Care',
//     tagline: 'Coverage for extended healthcare needs',
//     desc: 'Long-term care insurance covers nursing home, home health aide, and assisted living costs — protecting your savings so care costs never become a burden on your family.',
//   },
//   aca: {
//     id: 'aca', icon: '⚕️', color: '#1D9E75', bg: 'rgba(29,158,117,0.12)',
//     tag: 'Health Insurance', name: 'Health Insurance (ACA)',
//     tagline: 'Comprehensive ACA coverage plans',
//     desc: 'ACA plans provide essential coverage including preventive care, prescriptions, and emergency services — often with income-based subsidies to keep your premium affordable.',
//   },
//   med: {
//     id: 'med', icon: '💊', color: '#378ADD', bg: 'rgba(55,138,221,0.12)',
//     tag: 'Medicare', name: 'Medicare Advantage',
//     tagline: 'Part C + D all-in-one plans',
//     desc: 'Medicare Advantage combines hospital, medical, and prescription drug coverage in one plan — often adding dental, vision, and hearing benefits beyond Original Medicare.',
//   },
//   partner: {
//     id: 'partner', icon: '🌟', color: '#7F77DD', bg: 'rgba(127,119,221,0.12)',
//     tag: 'Career', name: 'Partnership Program',
//     tagline: 'Build your financial services career',
//     desc: 'Join our distribution network, earn certifications, and build a business helping American families achieve financial security — with mentorship and uncapped earning potential.',
//   },
// };

// function getRecommendation(answers: Record<string, string>): ProductResult[] {
//   const { goal, who, age, risk } = answers;

//   if (goal === 'career') return [products.partner];
//   if (who === 'special') return [products.snt, products.term];
//   if (goal === 'estate') return [products.will, products.iul];
//   if (goal === 'health') {
//     if (age === '65') return [products.med, products.ltc];
//     return [products.aca, products.ltc];
//   }
//   if (goal === 'protect') {
//     if (risk === 'low') return [products.term, products.fia];
//     if (risk === 'high') return [products.iul, products.term];
//     return [products.term, products.iul];
//   }
//   if (goal === 'grow') {
//     if (risk === 'low') return [products.fia, products.iul];
//     if (risk === 'high') return [products.iul, products.fia];
//     return [products.iul, products.fia];
//   }
//   return [products.term, products.iul];
// }

// /* ─────────────────────────────────────────
//    Component
// ───────────────────────────────────────── */
// export default function Dashboard() {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [answers, setAnswers] = useState<Record<string, string>>({});
//   const [selected, setSelected] = useState<string | null>(null);
//   const [direction, setDirection] = useState<'forward' | 'back'>('forward');
//   const [animating, setAnimating] = useState(false);
//   const [done, setDone] = useState(false);

//   const step = steps[currentStep];
//   const progress = ((currentStep) / steps.length) * 100;
//   const results = done ? getRecommendation(answers) : [];

//   const choose = (answerId: string) => {
//     if (animating) return;
//     setSelected(answerId);

//     setTimeout(() => {
//       const newAnswers = { ...answers, [step.id]: answerId };
//       setAnswers(newAnswers);
//       setDirection('forward');
//       setAnimating(true);

//       setTimeout(() => {
//         if (currentStep < steps.length - 1) {
//           setCurrentStep(s => s + 1);
//           setSelected(null);
//         } else {
//           setDone(true);
//         }
//         setAnimating(false);
//       }, 300);
//     }, 180);
//   };

//   const goBack = () => {
//     if (animating || currentStep === 0) return;
//     setDirection('back');
//     setAnimating(true);
//     setTimeout(() => {
//       setCurrentStep(s => s - 1);
//       setSelected(null);
//       setDone(false);
//       setAnimating(false);
//     }, 300);
//   };

//   const restart = () => {
//     setCurrentStep(0);
//     setAnswers({});
//     setSelected(null);
//     setDone(false);
//   };

//   return (
//     <>
//       <div className="q-wrap">
//         <div className="q-shell">

//           {/* ── Header ── */}
//           <div className="q-header">
//             <div className="q-brand">
//               <div className="q-brand-dot">🏦</div>
//               NAIN Financials
//             </div>
//             {!done && (
//               <span className="q-step-count">
//                 {currentStep + 1} of {steps.length}
//               </span>
//             )}
//           </div>

//           {/* ── Progress ── */}
//           {!done && (
//             <div className="q-progress-bg">
//               <div className="q-progress-fill" style={{ width: `${progress}%` }} />
//             </div>
//           )}

//           {/* ── Question card ── */}
//           {!done && (
//             <div
//               className={`q-card ${
//                 animating
//                   ? direction === 'forward'
//                     ? 'slide-out-forward'
//                     : 'slide-out-back'
//                   : ''
//               }`}
//             >
//               <h2 className="q-question">{step.question}</h2>
//               {step.subtitle && <p className="q-subtitle">{step.subtitle}</p>}

//               <div className="q-answers">
//                 {step.answers.map(a => (
//                   <button
//                     key={a.id}
//                     className={`q-answer ${selected === a.id ? 'picked' : ''}`}
//                     onClick={() => choose(a.id)}
//                   >
//                     <span className="q-answer-icon">{a.icon}</span>
//                     <span className="q-answer-label">{a.label}</span>
//                     {a.desc && <span className="q-answer-desc">{a.desc}</span>}
//                   </button>
//                 ))}
//               </div>

//               <div className="q-footer">
//                 <button
//                   className="q-back"
//                   onClick={goBack}
//                   disabled={currentStep === 0}
//                 >
//                   ← Back
//                 </button>

//                 <div className="q-dots">
//                   {steps.map((_, i) => (
//                     <div
//                       key={i}
//                       className={`q-dot ${
//                         i < currentStep
//                           ? 'done-dot'
//                           : i === currentStep
//                           ? 'active-dot'
//                           : ''
//                       }`}
//                     />
//                   ))}
//                 </div>

//                 <div style={{ width: 40 }} />
//               </div>
//             </div>
//           )}

//           {/* ── Result screen ── */}
//           {done && (
//             <div className="r-wrap">
//               <div className="r-header">
//                 <div className="r-check">✅</div>
//                 <h2 className="r-title">Your personalized matches</h2>
//                 <p className="r-sub">Based on your answers, here are the best NAIN products for you.</p>
//               </div>

//               {/* Answer summary chips */}
//               <div className="r-answers-row">
//                 {Object.entries(answers).map(([stepId, answerId]) => {
//                   const s = steps.find(s => s.id === stepId);
//                   const a = s?.answers.find(a => a.id === answerId);
//                   return a ? (
//                     <span key={stepId} className="r-chip">
//                       {a.icon} {a.label}
//                     </span>
//                   ) : null;
//                 })}
//               </div>

//               <div className="r-cards">
//                 {results.map((p, i) => (
//                   <div className="r-card" key={p.id}>
//                     <div className="r-card-top">
//                       <div className="r-icon" style={{ background: p.bg }}>
//                         {p.icon}
//                       </div>
//                       <div>
//                         <div>
//                           <span className="r-tag" style={{ background: p.bg, color: p.color }}>
//                             {p.tag}
//                           </span>
//                           {i === 0 && <span className="r-best-match">⭐ Best match</span>}
//                         </div>
//                         <div className="r-name">{p.name}</div>
//                         <p className="r-tagline">{p.tagline}</p>
//                       </div>
//                     </div>
//                     <p className="r-desc">{p.desc}</p>
//                     <div className="r-cta-row">
//                       <button
//                         className="r-btn-primary"
//                         style={{ background: p.color }}
//                       >
//                         Get started →
//                       </button>
//                       <button className="r-btn-ghost">Talk to an advisor</button>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="r-restart">
//                 <button className="r-restart-btn" onClick={restart}>
//                   ↺ Start over
//                 </button>
//               </div>
//             </div>
//           )}

//         </div>
//         {/* <div className="hero-background">
//         <div className="hero-shape hero-shape-1"></div>
//         <div className="hero-shape hero-shape-2"></div>
//         <div className="hero-shape hero-shape-3"></div>
//       </div> */}
//       </div>
//     </>
//   );
// }
'use client';

import { useState } from 'react';

/* ══════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════ */
type Answer = { id: string; label: string; desc?: string; };

type Step = {
  id: string;
  question: string;
  subtitle?: string;
  answers: Answer[];
  onlyFor?: string[]; // which goal paths show this step
};

type WhyRow = {
  answer: string;    // plain English summary of what user said
  impact: string;    // which product it points to and why
};

type ProductResult = {
  id: string;
  icon: string;
  color: string;
  bg: string;
  name: string;
  tag: string;
  closestMatch: boolean;
  desc: string;             // honest plain-English explanation
  honestNote?: string;      // any limitation the customer must know
  whyRows: WhyRow[];        // "Why this result?" breakdown
  cta: string;
};

/* ══════════════════════════════════════════════════════
   STEP DEFINITIONS  — branched by goal
══════════════════════════════════════════════════════ */

// Step 1 is always the same
const STEP_GOAL: Step = {
  id: 'goal',
  question: 'What are you looking to do?',
  subtitle: 'Choose the option that best describes your situation. This determines which questions come next.',
  answers: [
    { id: 'retirement', label: 'Save for retirement',          desc: 'Build income and security for life after work' },
    { id: 'education',  label: 'Save for education',           desc: 'College, trade school, or lifelong learning' },
    { id: 'protect',    label: 'Protect my family',            desc: 'Life insurance if something happens to me' },
    { id: 'health',     label: 'Cover healthcare costs',       desc: 'Health insurance, Medicare, or long-term care' },
    { id: 'estate',     label: 'Plan my estate',               desc: 'Wills, trusts, and protecting what I leave behind' },
    { id: 'special',    label: 'Support a loved one with special needs', desc: 'Protect their benefits while adding support' },
    { id: 'career',     label: 'Start a career in finance',    desc: 'Join the NAIN partnership program' },
  ],
};

// Retirement branch
const STEPS_RETIREMENT: Step[] = [
  {
    id: 'ret_who',
    question: 'Who is this retirement plan for?',
    answers: [
      { id: 'self',   label: 'Myself' },
      { id: 'couple', label: 'Me and my spouse / partner' },
      { id: 'biz',    label: 'Myself — I am self-employed or a business owner' },
    ],
  },
  {
    id: 'ret_age',
    question: 'How many years until you plan to retire?',
    answers: [
      { id: 'far',    label: 'More than 20 years',  desc: 'Plenty of time to grow' },
      { id: 'mid',    label: '10 – 20 years',        desc: 'Building momentum' },
      { id: 'close',  label: 'Less than 10 years',   desc: 'Getting close' },
      { id: 'now',    label: 'I am already retired', desc: 'Protecting what I have' },
    ],
  },
  {
    id: 'ret_risk',
    question: 'How do you feel about investment risk?',
    answers: [
      { id: 'low',  label: 'Conservative — I want safety over growth',   desc: 'Protect my principal above all' },
      { id: 'mid',  label: 'Moderate — some growth, some protection',    desc: 'Balanced approach' },
      { id: 'high', label: 'Growth-focused — I can handle market swings', desc: 'Maximize long-term returns' },
    ],
  },
  {
    id: 'ret_income',
    question: 'What matters most to you in retirement?',
    answers: [
      { id: 'income',  label: 'A guaranteed monthly income I cannot outlive' },
      { id: 'growth',  label: 'Growing my money as much as possible' },
      { id: 'legacy',  label: 'Leaving money to my family or heirs' },
      { id: 'care',    label: 'Making sure healthcare costs are covered' },
    ],
  },
];

// Education branch
const STEPS_EDUCATION: Step[] = [
  {
    id: 'edu_who',
    question: 'Who are you saving for?',
    answers: [
      { id: 'child',       label: 'My child',              desc: 'Under 18 years old' },
      { id: 'grandchild',  label: 'My grandchild',         desc: 'Under 18 years old' },
      { id: 'myself',      label: 'Myself',                desc: 'Adult continuing education' },
      { id: 'other',       label: 'Another person I care about' },
    ],
  },
  {
    id: 'edu_age',
    question: 'How old is the student right now?',
    answers: [
      { id: 'under5',  label: 'Under 5 years old',   desc: 'Long runway to grow savings' },
      { id: '6to10',   label: '6 – 10 years old',    desc: 'About 8–12 years to save' },
      { id: '11to15',  label: '11 – 15 years old',   desc: 'About 3–7 years to save' },
      { id: '16plus',  label: '16 or older / Adult', desc: 'Shorter timeframe' },
    ],
  },
  {
    id: 'edu_control',
    question: 'If the money is not used for education, what would you prefer?',
    answers: [
      { id: 'keep_control', label: 'I want to keep control of the funds',       desc: 'I decide how it gets used' },
      { id: 'child_gets',   label: 'The student can use it for anything',        desc: 'Their money when they are adults' },
      { id: 'legacy',       label: 'Pass it to family if unused',                desc: 'Part of my estate plan' },
    ],
  },
  {
    id: 'edu_flexible',
    question: 'Are you comfortable with the funds being restricted to education expenses only?',
    answers: [
      { id: 'yes',      label: 'Yes — I plan to use it for education only',     desc: 'Tax advantages are worth the restriction' },
      { id: 'no',       label: 'No — I want flexibility to use funds for anything' },
      { id: 'unsure',   label: 'Not sure yet' },
    ],
  },
];

// Protect family branch
const STEPS_PROTECT: Step[] = [
  {
    id: 'pro_who',
    question: 'Who depends on your income?',
    answers: [
      { id: 'spouse',   label: 'My spouse or partner' },
      { id: 'children', label: 'My children' },
      { id: 'both',     label: 'Both spouse and children' },
      { id: 'parents',  label: 'My parents or other dependents' },
      { id: 'none',     label: 'Nobody depends on my income yet' },
    ],
  },
  {
    id: 'pro_age',
    question: 'What is your age range?',
    answers: [
      { id: '18', label: '18 – 35', desc: 'Building a foundation' },
      { id: '36', label: '36 – 50', desc: 'Peak earning years' },
      { id: '51', label: '51 – 65', desc: 'Pre-retirement' },
      { id: '65', label: '65+',     desc: 'Retirement years' },
    ],
  },
  {
    id: 'pro_duration',
    question: 'How long do you need this coverage?',
    answers: [
      { id: 'temporary', label: 'Temporarily — until my kids are grown or mortgage is paid', desc: '10, 20, or 30 years' },
      { id: 'lifetime',  label: 'For my entire life',                                        desc: 'Permanent coverage' },
      { id: 'both',      label: 'I want both coverage AND to build savings',                 desc: 'Protection + cash value growth' },
    ],
  },
  {
    id: 'pro_budget',
    question: 'What best describes your budget for this coverage?',
    answers: [
      { id: 'lowest',    label: 'I want the lowest possible premium',          desc: 'Affordable, straightforward protection' },
      { id: 'moderate',  label: 'I can pay a moderate premium for more value', desc: 'Balance of cost and benefit' },
      { id: 'invest',    label: 'I want to use this as an investment vehicle too' },
    ],
  },
];

// Health branch
const STEPS_HEALTH: Step[] = [
  {
    id: 'hlt_age',
    question: 'What is your age?',
    answers: [
      { id: 'under65', label: 'Under 65',                 desc: 'Not yet eligible for Medicare' },
      { id: '65plus',  label: '65 or older',              desc: 'Eligible for Medicare' },
    ],
  },
  {
    id: 'hlt_need',
    question: 'What type of coverage are you most concerned about?',
    answers: [
      { id: 'general',    label: 'General health — doctor visits, prescriptions, emergencies' },
      { id: 'longterm',   label: 'Long-term care — nursing home, home aide, assisted living' },
      { id: 'both',       label: 'Both general health and long-term care' },
      { id: 'supplement', label: 'Supplemental — I already have coverage and want to fill gaps' },
    ],
  },
  {
    id: 'hlt_employer',
    question: 'Do you currently have employer-provided health insurance?',
    answers: [
      { id: 'yes',      label: 'Yes — through my employer or spouse\'s employer' },
      { id: 'no',       label: 'No — I need to find my own coverage' },
      { id: 'retiring', label: 'I am retiring soon and will lose employer coverage' },
    ],
  },
];

// Estate branch
const STEPS_ESTATE: Step[] = [
  {
    id: 'est_assets',
    question: 'What do you want to protect or pass on?',
    answers: [
      { id: 'home',     label: 'My home or real estate' },
      { id: 'biz',      label: 'My business' },
      { id: 'savings',  label: 'My savings and investments' },
      { id: 'all',      label: 'All of the above' },
    ],
  },
  {
    id: 'est_docs',
    question: 'Do you currently have any estate planning documents?',
    answers: [
      { id: 'none',     label: 'No — I have nothing in place yet' },
      { id: 'basic',    label: 'I have a basic will but nothing else' },
      { id: 'some',     label: 'I have some documents but they need updating' },
      { id: 'complete', label: 'I have a complete plan already' },
    ],
  },
  {
    id: 'est_probate',
    question: 'Are you concerned about your estate going through probate court?',
    answers: [
      { id: 'yes',    label: 'Yes — I want to avoid probate entirely' },
      { id: 'unsure', label: 'I am not sure what probate is or how it affects me' },
      { id: 'no',     label: 'No — I am not worried about it' },
    ],
  },
];

/* ══════════════════════════════════════════════════════
   HONEST RECOMMENDATION ENGINE
   Each path returns { closest, other[] } with full
   plain-English explanation and "Why this result?" rows
══════════════════════════════════════════════════════ */

type RecommendationSet = {
  intro: string;
  closest: ProductResult;
  other: ProductResult[];
  disclaimer: string;
};

function getRecommendations(answers: Record<string, string>): RecommendationSet {
  const goal = answers.goal;

  /* ─── EDUCATION ─── */
  if (goal === 'education') {
    const who       = answers.edu_who;
    const age       = answers.edu_age;
    const control   = answers.edu_control;
    const flexible  = answers.edu_flexible;

    const forChild = who === 'child' || who === 'grandchild' || who === 'other';
    const longRunway = age === 'under5' || age === '6to10';
    const wantsControl = control === 'keep_control' || control === 'legacy';
    const edOnly = flexible === 'yes';

    const whyRows: WhyRow[] = [
      {
        answer: `You are saving for ${who === 'myself' ? 'yourself' : who === 'child' ? "a child's" : who === 'grandchild' ? "a grandchild's" : "another person's"} education`,
        impact: forChild ? 'Points to savings vehicles designed for minors with adult oversight' : 'Points to flexible savings tools for adults',
      },
      {
        answer: age ? `The student is currently ${age === 'under5' ? 'under 5' : age === '6to10' ? '6–10' : age === '11to15' ? '11–15' : '16 or older'}` : '',
        impact: longRunway ? 'A long time horizon means cash value inside an IUL can grow significantly tax-deferred' : 'Shorter timeline — prioritize accessible, lower-risk savings',
      },
      {
        answer: wantsControl ? 'You want to keep control of the funds' : 'You want the student to have free use of the funds',
        impact: wantsControl ? 'IUL keeps the policy owner (you) in control — the student cannot access it without your permission' : 'A custodial or flexible account may better serve this goal — NAIN does not offer those directly',
      },
      {
        answer: edOnly ? 'You plan to use this only for education expenses' : 'You want flexibility beyond just education',
        impact: edOnly ? 'IUL cash value can be withdrawn for any purpose including education — more flexible than a 529' : 'IUL is ideal since there are no restrictions on how cash value is used',
      },
    ];

    // Honest note for education: NAIN does not sell 529s
    const honestNote = "Important: NAIN Financials does not offer 529 college savings accounts or Coverdell ESAs — those are investment accounts offered by brokerages like Fidelity or Vanguard. What NAIN does offer for education savings is an Index Universal Life (IUL) policy, which builds tax-deferred cash value you can withdraw for education OR any other purpose. This is a legitimate strategy but it is an insurance product, not a dedicated education account.";

    return {
      intro: `Based on what you shared, here is what NAIN Financials can offer for education savings — along with an honest note about what we do not offer.`,
      closest: {
        id: 'iul', icon: '📈', color: '#378ADD', bg: 'rgba(55,138,221,0.12)',
        tag: 'Life Insurance / Savings Vehicle',
        name: 'Index Universal Life (IUL)',
        closestMatch: true,
        desc: longRunway
          ? 'With a long time horizon, an IUL policy can build significant tax-deferred cash value tied to a market index — with a guaranteed floor so the principal is never lost. You remain in full control as the policy owner, and the cash value can be withdrawn tax-free to pay for college or any other expense. It also provides a death benefit, so your family is protected if something happens to you before the student reaches college age.'
          : 'An IUL can still work for shorter timeframes, but the cash value grows more slowly in the early years. It is best suited for families who also want life insurance protection alongside education savings.',
        honestNote,
        whyRows,
        cta: 'Learn about IUL for education',
      },
      other: [
        {
          id: 'term', icon: '🛡️', color: '#BA7517', bg: 'rgba(186,117,23,0.12)',
          tag: 'Life Insurance',
          name: 'Term Life Insurance',
          closestMatch: false,
          desc: 'If your primary goal is simply to protect the student financially in case something happens to you — rather than building a savings fund — a term life policy is the most affordable way to ensure money is available for their education. The payout can be used for college costs with no restrictions.',
          whyRows: [{ answer: 'You want to protect the student if something happens to you', impact: 'Term life provides a tax-free death benefit that the beneficiary can use for any purpose, including education' }],
          cta: 'Explore Term Life',
        },
      ],
      disclaimer: 'For dedicated tax-advantaged education accounts (529 plans, Coverdell ESAs), please speak with a brokerage or financial advisor. NAIN Financials does not offer these products.',
    };
  }

  /* ─── RETIREMENT ─── */
  if (goal === 'retirement') {
    const risk   = answers.ret_risk;
    const time   = answers.ret_age;
    const income = answers.ret_income;

    const whyRows: WhyRow[] = [
      {
        answer: time === 'now' ? 'You are already retired' : `You have ${time === 'far' ? 'more than 20' : time === 'mid' ? '10–20' : 'less than 10'} years until retirement`,
        impact: time === 'now' || time === 'close' ? 'Closer to retirement — FIA prioritized for principal protection and guaranteed income' : 'Longer timeline — IUL can build more cash value before retirement',
      },
      {
        answer: `Your risk comfort is ${risk === 'low' ? 'conservative' : risk === 'mid' ? 'moderate' : 'growth-focused'}`,
        impact: risk === 'low' ? 'Fixed Index Annuity guarantees your principal can never go below zero' : risk === 'high' ? 'IUL offers higher upside potential tied to a market index' : 'Both FIA and IUL offer index-linked growth with downside protection',
      },
      {
        answer: `What matters most: ${income === 'income' ? 'guaranteed monthly income' : income === 'growth' ? 'maximum growth' : income === 'legacy' ? 'leaving money to family' : 'healthcare coverage'}`,
        impact: income === 'income' ? 'FIA is specifically designed for lifetime income guarantees' : income === 'legacy' ? 'IUL provides a death benefit alongside growth — ideal for legacy planning' : income === 'care' ? 'Long Term Care product should also be considered alongside retirement planning' : 'IUL maximizes cash value growth potential',
      },
    ];

    const primaryFIA = risk === 'low' || income === 'income' || time === 'now' || time === 'close';

    return {
      intro: 'Based on what you shared, here are the NAIN products that align with your retirement goals.',
      closest: primaryFIA ? {
        id: 'fia', icon: '📊', color: '#1D9E75', bg: 'rgba(29,158,117,0.12)',
        tag: 'Annuity',
        name: 'Fixed Index Annuity (FIA)',
        closestMatch: true,
        desc: 'A Fixed Index Annuity guarantees your principal — you cannot lose what you put in, regardless of market conditions. Your money grows linked to a market index (like the S&P 500) up to a cap, and you can elect a lifetime income rider that pays you a guaranteed monthly amount you cannot outlive. This is not a brokerage account — it is a contract with an insurance company designed specifically for retirement income security.',
        honestNote: 'An FIA is not a liquid account — accessing funds early may trigger surrender charges (typically for 7–10 years). It is designed for money you will not need until retirement. It is also not FDIC insured but is backed by the insurance carrier.',
        whyRows,
        cta: 'Learn about Fixed Index Annuities',
      } : {
        id: 'iul', icon: '📈', color: '#378ADD', bg: 'rgba(55,138,221,0.12)',
        tag: 'Life Insurance / Retirement Vehicle',
        name: 'Index Universal Life (IUL)',
        closestMatch: true,
        desc: 'An IUL builds cash value tax-deferred, linked to a market index with a guaranteed floor — so your cash value never decreases due to market losses. In retirement, you can take policy loans or withdrawals tax-free to supplement your income. It also provides a death benefit throughout your life, making it a dual-purpose tool for both retirement income and legacy planning.',
        honestNote: 'IUL is not a replacement for a 401(k) or IRA — it does not have the same contribution limits or tax deduction benefits. It works best as a supplement to other retirement savings, especially for people who have maxed out their tax-advantaged accounts.',
        whyRows,
        cta: 'Learn about IUL',
      },
      other: [
        primaryFIA ? {
          id: 'iul', icon: '📈', color: '#378ADD', bg: 'rgba(55,138,221,0.12)',
          tag: 'Life Insurance / Retirement Vehicle',
          name: 'Index Universal Life (IUL)',
          closestMatch: false,
          desc: 'If legacy planning or maximum growth potential matters to you alongside retirement income, an IUL can complement your FIA by building tax-free cash value with a permanent death benefit.',
          whyRows: [],
          cta: 'Explore IUL',
        } : {
          id: 'fia', icon: '📊', color: '#1D9E75', bg: 'rgba(29,158,117,0.12)',
          tag: 'Annuity',
          name: 'Fixed Index Annuity (FIA)',
          closestMatch: false,
          desc: 'If you want to guarantee a portion of your retirement income no matter how long you live, a FIA with a lifetime income rider ensures a predictable monthly payment alongside your IUL growth strategy.',
          whyRows: [],
          cta: 'Explore FIA',
        },
        ...(income === 'care' ? [{
          id: 'ltc', icon: '🏥', color: '#BA7517', bg: 'rgba(186,117,23,0.12)',
          tag: 'Care Coverage',
          name: 'Long Term Care Insurance',
          closestMatch: false,
          desc: 'Since healthcare in retirement is a priority for you, Long Term Care insurance covers nursing home, home health aide, and assisted living costs — expenses that can quickly drain retirement savings without coverage.',
          whyRows: [],
          cta: 'Explore Long Term Care',
        }] : []),
      ],
      disclaimer: 'NAIN products are insurance contracts, not investment accounts. They do not replace a 401(k), IRA, or Social Security — they complement them. Always consult a licensed financial advisor before making retirement planning decisions.',
    };
  }

  /* ─── PROTECT FAMILY ─── */
  if (goal === 'protect') {
    const duration = answers.pro_duration;
    const budget   = answers.pro_budget;
    const age      = answers.pro_age;

    const wantsTemp    = duration === 'temporary';
    const wantsBoth    = duration === 'both' || budget === 'invest';
    const wantsLowest  = budget === 'lowest';

    const whyRows: WhyRow[] = [
      {
        answer: `Coverage needed: ${duration === 'temporary' ? 'temporary (term)' : duration === 'lifetime' ? 'lifetime' : 'coverage + savings'}`,
        impact: wantsTemp ? 'Term life is the right tool — affordable, straightforward, expires when you no longer need it' : wantsBoth ? 'IUL provides lifelong coverage AND builds cash value you can use while alive' : 'Permanent coverage points to IUL',
      },
      {
        answer: `Budget preference: ${budget === 'lowest' ? 'lowest possible premium' : budget === 'moderate' ? 'moderate — willing to pay for value' : 'wants an investment component too'}`,
        impact: wantsLowest ? 'Term life has the lowest premiums of any life insurance — ideal if pure protection is the goal' : 'IUL premiums are higher but build tax-free cash value over time',
      },
      {
        answer: `Age range: ${age === '18' ? '18–35' : age === '36' ? '36–50' : age === '51' ? '51–65' : '65+'}`,
        impact: age === '18' || age === '36' ? 'Younger age = lower premiums. Locking in now saves significantly over time' : 'Older applicants pay higher premiums — acting sooner is important',
      },
    ];

    return {
      intro: 'Based on what you shared, here are the most appropriate life insurance options from NAIN Financials.',
      closest: wantsTemp || wantsLowest ? {
        id: 'term', icon: '🛡️', color: '#BA7517', bg: 'rgba(186,117,23,0.12)',
        tag: 'Life Insurance',
        name: 'Term Life Insurance',
        closestMatch: true,
        desc: 'Term life is the simplest, most affordable form of life insurance. You pay a fixed premium for a set period (10, 20, or 30 years), and if you pass away during that term, your family receives a tax-free payout. When the term ends, the coverage expires — there is no cash value. This is the right choice if your goal is pure family protection at the lowest possible cost.',
        whyRows,
        cta: 'Get a Term Life quote',
      } : {
        id: 'iul', icon: '📈', color: '#378ADD', bg: 'rgba(55,138,221,0.12)',
        tag: 'Life Insurance',
        name: 'Index Universal Life (IUL)',
        closestMatch: true,
        desc: 'An IUL gives your family a death benefit for your entire life — not just a fixed term. On top of that, a portion of your premium builds cash value tied to a market index, which you can access tax-free during your lifetime for retirement, emergencies, or any goal. It costs more than term life but does double duty as both protection and a savings vehicle.',
        honestNote: 'IUL is more complex and more expensive than term life. If your budget is tight, term life first is the wiser choice. IUL makes the most sense when you have maxed out other savings vehicles or want permanent protection with a savings component.',
        whyRows,
        cta: 'Learn about IUL',
      },
      other: [
        wantsTemp || wantsLowest ? {
          id: 'iul', icon: '📈', color: '#378ADD', bg: 'rgba(55,138,221,0.12)',
          tag: 'Life Insurance',
          name: 'Index Universal Life (IUL)',
          closestMatch: false,
          desc: 'If in the future you want coverage that does not expire and also builds savings, an IUL is the natural next step after term life.',
          whyRows: [],
          cta: 'Explore IUL',
        } : {
          id: 'term', icon: '🛡️', color: '#BA7517', bg: 'rgba(186,117,23,0.12)',
          tag: 'Life Insurance',
          name: 'Term Life Insurance',
          closestMatch: false,
          desc: 'If budget is a constraint, starting with a term policy now while building toward an IUL later is a common and smart strategy.',
          whyRows: [],
          cta: 'Explore Term Life',
        },
      ],
      disclaimer: 'Life insurance products are underwritten based on health and age. Final premiums depend on a medical underwriting process. Speak with a licensed NAIN advisor for an accurate quote.',
    };
  }

  /* ─── HEALTH ─── */
  if (goal === 'health') {
    const age      = answers.hlt_age;
    const need     = answers.hlt_need;
    const employer = answers.hlt_employer;

    const isMedicare  = age === '65plus';
    const needsLTC    = need === 'longterm' || need === 'both';
    const needsGeneral = need === 'general' || need === 'both' || need === 'supplement';
    const noEmployer  = employer === 'no' || employer === 'retiring';

    const whyRows: WhyRow[] = [
      {
        answer: `Age: ${isMedicare ? '65 or older — Medicare eligible' : 'Under 65 — not yet Medicare eligible'}`,
        impact: isMedicare ? 'Medicare Advantage (Part C) is the primary recommendation — replaces Original Medicare with additional benefits' : 'ACA Marketplace health insurance is appropriate — may qualify for income-based subsidies',
      },
      {
        answer: `Coverage need: ${need === 'general' ? 'general health' : need === 'longterm' ? 'long-term care' : need === 'both' ? 'both general and long-term care' : 'supplemental coverage'}`,
        impact: needsLTC ? 'Long Term Care insurance addresses nursing home, home aide, and assisted living costs specifically' : 'Standard health insurance covers medical expenses but typically not extended care',
      },
      {
        answer: employer === 'yes' ? 'You have employer coverage' : employer === 'retiring' ? 'You are losing employer coverage soon' : 'You have no employer coverage',
        impact: noEmployer ? 'You need your own policy — ACA or Medicare depending on age' : 'Employer coverage is primary; NAIN products can supplement gaps',
      },
    ];

    return {
      intro: 'Based on your situation, here are the health coverage options NAIN Financials offers.',
      closest: isMedicare ? {
        id: 'med', icon: '💊', color: '#378ADD', bg: 'rgba(55,138,221,0.12)',
        tag: 'Medicare',
        name: 'Medicare Advantage (Part C)',
        closestMatch: true,
        desc: 'Medicare Advantage is offered by private insurers and combines your Part A (hospital) and Part B (medical) coverage into one plan. Most plans include Part D prescription drug coverage and often add dental, vision, and hearing benefits that Original Medicare does not cover. Premiums are often $0 or very low.',
        honestNote: 'Medicare Advantage plans have provider networks — you may need to see in-network doctors. Coverage varies by plan and location. Enrollment periods apply.',
        whyRows,
        cta: 'Explore Medicare Advantage',
      } : {
        id: 'aca', icon: '⚕️', color: '#1D9E75', bg: 'rgba(29,158,117,0.12)',
        tag: 'Health Insurance',
        name: 'Health Insurance (ACA)',
        closestMatch: true,
        desc: 'ACA Marketplace health insurance provides comprehensive coverage including preventive care, emergency services, prescription drugs, and mental health. Depending on your household income, you may qualify for premium tax credits that significantly reduce your monthly cost. No one can be denied coverage for pre-existing conditions.',
        whyRows,
        cta: 'Explore ACA Health Plans',
      },
      other: needsLTC ? [{
        id: 'ltc', icon: '🏥', color: '#BA7517', bg: 'rgba(186,117,23,0.12)',
        tag: 'Care Coverage',
        name: 'Long Term Care Insurance',
        closestMatch: false,
        desc: 'Health insurance and Medicare do NOT cover extended stays in nursing homes or long-term home health aide costs. Long Term Care insurance fills this critical gap — covering costs that can reach $80,000–$100,000 per year and would otherwise drain your savings and assets.',
        honestNote: 'Long-term care insurance is most affordable when purchased in your 50s. Premiums rise significantly with age.',
        whyRows: [],
        cta: 'Explore Long Term Care',
      }] : [],
      disclaimer: 'Health insurance products are subject to enrollment periods, network restrictions, and underwriting. NAIN advisors can help you find the right plan for your specific situation.',
    };
  }

  /* ─── ESTATE ─── */
  if (goal === 'estate') {
    const docs    = answers.est_docs;
    const probate = answers.est_probate;

    const noDocs      = docs === 'none' || docs === 'basic';
    const avoidProbate = probate === 'yes' || probate === 'unsure';

    const whyRows: WhyRow[] = [
      {
        answer: `Current documents: ${docs === 'none' ? 'nothing in place' : docs === 'basic' ? 'basic will only' : docs === 'some' ? 'some outdated documents' : 'complete plan'}`,
        impact: noDocs ? 'Starting from scratch — a complete estate planning package is essential' : 'Existing documents need review and likely a trust to complement the will',
      },
      {
        answer: `Probate concern: ${probate === 'yes' ? 'wants to avoid probate' : probate === 'unsure' ? 'not sure about probate' : 'not concerned'}`,
        impact: avoidProbate ? 'A revocable living trust (included in the package) allows assets to pass directly to heirs without going through probate court — saving time, money, and privacy' : 'If probate is not a concern, a will may suffice for simpler estates, but a trust still offers benefits for managing assets and providing for heirs'
        },
    ];

    return {
      intro: 'Based on your situation, here is what NAIN Financials offers for estate planning.',
      closest: {
        id: 'will', icon: '📜', color: '#378ADD', bg: 'rgba(55,138,221,0.12)',
        tag: 'Estate Planning',
        name: 'Will & Trust Draft — Premium Package',
        closestMatch: true,
        desc: avoidProbate
          ? 'Our Premium Probate Avoidance Package includes: (1) Last Will & Testament, (2) Revocable Living Trust — assets in the trust bypass probate entirely, (3) Durable Power of Attorney — someone acts on your behalf if you are incapacitated, (4) Healthcare Directive / Living Will — your medical wishes are documented, (5) HIPAA Authorization, and (6) Certificate of Trust. This is a comprehensive estate plan, not just a basic will.'
          : 'Our estate planning package includes a Last Will & Testament and the supporting documents needed to ensure your wishes are legally documented, your assets go to the right people, and your family avoids legal complications.',
        honestNote: 'These are legal documents. While NAIN helps you prepare them, we strongly recommend having a licensed estate attorney review the final documents, especially if your estate is complex or involves a business.',
        whyRows,
        cta: 'Start your estate plan',
      },
      other: [{
        id: 'iul', icon: '📈', color: '#378ADD', bg: 'rgba(55,138,221,0.12)',
        tag: 'Life Insurance',
        name: 'Index Universal Life (IUL)',
        closestMatch: false,
        desc: 'An IUL policy is commonly used as part of an estate plan — the death benefit passes to heirs income-tax-free and outside of probate. If you want to leave a specific amount to your children or grandchildren, an IUL is a precise and tax-efficient way to do it.',
        whyRows: [],
        cta: 'Explore IUL for estate planning',
      }],
      disclaimer: 'Estate planning documents have legal requirements that vary by state. NAIN helps prepare these documents but is not a law firm. Always have an estate attorney review your final plan.',
    };
  }

  /* ─── SPECIAL NEEDS ─── */
  if (goal === 'special') {
    return {
      intro: 'A Special Needs Trust is specifically designed for this situation. Here is an honest explanation of what it does and does not do.',
      closest: {
        id: 'snt', icon: '🤝', color: '#639922', bg: 'rgba(99,153,34,0.12)',
        tag: 'Special Needs',
        name: 'Special Needs Trust',
        closestMatch: true,
        desc: 'A Special Needs Trust (SNT) is a legal trust that holds funds for a person with a disability WITHOUT disqualifying them from means-tested government benefits like Medicaid and Supplemental Security Income (SSI). If a disabled person receives money directly — as an inheritance or gift — they can lose their Medicaid and SSI immediately. An SNT prevents this. The trust pays for supplemental expenses the government does not cover: recreation, education, transportation, electronics, and more.',
        honestNote: 'An SNT must be carefully drafted to comply with federal and state regulations. NAIN helps set up the structure, but a licensed special needs attorney should review the final trust document. The trustee (the person who manages the funds) carries legal responsibility.',
        whyRows: [
          { answer: 'Your loved one receives or is eligible for Medicaid or SSI', impact: 'A direct inheritance or gift would disqualify them — an SNT protects those benefits' },
          { answer: 'You want to contribute funds for their benefit', impact: 'Family and friends can contribute to the SNT without affecting the beneficiary\'s benefits' },
        ],
        cta: 'Learn about Special Needs Trusts',
      },
      other: [{
        id: 'term', icon: '🛡️', color: '#BA7517', bg: 'rgba(186,117,23,0.12)',
        tag: 'Life Insurance',
        name: 'Term Life Insurance',
        closestMatch: false,
        desc: 'Many families pair an SNT with a life insurance policy — naming the SNT as the beneficiary. This ensures that if you pass away, a lump sum flows into the trust to fund your loved one\'s care for years to come.',
        whyRows: [],
        cta: 'Explore Term Life for SNT funding',
      }],
      disclaimer: 'Special Needs Trusts involve complex legal and tax considerations. Work with both a NAIN advisor and a licensed special needs attorney to ensure full compliance.',
    };
  }

  /* ─── CAREER ─── */
  if (goal === 'career') {
    return {
      intro: 'Here is an honest look at what the NAIN Partnership Program involves.',
      closest: {
        id: 'partner', icon: '🌟', color: '#7F77DD', bg: 'rgba(127,119,221,0.12)',
        tag: 'Career Opportunity',
        name: 'NAIN Financials Partnership Program',
        closestMatch: true,
        desc: 'The Partnership Program is for individuals who want to build a career in financial services by helping families access insurance and financial planning products. You will need to obtain your state life & health insurance license (NAIN provides guidance on this process). Once licensed, you gain access to NAIN\'s product portfolio, training, distribution system, and mentorship. Income is commission-based — what you earn depends directly on what you produce.',
        honestNote: 'This is a commission-based business, not a salaried job. Income is not guaranteed and varies significantly based on effort, skill, and market. Licensing requires passing a state exam. Be sure you understand the business model before committing.',
        whyRows: [
          { answer: 'You want to start a career in financial services', impact: 'NAIN\'s distribution system and carrier partnerships give you access to a broad product suite to serve clients' },
          { answer: 'You are interested in building your own business', impact: 'The program is structured for independent agents who build and manage their own client base' },
        ],
        cta: 'Start your application',
      },
      other: [],
      disclaimer: 'Licensing requirements, startup costs, and compensation structures vary. Request a full disclosure document from your NAIN recruiter before signing any agreement.',
    };
  }

  // Fallback
  return {
    intro: 'Based on your answers, here are some options to explore.',
    closest: {
      id: 'term', icon: '🛡️', color: '#BA7517', bg: 'rgba(186,117,23,0.12)',
      tag: 'Life Insurance', name: 'Term Life Insurance', closestMatch: true,
      desc: 'Term life is a straightforward starting point for most financial protection needs.',
      whyRows: [], cta: 'Learn more',
    },
    other: [],
    disclaimer: 'Speak with a NAIN advisor to find the product that best fits your specific situation.',
  };
}

/* ══════════════════════════════════════════════════════
   GET STEP SEQUENCE FOR A GIVEN GOAL
══════════════════════════════════════════════════════ */
function getStepsForGoal(goal: string): Step[] {
  switch (goal) {
    case 'retirement': return STEPS_RETIREMENT;
    case 'education':  return STEPS_EDUCATION;
    case 'protect':    return STEPS_PROTECT;
    case 'health':     return STEPS_HEALTH;
    case 'estate':     return STEPS_ESTATE;
    default:           return []; // career, special — go straight to results
  }
}

/* ══════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════ */
export default function Questionnaire() {
  const [phase, setPhase]         = useState<'goal'|'branch'|'result'>('goal');
  const [answers, setAnswers]     = useState<Record<string, string>>({});
  const [branchSteps, setBranchSteps] = useState<Step[]>([]);
  const [branchIdx, setBranchIdx] = useState(0);
  const [selected, setSelected]   = useState<string|null>(null);
  const [sliding, setSliding]     = useState<'out-left'|'out-right'|'in'|null>(null);
  const [showWhy, setShowWhy]     = useState<string|null>(null);

  const animateOut = (dir: 'out-left'|'out-right', cb: () => void) => {
    setSliding(dir);
    setTimeout(() => { cb(); setSliding('in'); setTimeout(() => setSliding(null), 300); }, 260);
  };

  /* ── Goal selection ── */
  const handleGoalSelect = (id: string) => setSelected(id);

  const handleGoalContinue = () => {
    if (!selected) return;
    const newAnswers = { ...answers, goal: selected };
    setAnswers(newAnswers);
    const steps = getStepsForGoal(selected);
    animateOut('out-left', () => {
      if (steps.length === 0) {
        setPhase('result');
      } else {
        setBranchSteps(steps);
        setBranchIdx(0);
        setSelected(null);
        setPhase('branch');
      }
    });
  };

  /* ── Branch step selection ── */
  const handleBranchSelect = (id: string) => setSelected(id);

  const handleBranchContinue = () => {
    if (!selected) return;
    const step = branchSteps[branchIdx];
    const newAnswers = { ...answers, [step.id]: selected };
    setAnswers(newAnswers);
    animateOut('out-left', () => {
      if (branchIdx < branchSteps.length - 1) {
        setBranchIdx(i => i + 1);
        setSelected(null);
      } else {
        setPhase('result');
      }
    });
  };

  const handleBack = () => {
    if (phase === 'branch' && branchIdx > 0) {
      animateOut('out-right', () => { setBranchIdx(i => i - 1); setSelected(null); });
    } else if (phase === 'branch' && branchIdx === 0) {
      animateOut('out-right', () => { setPhase('goal'); setSelected(answers.goal || null); });
    } else if (phase === 'result') {
      const steps = getStepsForGoal(answers.goal);
      if (steps.length > 0) {
        setBranchSteps(steps);
        setBranchIdx(steps.length - 1);
        setPhase('branch');
        setSelected(null);
      } else {
        setPhase('goal');
        setSelected(answers.goal || null);
      }
    }
  };

  const restart = () => {
    setPhase('goal'); setAnswers({}); setBranchSteps([]);
    setBranchIdx(0); setSelected(null); setSliding(null); setShowWhy(null);
  };

  /* ── Progress ── */
  const totalBranch = branchSteps.length;
  const progress = phase === 'goal' ? 0
    : phase === 'branch' ? Math.round(((branchIdx + 1) / (totalBranch + 1)) * 100)
    : 100;

  const currentStep = phase === 'branch' ? branchSteps[branchIdx] : null;
  const currentAnswer = selected ?? (currentStep ? answers[currentStep.id] : null);
  const goalAnswer = selected ?? answers.goal ?? null;

  const rec = phase === 'result' ? getRecommendations(answers) : null;

  return (
    <>
         {/* ══ GOAL STEP ══ */}
      {phase === 'goal' && (
        <div className="q-page">
          <div className="q-prog"><div className="q-prog-fill" style={{ width: '0%' }} /></div>
          <div className="q-main">
            <div className="q-shell">
              <div className={`q-slide ${sliding || ''}`}>
                <div className="q-step-label">Step 1 — Choose your goal</div>
                <h2 className="q-question">{STEP_GOAL.question}</h2>
                <p className="q-subtitle">{STEP_GOAL.subtitle}</p>
                <div className="q-list">
                  {STEP_GOAL.answers.map(a => (
                    <button key={a.id} className={`q-item${goalAnswer === a.id ? ' sel' : ''}`} onClick={() => handleGoalSelect(a.id)}>
                      <div className="q-circle"><div className="q-dot" /></div>
                      <div className="q-item-text">
                        <span className="q-item-label">{a.label}</span>
                        {a.desc && <span className="q-item-desc">{a.desc}</span>}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="q-actions">
                  <button className="q-btn-back" disabled>Back</button>
                  <button className="q-btn-cont" onClick={handleGoalContinue} disabled={!goalAnswer}>Continue</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ BRANCH STEPS ══ */}
      {phase === 'branch' && currentStep && (
        <div className="q-page">
          <div className="q-topbar">
            <div className="q-brand"><div className="q-brand-logo">🏦</div>NAIN Financials</div>
            <button className="q-exit" onClick={restart}>✕ Exit</button>
          </div>
          <div className="q-prog"><div className="q-prog-fill" style={{ width: `${progress}%` }} /></div>
          <div className="q-main">
            <div className="q-shell">
              <div className={`q-slide ${sliding || ''}`}>
                <div className="q-step-label">Step {branchIdx + 2} of {branchSteps.length + 1}</div>
                <h2 className="q-question">{currentStep.question}</h2>
                {currentStep.subtitle && <p className="q-subtitle">{currentStep.subtitle}</p>}
                <div className="q-list">
                  {currentStep.answers.map(a => (
                    <button key={a.id} className={`q-item${currentAnswer === a.id ? ' sel' : ''}`} onClick={() => handleBranchSelect(a.id)}>
                      <div className="q-circle"><div className="q-dot" /></div>
                      <div className="q-item-text">
                        <span className="q-item-label">{a.label}</span>
                        {a.desc && <span className="q-item-desc">{a.desc}</span>}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="q-actions">
                  <button className="q-btn-back" onClick={handleBack}>Back</button>
                  <button className="q-btn-cont" onClick={handleBranchContinue} disabled={!currentAnswer}>Continue</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ RESULT SCREEN ══ */}
      {phase === 'result' && rec && (
        <div className="r-page">
          <div className="r-topbar">
            <div className="q-brand"><div className="q-brand-logo">🏦</div>NAIN Financials</div>
            <button className="q-exit" onClick={restart}>✕ Start over</button>
          </div>
          <div className="r-main">
            <div className="r-shell">

              <h2 style={{ fontSize: 26, fontWeight: 600, color: '#e0ecff', marginBottom: 8, letterSpacing: -0.3 }}>
                Based on what you shared with us, here is what we found for you.
              </h2>
              <p className="r-intro">{rec.intro}</p>

              {/* Two-column result cards — Closest match + Other options */}
              <div className="r-cols">
                {/* Closest match */}
                <div>
                  <div className="r-col-label">Closest match</div>
                  <div className="r-card primary">
                    <div className="r-card-head">
                      <div className="r-card-icon-row">
                        <div className="r-card-icon" style={{ background: rec.closest.bg }}>{rec.closest.icon}</div>
                        <span className="r-tag" style={{ background: rec.closest.bg, color: rec.closest.color }}>{rec.closest.tag}</span>
                      </div>
                      <div className="r-card-name">{rec.closest.name}</div>
                    </div>
                    <p className="r-card-desc">{rec.closest.desc}</p>
                    {rec.closest.honestNote && (
                      <div className="r-honest">
                        <strong>⚠️ What you should know</strong>
                        {rec.closest.honestNote}
                      </div>
                    )}
                    <div className="r-card-cta">
                      <button className="r-btn-start" style={{ background: rec.closest.color }}>{rec.closest.cta} →</button>
                      <button className="r-btn-advisor">Talk to an advisor</button>
                    </div>
                  </div>
                </div>

                {/* Other options */}
                {rec.other.length > 0 && (
                  <div>
                    <div className="r-col-label">Other options</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {rec.other.map(p => (
                        <div key={p.id} className="r-card">
                          <div className="r-card-head">
                            <div className="r-card-icon-row">
                              <div className="r-card-icon" style={{ background: p.bg }}>{p.icon}</div>
                              <span className="r-tag" style={{ background: p.bg, color: p.color }}>{p.tag}</span>
                            </div>
                            <div className="r-card-name">{p.name}</div>
                          </div>
                          <p className="r-card-desc">{p.desc}</p>
                          {p.honestNote && (
                            <div className="r-honest">
                              <strong>⚠️ What you should know</strong>
                              {p.honestNote}
                            </div>
                          )}
                          <div className="r-card-cta">
                            <button className="r-btn-start" style={{ background: p.color }}>{p.cta} →</button>
                            <button className="r-btn-advisor">Talk to an advisor</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Why this result */}
              {rec.closest.whyRows.length > 0 && (
                <div className="r-why-section">
                  <h3 className="r-why-title">Why this result?</h3>
                  <p className="r-why-sub">Here is a breakdown of the answers we used to determine which products may be appropriate for you.</p>
                  <button className="r-why-toggle" onClick={() => setShowWhy(showWhy === 'open' ? null : 'open')}>
                    {showWhy === 'open' ? '▲ Hide breakdown' : '▼ Show breakdown'}
                  </button>
                  {showWhy === 'open' && (
                    <table className="r-why-table">
                      <thead>
                        <tr>
                          <th>Your answer</th>
                          <th>What this means for your recommendation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rec.closest.whyRows.filter(r => r.answer).map((row, i) => (
                          <tr key={i}>
                            <td>{row.answer}</td>
                            <td>{row.impact}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {/* Disclaimer */}
              <div className="r-disclaimer">
                <strong style={{ display: 'block', marginBottom: 4, color: '#5a7ab5' }}>Disclosure</strong>
                {rec.disclaimer}
              </div>

              <div className="r-restart-row">
                <button className="r-restart-btn" onClick={restart}>↺ Start over with different answers</button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

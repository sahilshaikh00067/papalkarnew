import React, { useState, useEffect, useRef, useCallback } from "react";
import dr1 from "./assets/dr1.jpg";
import dr2 from "./assets/dr2.jpg";
import dr3 from "./assets/dr3.jpeg";
import dr4 from "./assets/dr4.jpeg";
import dr5 from "./assets/dr5.jpg";
import dr6 from "./assets/dr6.jpg";
import dr7 from "./assets/dr7.jpg";
import dr8 from "./assets/dr8.jpg";
import dr9 from "./assets/dr9.jpg";
import dr10 from "./assets/dr10.jpg";
import dr11 from "./assets/dr11.jpg";
import dr12 from "./assets/dr12.jpg";
import dr13 from "./assets/dr13.jpg";
import dr14 from "./assets/dr14.jpg";
import dr15 from "./assets/dr15.jpg";
import advance from "./assets/advance.jpg";
import dr16 from "./assets/dr16.jpg";
import logopapa from "./assets/logopapa.png";





/* ============================================================================
   PAPALKAR GASTROCARE — Pusad's First Gastroenterology Super-Specialty Centre
   Ultra-premium single-file React + Tailwind build — v2.
   Signature identity: "faceted cut" geometry (angled corners on
   buttons/cards/dividers) + a rotating gold-rose glow halo behind every
   key visual — a quiet, jewel-like premium language.
   v2 changes: removed soft blurred "blob" circles in favour of rotating
   faceted rings (on-brand, not generic); added a true 3D coverflow slider;
   smoother, longer-eased tilt/hover everywhere; Services rebuilt as a
   responsive 4-column card grid that reveals one-by-one on scroll; every
   photograph replaced with hospital/clinic-appropriate imagery.
   Zero extra npm packages — pure React state + CSS for every animation.
   ========================================================================== */

/* ------------------------------ Business data (single source of truth) ------------------------------ */
const PHONE_1_DISPLAY = "+91 87999 92699";
const PHONE_2_DISPLAY = "+91 87999 92499";
const PHONE_1_TEL = "+918799992699";
const PHONE_2_TEL = "+918799992499";
const WHATSAPP_NUMBER = "918799992699";
const ADDRESS_LINES = [
  "Papalkar Heights, Opposite T.V. Centre,",
  "Near Telephone Exchange, Talao Layout,",
  "Pusad – 445204, District Yavatmal, Maharashtra",
];
const OLYMPUS_LINK = "https://medical.olympusamerica.com/products/evis-exera-iii-gastroenterology";

const waLink = (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
const APPOINTMENT_LINK = waLink("Hi, I would like to book an appointment at Papalkar Gastrocare.");

/* ------------------------------ Image library (clinic / hospital only, license-free) ------------------------------ */
const IMG = {
  hero: dr1, // hospital reception
  technology: advance,
  legacy: dr4,
};

const GALLERY = [
  dr2, // corridor
  dr3, // doctor & patient
  "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=80", // hospital room
];

/* ------------------------------ Design tokens & global CSS ------------------------------ */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..900&family=Inter:wght@400;500;600;700;800&display=swap');

    :root{
      --navy:#0A1F3B; --navy2:#0F2C50; --navy3:#123A63;
      --rose:#C81155; --rose2:#E63975; --rose-soft:#FBE4ED;
      --gold:#C9A227; --gold-soft:#F3E7C4;
      --cream:#F8F6F1; --paper:#FFFFFF;
      --ink:#182233; --slate:#5C6675; --line:#E8E2D6;
    }
    *{box-sizing:border-box;}
    html{scroll-behavior:smooth;}
    body{margin:0;background:var(--cream);}
    .font-display{font-family:'Fraunces',serif;}
    .font-body{font-family:'Inter',sans-serif;}

    /* ---------- faceted "gem cut" geometry ---------- */
    .facet-lg{clip-path:polygon(22px 0,100% 0,100% calc(100% - 22px),calc(100% - 22px) 100%,0 100%,0 22px);}
    .facet-md{clip-path:polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px);}
    .facet-sm{clip-path:polygon(9px 0,100% 0,100% calc(100% - 9px),calc(100% - 9px) 100%,0 100%,0 9px);}
    .facet-btn{clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px);}

    /* ---------- keyframes ---------- */
    @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
    @keyframes floatY2{0%,100%{transform:translateY(0)}50%{transform:translateY(14px)}}
    @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes pulseRing{0%{box-shadow:0 0 0 0 rgba(200,17,85,.55)}100%{box-shadow:0 0 0 20px rgba(200,17,85,0)}}
    @keyframes spinSlow{to{transform:rotate(360deg)}}
    @keyframes spinSlowRev{to{transform:rotate(-360deg)}}
    @keyframes rotateGem{0%,100%{transform:rotate(45deg) scale(1)}50%{transform:rotate(50deg) scale(1.05)}}
    @keyframes gradShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}

    .reveal{opacity:0;}
    .reveal.in{animation:fadeUp .85s cubic-bezier(.22,1,.36,1) forwards;}

    .accordion-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows .45s cubic-bezier(.22,1,.36,1);}
    .accordion-body.open{grid-template-rows:1fr;}
    .accordion-body > div{overflow:hidden;}

    .marquee-track{animation:marquee 28s linear infinite;}
    .marquee-track:hover{animation-play-state:paused;}

    .shimmer-text{
      background:linear-gradient(100deg,var(--gold) 20%,#fff 45%,var(--gold) 70%);
      background-size:220% auto;-webkit-background-clip:text;background-clip:text;color:transparent;
      animation:shimmer 3.2s linear infinite;
    }
    .grain-gradient{
      background:linear-gradient(120deg,var(--navy) 0%,var(--navy3) 45%,#0c2c52 100%);
      background-size:220% 220%;animation:gradShift 12s ease infinite;
    }
    .hero-scroll-dot{animation:floatY2 1.8s ease-in-out infinite;}

    /* ---------- premium halo glow (rotating conic gradient behind key visuals) ---------- */
    .halo{position:absolute;inset:-14px;border-radius:28px;z-index:0;filter:blur(28px);opacity:.55;
      background:conic-gradient(from 0deg,var(--gold),var(--rose),var(--navy3),var(--gold));
      animation:spinSlow 9s linear infinite;}
    .halo-soft{position:absolute;inset:-10px;border-radius:24px;z-index:0;filter:blur(20px);opacity:.35;
      background:conic-gradient(from 90deg,var(--rose),var(--gold),var(--navy3),var(--rose));
      animation:spinSlowRev 12s linear infinite;}

    /* ---------- signature replacement for the old blurred circles: rotating faceted rings ---------- */
    .facet-ring{position:absolute;pointer-events:none;border:1px solid currentColor;
      clip-path:polygon(18% 0,100% 0,100% 82%,82% 100%,0 100%,0 18%);}
    .facet-ring.spin{animation:spinSlow 26s linear infinite;}
    .facet-ring.spin-rev{animation:spinSlowRev 32s linear infinite;}

    /* ---------- premium shine sweep on hover (used on cards) ---------- */
    .shine{position:relative;}
    .shine::after{content:'';position:absolute;inset:0;left:-150%;width:60%;
      background:linear-gradient(115deg,transparent 0%,rgba(255,255,255,.4) 45%,transparent 100%);
      transform:skewX(-20deg);transition:left .85s cubic-bezier(.22,1,.36,1);pointer-events:none;z-index:2;}
    .shine:hover::after{left:150%;}

    /* ---------- subtle film-grain overlay for texture ---------- */
    .grain-overlay{position:fixed;inset:0;pointer-events:none;z-index:2;opacity:.035;mix-blend-mode:overlay;
      background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}

    /* ---------- scroll progress bar ---------- */
    .scroll-progress{position:fixed;top:0;left:0;height:3px;z-index:100;
      background:linear-gradient(90deg,var(--gold),var(--rose));
      box-shadow:0 0 10px rgba(201,162,39,.6);transition:width .1s linear;}

    ::selection{background:var(--rose);color:#fff;}
    .scrollbar-hide::-webkit-scrollbar{display:none;}
    .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none;}
  `}</style>
);

/* ------------------------------ Inline icon set (zero deps) ------------------------------ */
const Ic = {
  phone: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L7.9 9.9a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.9 2.3Z" /></svg>),
  mail: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>),
  pin: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>),
  clock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>),
  menu: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 6h18M3 12h18M3 18h18" /></svg>),
  close: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>),
  arrow: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>),
  check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m20 6-11 11-5-5" /></svg>),
  star: (p) => (<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="m12 2 3.1 6.6 7.2.9-5.3 5 1.4 7.2L12 18.3 5.6 21.7 7 14.5l-5.3-5 7.2-.9L12 2Z" /></svg>),
  chevDown: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m6 9 6 6 6-6" /></svg>),
  plus: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 5v14M5 12h14" /></svg>),
  minus: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14" /></svg>),
  quote: (p) => (<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M9.6 6C6 7.3 4 10 4 13.6 4 16.6 6 19 9 19c2.2 0 4-1.8 4-4s-1.6-3.8-3.7-3.9c.3-1.6 1.7-3 3.3-3.6L9.6 6Zm9.4 0c-3.6 1.3-5.6 4-5.6 7.6 0 3 2 5.4 5 5.4 2.2 0 4-1.8 4-4s-1.6-3.8-3.7-3.9c.3-1.6 1.7-3 3.3-3.6L19 6Z" /></svg>),
  shield: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3Z" /><path d="M12 8v5M12 16h.01" /></svg>),
  award: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8" r="6" /><path d="M9 13.5 7 22l5-3 5 3-2-8.5" /></svg>),
  users: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></svg>),
  pulse: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>),
  // stetho: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4.5 3v6a4.5 4.5 0 0 0 9 0V3M9 15.5a5.5 5.5 0 0 0 11 0V13" /><circle cx="20" cy="9" r="2" /><circle cx="9" cy="19.5" r="2.5" /></svg>),
  scope: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="9" cy="9" r="6" /><path d="m14 14 7 7" /></svg>),
  drop: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2s7 7.5 7 12.5A7 7 0 0 1 5 14.5C5 9.5 12 2 12 2Z" /></svg>),
  wave: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2 12h3l2-7 4 14 3-10 2 5h6" /></svg>),
  leaf: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M11 20A9 9 0 0 0 20 11c0-5-4-9-9-9S2 6 2 11a9 9 0 0 0 5 8Z" /><path d="M11 20c0-6 3-11 9-13" /></svg>),
  calendar: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M8 2.5v4M16 2.5v4M3 10h18" /></svg>),
  fb: (p) => (<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5H17V3.6C16.6 3.5 15.6 3.4 14.5 3.4c-2.4 0-4 1.4-4 4.1v2.4H8v3.1h2.5V21h3Z" /></svg>),
  ig: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" /></svg>),
  whatsapp: (p) => (<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.2.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.4c.1-.1.2-.3.3-.4.1-.2 0-.3 0-.5s-.6-1.5-.9-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-1 1-1 2.3 0 1.4 1 2.7 1.1 2.9.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.2-.3-.2-.5-.3Z" /></svg>),
  top: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 19V5M5 12l7-7 7 7" /></svg>),
  spiral: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22a8 8 0 1 1 0-16 6 6 0 1 1 0 12 4 4 0 1 1 0-8 2 2 0 1 1 0 4" /></svg>),
  target: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4.2" /><circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" /></svg>),
  band: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><circle cx="12" cy="12" r="7.5" /><path d="M4.8 8h14.4M4.8 16h14.4" /></svg>),
  expand: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5" /></svg>),
  tube: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="7.5" y="2.5" width="9" height="19" rx="4.5" /><path d="M7.5 9.5h9M7.5 15h9" /></svg>),
  feed: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2.5v6M9 5.5l3-3 3 3" /><rect x="6" y="10.5" width="12" height="9.5" rx="2" /><path d="M9 15h6" /></svg>),
  cut: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="6" cy="6" r="2.6" /><circle cx="6" cy="18" r="2.6" /><path d="m20 5-9.5 9.5M20 19l-6-6M8 8l1.5 1.5" /></svg>),
  link: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6" /><path d="M10 14 21 3" /></svg>),
  monitor: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="4" width="20" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></svg>),
  history: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5M12 7v5l4 2" /></svg>),
};

/* ------------------------------ Small utility hooks ------------------------------ */
function useInView(threshold = 0.18) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Reveal({ children, className = "", delay = 0, as = "div" }) {
  const [ref, inView] = useInView(0.15);
  const Tag = as;
  return (
    <Tag ref={ref} className={`reveal ${inView ? "in" : ""} ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

function CountUp({ end, duration = 1800, suffix = "", decimals = 0 }) {
  const [ref, inView] = useInView(0.5);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf, start;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(end * eased);
      if (p < 1) raf = requestAnimationFrame(step); else setVal(end);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);
  return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>;
}

/* ------------------------------ 3D Tilt wrapper (smoother, more premium easing) ------------------------------ */
function Tilt({ children, className = "", max = 10, scale = 1.03, glare = true, style = {} }) {
  const ref = useRef(null);
  const [tf, setTf] = useState("perspective(1200px) rotateX(0) rotateY(0) scale(1)");
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * max * 2;
    const ry = (px - 0.5) * max * 2;
    setTf(`perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`);
    if (glare) setGlareStyle({ opacity: 1, background: `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,.45), transparent 60%)` });
  };
  const onLeave = () => {
    setTf("perspective(1200px) rotateX(0) rotateY(0) scale(1)");
    setGlareStyle({ opacity: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform: tf, transition: "transform .65s cubic-bezier(.16,1,.3,1)", transformStyle: "preserve-3d", ...style }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500 rounded-[inherit]"
          style={glareStyle}
        />
      )}
    </div>
  );
}

/* ------------------------------ Magnetic hover wrapper (buttons drift toward cursor) ------------------------------ */
function Magnetic({ children, className = "", strength = 16 }) {
  const ref = useRef(null);
  const [tf, setTf] = useState("translate(0px,0px)");
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * strength;
    const y = ((e.clientY - r.top) / r.height - 0.5) * strength;
    setTf(`translate(${x}px,${y}px)`);
  };
  const onLeave = () => setTf("translate(0px,0px)");
  return (
    <span ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ display: "inline-block", transform: tf, transition: "transform .35s cubic-bezier(.16,1,.3,1)" }} className={className}>
      {children}
    </span>
  );
}

/* ------------------------------ Halo-framed visual (rotating glow behind an image/card) ------------------------------ */
function Halo({ children, className = "", soft = false }) {
  return (
    <div className={`relative ${className}`}>
      <div className={soft ? "halo-soft" : "halo"} />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}

/* ------------------------------ Faceted ring — replaces the old blurred "blob" circles ------------------------------ */
function FacetRing({ className = "", size = 260, tone = "gold", rev = false, opacity = 0.16 }) {
  const color = tone === "gold" ? "var(--gold)" : tone === "rose" ? "var(--rose)" : "#ffffff";
  return (
    <div
      className={`facet-ring hidden md:block ${rev ? "spin-rev" : "spin"} ${className}`}
      style={{ width: size, height: size, color, opacity }}
    />
  );
}

/* ------------------------------ Resilient image (fallback if a URL ever fails) ------------------------------ */
function SImg({ src, alt, className = "" }) {
  const [err, setErr] = useState(false);
  if (err) {
    return <div className={`bg-gradient-to-br from-[var(--navy3)] via-[var(--rose)] to-[var(--gold)] ${className}`} />;
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setErr(true)}
      className={className}
    />
  );
}

/* ------------------------------ Premium 3D coverflow slider ------------------------------ */
function Coverflow3D({ images, height = 440, interval = 4200 }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = images.length;

  useEffect(() => {
    if (paused || n <= 1) return;
    const id = setInterval(() => setActive((i) => (i + 1) % n), interval);
    return () => clearInterval(id);
  }, [paused, n, interval]);

  const go = (i) => setActive(((i % n) + n) % n);

  return (
    <div className="relative">
      <div
        className="relative w-full"
        style={{ height, perspective: "1500px" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {images.map((src, i) => {
          let offset = i - active;
          if (offset > n / 2) offset -= n;
          if (offset < -n / 2) offset += n;
          const abs = Math.abs(offset);
          if (abs > 1) return null;
          const isActive = offset === 0;
          const scale = isActive ? 1 : 0.8;
          const opacity = isActive ? 1 : 0.42;
          const z = isActive ? 30 : 10;
          return (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Gallery slide ${i + 1}`}
              className="absolute left-1/2 top-1/2 facet-lg overflow-hidden border border-white/10 shadow-[0_30px_60px_-18px_rgba(10,31,59,.5)]"
              style={{
                width: "76%",
                height: "100%",
                marginLeft: "-38%",
                marginTop: "-50%",
                transform: `translateX(${offset * 96}%) rotateY(${offset * -30}deg) scale(${scale})`,
                opacity,
                zIndex: z,
                transition: "transform .75s cubic-bezier(.16,1,.3,1), opacity .75s ease",
                cursor: isActive ? "default" : "pointer",
              }}
            >
              <SImg src={src} alt={`Papalkar Gastrocare gallery ${i + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/55 via-transparent to-transparent" />
            </button>
          );
        })}
      </div>

      <div className="flex justify-center gap-2 mt-7">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`h-1.5 rounded-full transition-all duration-400 ${i === active ? "w-8 bg-[var(--rose)]" : "w-1.5 bg-[var(--line)]"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <button onClick={() => go(active - 1)} className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-5 w-11 h-11 rounded-full bg-white shadow-xl items-center justify-center hover:bg-[var(--navy)] hover:text-white transition-all duration-400 z-40" aria-label="Previous slide">
        <Ic.arrow className="w-4 h-4 rotate-180" />
      </button>
      <button onClick={() => go(active + 1)} className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-5 w-11 h-11 rounded-full bg-white shadow-xl items-center justify-center hover:bg-[var(--navy)] hover:text-white transition-all duration-400 z-40" aria-label="Next slide">
        <Ic.arrow className="w-4 h-4" />
      </button>
    </div>
  );
}

/* ------------------------------ Data ------------------------------ */
const NAV = [
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [

{ icon: "scope", title: "Upper GI Endoscopy", short: "Examine the food pipe, stomach & duodenum", desc: "A minimally invasive procedure using a flexible camera to examine the food pipe (esophagus), stomach and the first part of the small intestine (duodenum). It helps diagnose conditions such as acidity, ulcers, bleeding, inflammation and abnormal growths.", img: dr6 },

{ icon: "spiral", title: "Colonoscopy", short: "Detailed evaluation of the large intestine", desc: "A detailed examination of the large intestine (colon) using a flexible camera. It is useful for evaluating blood in stools, constipation, diarrhoea, abdominal pain, unexplained weight loss and for early detection of colorectal polyps and cancer.", img: dr7 },

{ icon: "drop", title: "ERCP", short: "Bile duct & pancreatic duct treatment", desc: "Endoscopic Retrograde Cholangiopancreatography (ERCP) is an advanced endoscopic procedure used to diagnose and treat problems involving the bile ducts and pancreatic ducts, including stones, blockages, strictures and other abnormalities. It can often help avoid the need for major surgery.", img: dr8 },

{ icon: "target", title: "Foreign Body Removal", short: "Safe endoscopic retrieval, no surgery needed", desc: "Accidentally swallowed or lodged objects such as coins, dentures, pins, needles, bones, buttons and other foreign bodies can often be safely removed using endoscopy, helping avoid conventional surgery.", img: dr9 },

{ icon: "pulse", title: "Hematemesis / GI Bleeding", short: "Therapeutic control of GI bleeding", desc: "Upper gastrointestinal bleeding, including vomiting of blood, can be evaluated and treated through therapeutic endoscopy. Depending on the cause, bleeding can be controlled using banding, injection therapy, clipping, cautery or Argon Plasma Coagulation (APC).", img: dr10 },

{ icon: "band", title: "Variceal Banding", short: "Controls bleeding varices from liver disease", desc: "Enlarged veins (varices) in the food pipe, commonly associated with liver disease and cirrhosis, can bleed significantly. Endoscopic band ligation is used to control active bleeding and help prevent recurrent variceal bleeding.", img: dr11 },

{ icon: "expand", title: "Esophageal Dilatation", short: "Widens a narrowed food pipe", desc: "Narrowing of the food pipe (esophageal stricture) can cause difficulty or discomfort while swallowing. Endoscopic dilatation helps widen the narrowed segment and improve the passage of food.", img: dr12 },

{ icon: "tube", title: "Stenting for Malignancy", short: "Restores passage in cancer-related blockage", desc: "When cancers involving the esophagus or bile ducts cause narrowing or obstruction, an endoscopically placed stent can help restore the passage and improve the ability to swallow or relieve obstruction-related symptoms.", img: dr13 },

{ icon: "feed", title: "PEG Tube Placement", short: "Safe long-term feeding access", desc: "Percutaneous Endoscopic Gastrostomy (PEG) allows a feeding tube to be placed directly into the stomach for patients who are unable to take adequate nutrition orally. It provides a safe and convenient route for long-term enteral feeding when required.", img: dr9 },

{ icon: "cut", title: "Polypectomy", short: "Removes polyps found during colonoscopy", desc: "Polyps, or abnormal tissue growths, found during colonoscopy can often be removed endoscopically and sent for further examination. Removing certain polyps can help reduce the future risk of colorectal cancer.", img: dr14 },

{ icon: "leaf", title: "Piles Banding", short: "Minimally invasive hemorrhoid treatment", desc: "Rubber band ligation is a minimally invasive treatment for suitable cases of piles (hemorrhoids). A small band is placed around the hemorrhoid to reduce its blood supply, helping relieve bleeding, swelling and discomfort.", img: dr15 },

];

const SERVICE_TAGS = ["Upper GI Endoscopy", "Colonoscopy", "ERCP", "Foreign Body Removal", "Endoscopic Hemostasis", "Variceal Banding", "Esophageal Dilatation", "Stenting", "PEG Tube Placement", "Polypectomy", "Piles Banding"];

const TECH_HIGHLIGHTS = [
  "Olympus 170 Series endoscopy system",
  "Dedicated Upper GI Endoscopy and Colonoscopy",
  "ERCP endoscopy system",
  "High-resolution medical display",
  "Advanced image-processing technology",
  "Designed for accurate diagnosis and precise therapeutic procedures",
];

const STATS = [
  { icon: "shield", end: 1, suffix: "st", label: "Dedicated Gastro Centre in Pusad" },
  { icon: "award", end: 11, suffix: "+", label: "Advanced Endoscopic Procedures" },
  { icon: "users", end: 100, suffix: "%", label: "Patient-Centred Care" },
  { icon: "history", end: 2, suffix: "", label: "Generations of Medical Legacy" },
];

const WHY_US = [
  { icon: "award", title: "Experienced Expertise", desc: "Care rooted in a legacy of medical excellence, tracing back to Pusad's first MD Medicine specialist and pioneering endoscopist." },
  { icon: "shield", title: "Safe & Advanced Procedures", desc: "Every procedure is performed on advanced endoscopic systems, following safe, evidence-based clinical protocols." },
  { icon: "users", title: "Patient-Centred Care", desc: "Clear communication, honest guidance and compassionate support at every step of your treatment journey." },
  { icon: "monitor", title: "Modern Facilities", desc: "A purpose-built, modern centre designed exclusively for gastroenterology and advanced endoscopy." },
];

const FAQS = [
  { q: "Is Papalkar Gastrocare the first of its kind in Pusad?", a: "Yes. Papalkar Gastrocare is Pusad's first dedicated Gastroenterology Super-Specialty Centre, carrying forward the legacy of Papalkar Nursing Home and Dr. Viren Papalkar, the city's first MD Medicine specialist and the physician who introduced endoscopy to Pusad." },
  { q: "Are endoscopy and colonoscopy safe procedures?", a: "Yes. Both are well-established, routinely performed diagnostic and therapeutic procedures, carried out on advanced endoscopic systems under proper monitoring for patient safety and comfort." },
  { q: "What is ERCP used for?", a: "ERCP (Endoscopic Retrograde Cholangiopancreatography) is used to diagnose and treat problems involving the bile ducts and pancreatic ducts, such as stones, blockages and strictures — often helping patients avoid major surgery." },
  { q: "How can I book an appointment?", a: "You can call or WhatsApp us directly, or simply tap any 'Book Appointment' button on this page to message our team on WhatsApp instantly." },
];

/* ============================================================================
   MAIN APP
   ========================================================================== */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [heroMouse, setHeroMouse] = useState({ x: 50, y: 50 });
  const [activeService, setActiveService] = useState(null);

  // quick request form
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formConcern, setFormConcern] = useState("General Consultation");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setShowTop(window.scrollY > 700);
      const h = document.documentElement;
      const pct = h.scrollHeight > h.clientHeight ? (window.scrollY / (h.scrollHeight - h.clientHeight)) * 100 : 0;
      setScrollPct(pct);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll while the service modal is open
  useEffect(() => {
    document.body.style.overflow = activeService !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeService]);

  // close modal on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setActiveService(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onHeroMove = useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setHeroMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  }, []);

  const submitRequest = (e) => {
    e.preventDefault();
    const msg = `Hi, I would like to request a callback from Papalkar Gastrocare.\nName: ${formName || "-"}\nPhone: ${formPhone || "-"}\nConcern: ${formConcern}`;
    window.open(waLink(msg), "_blank", "noreferrer");
  };

  return (
    <div className="font-body text-[var(--ink)] bg-[var(--cream)] antialiased overflow-x-hidden">
      <GlobalStyle />
      <div className="grain-overlay" />
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />

      {/* ================= TOP UTILITY BAR ================= */}
      <div className="hidden md:block bg-[var(--navy)] text-white/80 text-[13px]">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href={`tel:${PHONE_1_TEL}`} className="flex items-center gap-2 hover:text-[var(--gold)] transition-colors">
              <Ic.phone className="w-3.5 h-3.5" /> {PHONE_1_DISPLAY}
            </a>
            <a href={`tel:${PHONE_2_TEL}`} className="flex items-center gap-2 hover:text-[var(--gold)] transition-colors">
              <Ic.phone className="w-3.5 h-3.5" /> {PHONE_2_DISPLAY}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Ic.pin className="w-3.5 h-3.5" />
            Pusad, District Yavatmal, Maharashtra
          </div>
        </div>
      </div>

      {/* ================= NAVBAR ================= */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/85 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(10,31,59,.25)]" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <a href="#home" className="flex items-center gap-3 group">
            <span className="relative w-19 h-14 flex items-center justify-center">
              <img
                src={logopapa}
                alt="Logo"
                className="relative w-29 h-20 object-contain"
              />            </span>
            <span className="leading-tight">
              <span className={`block font-display font-semibold text-[24px] tracking-tight ${scrolled ? "text-[var(--navy)]" : ""}`}>Papalkar</span>
              <span className={`block text-[15px] tracking-[0.18em] uppercase ${scrolled ? "text-[var(--slate)]" : ""}`}>Gastrocare · Pusad</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-6">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className={`text-[14px] font-medium tracking-wide transition-colors relative group ${scrolled ? "text-[var(--ink)] hover:text-[var(--rose)]" : ""}`}>
                {n.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[var(--rose)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Magnetic>
              <a href={APPOINTMENT_LINK} target="_blank" rel="noreferrer" className="facet-btn inline-flex items-center gap-2 bg-[var(--rose)] hover:bg-[var(--rose2)] text-white text-[14px] font-semibold px-6 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-8px_rgba(200,17,85,.6)]">
                Book Appointment <Ic.arrow className="w-4 h-4" />
              </a>
            </Magnetic>
          </div>

          <button onClick={() => setMenuOpen(true)} className={`lg:hidden p-2 ${scrolled ? "text-[var(--navy)]" : "text-white"}`} aria-label="Open menu">
            <Ic.menu className="w-7 h-7" />
          </button>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      <div className={`fixed inset-0 z-[60] transition-all duration-400 ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div onClick={() => setMenuOpen(false)} className={`absolute inset-0 bg-[var(--navy)]/60 backdrop-blur-sm transition-opacity duration-400 ${menuOpen ? "opacity-100" : "opacity-0"}`} />
        <div className={`absolute right-0 top-0 h-full w-[82%] max-w-sm bg-white transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${menuOpen ? "translate-x-0" : "translate-x-full"} flex flex-col`}>
          <div className="flex items-center justify-between px-6 h-20 border-b border-[var(--line)]">
            <span className="font-display font-semibold text-lg text-[var(--navy)]">Papalkar</span>
            <button onClick={() => setMenuOpen(false)} className="p-2 text-[var(--navy)]"><Ic.close className="w-6 h-6" /></button>
          </div>
          <nav className="flex flex-col gap-1 px-6 py-8 overflow-y-auto">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="py-3 text-[16px] font-medium text-[var(--ink)] border-b border-[var(--line)] flex items-center justify-between group">
                {n.label} <Ic.arrow className="w-4 h-4 text-[var(--rose)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </nav>
          <div className="mt-auto px-6 pb-10">
            <a href={APPOINTMENT_LINK} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)} className="facet-btn w-full flex items-center justify-center gap-2 bg-[var(--rose)] text-white font-semibold px-6 py-4">
              Book Appointment <Ic.arrow className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* ================= HERO ================= */}
      <section id="home" onMouseMove={onHeroMove} className="relative min-h-[100svh] grain-gradient overflow-hidden flex items-center pt-28 pb-24 lg:pt-20 lg:pb-16">
        {/* faceted rings replace the old blurred blob circles */}
        <FacetRing className="-top-16 -left-16" size={300} tone="gold" opacity={0.14} />
        <FacetRing className="bottom-0 right-0" size={220} tone="rose" rev opacity={0.16} />
        {/* cursor glow */}
        <div className="pointer-events-none absolute inset-0 transition-all duration-300" style={{ background: `radial-gradient(500px circle at ${heroMouse.x}% ${heroMouse.y}%, rgba(255,255,255,.06), transparent 60%)` }} />

        {/* faceted decorative outlines */}
        <div className="hidden lg:block absolute top-24 right-[8%] w-24 h-24 border border-[var(--gold)]/30 facet-md" style={{ animation: "floatY 6s ease-in-out infinite" }} />
        <div className="hidden lg:block absolute bottom-32 left-[6%] w-16 h-16 border border-white/20 facet-sm" style={{ animation: "floatY2 5s ease-in-out infinite" }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          {/* left copy */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-[var(--gold)] border border-[var(--gold)]/40 px-4 py-2 facet-sm">
                <Ic.shield className="w-3.5 h-3.5" /> Pusad's First Gastroenterology Super-Specialty Centre
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="font-display text-white font-semibold text-[40px] sm:text-[52px] lg:text-[62px] leading-[1.06] mt-6">
                A Legacy of Care.<br />
                <span className="shimmer-text">A New Era in Gastroenterology.</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-white/70 text-[16px] sm:text-[17px] leading-relaxed mt-6 max-w-lg">
                Papalkar Gastrocare brings advanced diagnostic and therapeutic endoscopy to Pusad — carrying forward the legacy of Papalkar Nursing Home with modern, patient-first gastroenterology care.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="flex flex-wrap items-center gap-4 mt-9">
                <Magnetic>
                  <a href={APPOINTMENT_LINK} target="_blank" rel="noreferrer" className="facet-btn group inline-flex items-center gap-2 bg-[var(--rose)] hover:bg-[var(--rose2)] text-white font-semibold px-7 py-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_-10px_rgba(200,17,85,.65)]">
                    Book Appointment <Ic.arrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Magnetic>
                <a href={`tel:${PHONE_1_TEL}`} className="inline-flex items-center gap-2 text-white font-medium px-2 py-4 border-b border-white/30 hover:border-white transition-colors">
                  <Ic.phone className="w-4 h-4" /> Call Now
                </a>
              </div>
            </Reveal>

            {/* trust mini stats */}
            <Reveal delay={400}>
              <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10">
                {STATS.slice(0, 3).map((s, i) => (
                  <div key={i}>
                    <p className="font-display text-white text-3xl font-semibold"><CountUp end={s.end} suffix={s.suffix} /></p>
                    <p className="text-white/55 text-[12.5px] mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* right visual */}
          <div className="relative">
            <Halo>
              <Tilt max={7} scale={1.02} className="facet-lg overflow-hidden shadow-[0_40px_70px_-20px_rgba(0,0,0,.55)] border border-white/10">
                <SImg
                  src={IMG.hero}
                  alt="Papalkar Gastrocare — hospital reception"
                  className="w-full h-[420px] sm:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/70 via-transparent to-transparent" />
              </Tilt>
            </Halo>

            <Tilt max={11} className="facet-md absolute -left-6 sm:-left-10 bottom-8 bg-white/95 backdrop-blur px-6 py-5 shadow-2xl w-[230px] z-[2]">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-full bg-[var(--rose-soft)] flex items-center justify-center">
                  <Ic.award className="w-5 h-5 text-[var(--rose)]" />
                </span>
                <div>
                  <p className="font-display font-semibold text-[var(--navy)] text-xl leading-none"><CountUp end={1} suffix="st" /></p>
                  <p className="text-[11px] text-[var(--slate)] mt-1">Gastro Centre in Pusad</p>
                </div>
              </div>
            </Tilt>

            <a href={APPOINTMENT_LINK} target="_blank" rel="noreferrer">
              <Tilt max={11} className="facet-md absolute -right-4 sm:-right-8 -top-6 bg-[#1ea952] px-5 py-4 shadow-2xl w-[190px] z-[2] cursor-pointer" style={{ animation: "floatY 5s ease-in-out infinite" }}>
                <div className="flex items-center gap-2 mb-1">
                  <Ic.whatsapp className="w-5 h-5 text-white" />
                  <span className="text-white text-[12px] font-semibold tracking-wide uppercase">Chat Now</span>
                </div>
                <p className="text-white/90 text-[12.5px] leading-snug flex items-center gap-1">Book via WhatsApp <Ic.arrow className="w-3.5 h-3.5" /></p>
              </Tilt>
            </a>
          </div>
        </div>

        {/* scroll cue */}
        <a href="#about" className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/50">
          <span className="text-[11px] tracking-[0.2em] uppercase">Scroll</span>
          <span className="w-[1px] h-10 bg-white/30 relative overflow-hidden">
            <span className="hero-scroll-dot absolute w-1 h-1 rounded-full bg-[var(--gold)] left-1/2 -translate-x-1/2" />
          </span>
        </a>
      </section>

      {/* ================= SERVICE TAGS MARQUEE ================= */}
      <div className="bg-[var(--navy)] py-4 overflow-hidden border-y border-white/5">
        <div className="flex whitespace-nowrap marquee-track">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex items-center shrink-0">
              {SERVICE_TAGS.map((t, i) => (
                <span key={i} className="mx-8 text-white/60 text-[13px] tracking-wide flex items-center gap-8">
                  {t} <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ================= ABOUT — with premium 3D coverflow gallery ================= */}
      <section id="about" className="py-24 lg:py-32 bg-[var(--paper)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* 3D coverflow gallery */}
          <Reveal className="relative order-2 lg:order-1">
            <Coverflow3D images={GALLERY} height={420} />
            <Tilt max={8} className="facet-md hidden sm:flex absolute -bottom-8 -right-2 sm:-right-6 bg-white shadow-2xl px-6 py-5 items-center gap-3 w-[240px] z-[2]">
              <span className="w-11 h-11 rounded-full bg-[var(--gold-soft)] flex items-center justify-center shrink-0">
                <Ic.history className="w-5 h-5 text-[var(--gold)]" />
              </span>
              <p className="text-[12.5px] text-[var(--slate)] leading-snug">Carrying forward the legacy of <b className="text-[var(--navy)]">Papalkar Nursing Home</b></p>
            </Tilt>
          </Reveal>

          {/* copy */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-[var(--rose)] font-semibold">
                <span className="w-6 h-[2px] bg-[var(--rose)]" /> About Papalkar Gastrocare
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-display font-semibold text-[var(--navy)] text-[34px] sm:text-[42px] leading-tight mt-4">
                Pusad's First Dedicated Gastroenterology Super-Specialty Centre
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-[var(--slate)] leading-relaxed mt-5">
                Papalkar Gastrocare offers comprehensive care for gastrointestinal and liver disorders, along with advanced diagnostic and therapeutic endoscopic procedures — carrying forward the legacy of Papalkar Nursing Home, established by Dr. Viren Papalkar, one of Pusad's pioneering physicians and the city's first MD Medicine specialist.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <p className="text-[var(--slate)] leading-relaxed mt-4">
                Dr. Papalkar was also the first physician in Pusad to introduce endoscopy services, marking an important milestone in the evolution of gastrointestinal care in the region. Today, that legacy continues through a modern, purpose-built centre offering upper GI endoscopy, colonoscopy, ERCP and other advanced therapeutic endoscopic procedures.
              </p>
            </Reveal>
            <Reveal delay={320}>
              <p className="font-display italic text-[var(--navy)] text-[17px] mt-5">"A legacy of medical excellence. A new era in gastroenterology."</p>
            </Reveal>
            <Reveal delay={380}>
              <ul className="grid sm:grid-cols-2 gap-4 mt-8">
                {WHY_US.map((t, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14.5px] text-[var(--ink)]">
                    <span className="w-6 h-6 rounded-full bg-[var(--rose-soft)] flex items-center justify-center shrink-0 mt-0.5">
                      <Ic.check className="w-3.5 h-3.5 text-[var(--rose)]" />
                    </span>
                    {t.title}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={440}>
              <a href="#services" className="facet-btn inline-flex items-center gap-2 bg-[var(--navy)] hover:bg-[var(--navy3)] text-white font-semibold px-7 py-4 mt-9 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_-10px_rgba(10,31,59,.5)]">
                Explore Our Services <Ic.arrow className="w-4 h-4" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>




      {/* ================= SERVICES — responsive 4-column grid, cards reveal one by one ================= */}
      <section id="services" className="py-24 lg:py-32 bg-[var(--cream)] relative overflow-hidden">
        <FacetRing className="top-10 -right-20" size={260} tone="rose" opacity={0.12} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <Reveal className="max-w-2xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-[var(--rose)] font-semibold justify-center">
              <span className="w-6 h-[2px] bg-[var(--rose)]" /> Services Offered <span className="w-6 h-[2px] bg-[var(--rose)]" />
            </span>
            <h2 className="font-display font-semibold text-[var(--navy)] text-[32px] sm:text-[42px] leading-tight mt-4">
              Comprehensive Diagnostic &amp; Therapeutic Care
            </h2>
            <p className="text-[var(--slate)] mt-4">Eleven specialized gastroenterology &amp; endoscopy procedures, with a focus on advanced, minimally invasive treatment.</p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 mt-14">
            {SERVICES.map((s, i) => (
              <Reveal key={i} delay={i * 90}>
                <Tilt max={7} scale={1.02} glare={false} className="h-full">
                  <div className="shine facet-md bg-white h-full flex flex-col shadow-[0_18px_42px_-20px_rgba(10,31,59,.28)] border border-[var(--line)] overflow-hidden transition-shadow duration-500 hover:shadow-[0_28px_60px_-18px_rgba(200,17,85,.3)]">
                    <button
                      type="button"
                      onClick={() => setActiveService(i)}
                      className="relative h-44 overflow-hidden shrink-0 text-left w-full"
                      aria-label={`Read more about ${s.title}`}
                    >
                      <SImg src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/80 via-[var(--navy)]/5 to-transparent" />
                      <span className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
                        {React.createElement(Ic[s.icon], { className: "w-4 h-4 text-[var(--rose)]" })}
                      </span>
                      <span className="absolute top-3 right-4 font-display text-white/25 text-3xl font-bold select-none">{String(i + 1).padStart(2, "0")}</span>
                    </button>
                    <div className="p-6 flex flex-col grow">
                      <h3 className="font-display font-semibold text-[var(--navy)] text-[16.5px] leading-snug">{s.title}</h3>
                      <p className="text-[13px] text-[var(--slate)] leading-relaxed mt-2 grow">{s.short}</p>
                      <div className="flex items-center justify-between gap-3 mt-4 pt-4 border-t border-[var(--line)]">
                        <button
                          type="button"
                          onClick={() => setActiveService(i)}
                          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--navy)] group/link"
                        >
                          Read More <Ic.arrow className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                        </button>
                        <a href={waLink(`Hi, I would like to book an appointment for ${s.title} at Papalkar Gastrocare.`)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--rose)] group/link">
                          Book Now <Ic.arrow className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SERVICE DETAIL MODAL — premium read-more with image ================= */}
      {activeService !== null && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
          <div
            onClick={() => setActiveService(null)}
            className="absolute inset-0 bg-[var(--navy)]/72 backdrop-blur-sm"
            style={{ animation: "fadeIn .3s ease" }}
          />
          <div
            className="relative facet-lg bg-white w-full max-w-2xl max-h-[88vh] overflow-y-auto shadow-[0_40px_90px_-20px_rgba(10,31,59,.55)] scrollbar-hide"
            style={{ animation: "fadeUp .45s cubic-bezier(.22,1,.36,1)" }}
          >
            <button
              onClick={() => setActiveService(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/95 flex items-center justify-center shadow-lg text-[var(--navy)] hover:bg-[var(--rose)] hover:text-white transition-colors duration-300"
              aria-label="Close"
            >
              <Ic.close className="w-5 h-5" />
            </button>

            <div className="relative h-60 sm:h-72 overflow-hidden">
              <SImg src={SERVICES[activeService].img} alt={SERVICES[activeService].title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/85 via-[var(--navy)]/15 to-transparent" />
              <div className="absolute bottom-5 left-6 right-16 flex items-center gap-3">
                <span className="w-12 h-12 rounded-full bg-white/95 flex items-center justify-center shadow-lg shrink-0">
                  {React.createElement(Ic[SERVICES[activeService].icon], { className: "w-5 h-5 text-[var(--rose)]" })}
                </span>
                <span className="font-display font-semibold text-white text-2xl sm:text-3xl leading-tight">{SERVICES[activeService].title}</span>
              </div>
            </div>

            <div className="p-7 sm:p-9">
              <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[var(--rose)] font-semibold">
                <span className="w-5 h-[2px] bg-[var(--rose)]" /> Procedure Overview
              </span>
              <p className="text-[15px] text-[var(--slate)] leading-relaxed mt-4">{SERVICES[activeService].desc}</p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Magnetic>
                  <a
                    href={waLink(`Hi, I would like to book an appointment for ${SERVICES[activeService].title} at Papalkar Gastrocare.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="facet-btn inline-flex items-center gap-2 bg-[var(--rose)] hover:bg-[var(--rose2)] text-white font-semibold px-7 py-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_-10px_rgba(200,17,85,.6)]"
                  >
                    Book Appointment <Ic.arrow className="w-4 h-4" />
                  </a>
                </Magnetic>
                <button
                  onClick={() => setActiveService(null)}
                  className="inline-flex items-center gap-2 text-[var(--navy)] font-medium px-2 py-4 border-b border-[var(--line)] hover:border-[var(--navy)] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ADVANCED TECHNOLOGY & FACILITIES ================= */}
      <section id="technology" className="py-24 lg:py-32 bg-[var(--paper)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <Halo soft>
              <Tilt max={8} scale={1.02} className="facet-lg relative shadow-[0_30px_60px_-20px_rgba(10,31,59,.3)]">
                <SImg src={IMG.technology} alt="Advanced diagnostic technology at Papalkar Gastrocare" className="w-full h-[700px] sm:h-[700px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/70 via-transparent to-transparent" />
                <span className="absolute top-6 left-6 facet-sm bg-white/95 px-4 py-2 flex items-center gap-2">
                  <Ic.monitor className="w-4 h-4 text-[var(--rose)]" />
                  <span className="text-[12px] font-semibold text-[var(--navy)]">Olympus 170 Series</span>
                </span>
                <span className="absolute bottom-6 left-6 right-6 text-white text-[12.5px] leading-snug">
                  Advanced Olympus 170 Series Endoscopy System — high-quality imaging technology for precise diagnostic and therapeutic endoscopy.
                </span>
              </Tilt>
            </Halo>
          </Reveal>

          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-[var(--rose)] font-semibold">
                <span className="w-6 h-[2px] bg-[var(--rose)]" /> Advanced Technology &amp; Facilities
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-display font-semibold text-[var(--navy)] text-[30px] sm:text-[38px] leading-tight mt-4">
                Olympus 170 Series Endoscopy System
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-[var(--slate)] leading-relaxed mt-5">
                At Papalkar Gastrocare, we use an advanced Olympus 170 Series endoscopy platform, equipped with high-quality imaging technology and a dedicated medical-grade display for detailed visualization of the gastrointestinal tract.
              </p>
            </Reveal>
            <Reveal delay={280}>
              <p className="text-[var(--slate)] leading-relaxed mt-4">
                The system supports Upper GI Endoscopy, Colonoscopy and ERCP — enabling high-quality diagnostic visualization as well as a wide range of therapeutic endoscopic procedures.
              </p>
            </Reveal>

            <Reveal delay={360}>
              <p className="text-[12px] tracking-[0.2em] uppercase text-[var(--navy)] font-semibold mt-8 mb-4">Technology Highlights</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {TECH_HIGHLIGHTS.map((t, i) => (
                  <div key={i} className="facet-sm flex items-center gap-3 bg-[var(--cream)] px-4 py-3 border border-[var(--line)] transition-all duration-300 hover:border-[var(--rose)]/40 hover:-translate-y-0.5">
                    <Ic.check className="w-4 h-4 text-[var(--rose)] shrink-0" />
                    <span className="text-[13px] font-medium text-[var(--navy)] leading-snug">{t}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={440}>
              <a href={OLYMPUS_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--rose)] mt-8 group/link">
                Explore Olympus Endoscopy Technology
                <Ic.link className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-20 bg-[var(--navy)] relative overflow-hidden">
        <FacetRing className="top-0 left-1/3" size={240} tone="rose" opacity={0.14} />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 100} className="text-center border-r border-white/10 last:border-r-0">
              <Tilt max={9} className="inline-block">
                <span className="w-14 h-14 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  {React.createElement(Ic[s.icon], { className: "w-6 h-6 text-[var(--gold)]" })}
                </span>
              </Tilt>
              <p className="font-display text-white text-[34px] sm:text-[40px] font-semibold"><CountUp end={s.end} suffix={s.suffix} /></p>
              <p className="text-white/55 text-[13px] mt-1 tracking-wide">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= LEGACY ================= */}
      <section id="legacy" className="py-24 lg:py-32 bg-[var(--paper)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[0.85fr_1.15fr] gap-16 items-center">
          <Reveal>
            <Halo>
              <Tilt max={8} scale={1.02} className="facet-lg relative shadow-[0_35px_65px_-20px_rgba(10,31,59,.35)]">
                <SImg src={IMG.legacy} alt="Papalkar Gastrocare — legacy of care" className="w-full h-[440px] sm:h-[550px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-display text-white text-2xl font-semibold">Papalkar Nursing Home</p>
                  <p className="text-[var(--gold)] text-[13px] mt-1">Founded by Dr. Viren Papalkar</p>
                </div>
              </Tilt>
            </Halo>
          </Reveal>

          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-[var(--rose)] font-semibold">
                <span className="w-6 h-[2px] bg-[var(--rose)]" /> The Papalkar Legacy
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-display font-semibold text-[var(--navy)] text-[32px] sm:text-[40px] leading-tight mt-4">
                A Legacy Carried Forward
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-[var(--slate)] leading-relaxed mt-5">
                Papalkar Gastrocare carries forward the legacy of Papalkar Nursing Home, established by Dr. Viren Papalkar — one of Pusad's pioneering physicians and the city's first MD Medicine specialist. He was also the first physician in Pusad to introduce endoscopy services, marking an important milestone in the evolution of gastrointestinal care in the region.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <p className="text-[var(--slate)] leading-relaxed mt-4">
                Today, this legacy continues through Papalkar Gastrocare — a modern, purpose-built centre dedicated to gastroenterology and advanced endoscopy, bringing contemporary clinical expertise closer to patients in Pusad and the surrounding region.
              </p>
            </Reveal>
            <Reveal delay={400}>
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                {["Founder, Papalkar Nursing Home", "Pusad's First MD Medicine Specialist", "Pioneer of Endoscopy in Pusad", "Continued Today by Papalkar Gastrocare"].map((t, i) => (
                  <div key={i} className="facet-sm flex items-center gap-3 bg-[var(--cream)] px-4 py-3 border border-[var(--line)] transition-all duration-300 hover:border-[var(--rose)]/40 hover:-translate-y-0.5">
                    <Ic.check className="w-4 h-4 text-[var(--rose)] shrink-0" />
                    <span className="text-[13.5px] font-medium text-[var(--navy)]">{t}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={500}>
              <Magnetic>
                <a href={APPOINTMENT_LINK} target="_blank" rel="noreferrer" className="facet-btn inline-flex items-center gap-2 bg-[var(--rose)] hover:bg-[var(--rose2)] text-white font-semibold px-7 py-4 mt-9 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_-10px_rgba(200,17,85,.6)]">
                  Book a Consultation <Ic.arrow className="w-4 h-4" />
                </a>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= QUICK CONNECT BANNER ================= */}
      <section className="py-20 grain-gradient relative overflow-hidden">
        <FacetRing className="-bottom-16 -right-10" size={280} tone="gold" rev opacity={0.16} />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Reveal className="facet-lg bg-white/[0.06] backdrop-blur border border-white/10 px-8 py-12 sm:px-14 sm:py-14 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-[var(--gold)] font-semibold">
                <Ic.pulse className="w-4 h-4" /> Direct &amp; Instant
              </span>
              <h3 className="font-display text-white font-semibold text-[28px] sm:text-[34px] leading-tight mt-4">
                Talk to Our Team in Seconds
              </h3>
              <p className="text-white/65 mt-4 leading-relaxed max-w-md">
                No waiting on hold. Message us directly on WhatsApp or call us to check availability and book your consultation at Papalkar Gastrocare.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Magnetic>
                  <a href={APPOINTMENT_LINK} target="_blank" rel="noreferrer" className="facet-btn inline-flex items-center gap-2 bg-[#1ea952] hover:bg-[#17a047] text-white font-semibold px-7 py-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_-10px_rgba(30,169,82,.6)]">
                    <Ic.whatsapp className="w-4 h-4" /> Chat on WhatsApp
                  </a>
                </Magnetic>
                <a href={`tel:${PHONE_1_TEL}`} className="inline-flex items-center gap-2 text-white font-medium px-2 py-4 border-b border-white/30 hover:border-white transition-colors">
                  <Ic.phone className="w-4 h-4" /> Call Now
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Tilt max={10} className="facet-md bg-white/95 flex items-center gap-4 px-6 py-5 shadow-2xl">
                <span className="w-11 h-11 rounded-full bg-[var(--rose-soft)] flex items-center justify-center shrink-0"><Ic.phone className="w-5 h-5 text-[var(--rose)]" /></span>
                <div>
                  <p className="text-[11px] tracking-[0.15em] uppercase text-[var(--slate)]">Call Us</p>
                  <a href={`tel:${PHONE_1_TEL}`} className="font-display font-semibold text-[var(--navy)] text-[17px] block hover:text-[var(--rose)] transition-colors">{PHONE_1_DISPLAY}</a>
                  <a href={`tel:${PHONE_2_TEL}`} className="font-display font-semibold text-[var(--navy)] text-[17px] block hover:text-[var(--rose)] transition-colors">{PHONE_2_DISPLAY}</a>
                </div>
              </Tilt>
              <Tilt max={10} className="facet-md bg-white/95 flex items-center gap-4 px-6 py-5 shadow-2xl">
                <span className="w-11 h-11 rounded-full bg-[var(--gold-soft)] flex items-center justify-center shrink-0"><Ic.pin className="w-5 h-5 text-[var(--gold)]" /></span>
                <div>
                  <p className="text-[11px] tracking-[0.15em] uppercase text-[var(--slate)]">Visit Us</p>
                  <p className="text-[13px] text-[var(--navy)] font-medium leading-snug mt-0.5">Talao layout along with Papalkar heights – 445204</p>
                </div>
              </Tilt>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section id="why-us" className="py-24 lg:py-32 bg-[var(--cream)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="max-w-2xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-[var(--rose)] font-semibold justify-center">
              <span className="w-6 h-[2px] bg-[var(--rose)]" /> Why Choose Us <span className="w-6 h-[2px] bg-[var(--rose)]" />
            </span>
            <h2 className="font-display font-semibold text-[var(--navy)] text-[32px] sm:text-[42px] leading-tight mt-4">
              Why Papalkar Gastrocare?
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {WHY_US.map((w, i) => (
              <Reveal key={i} delay={i * 100}>
                <Tilt max={10} className="h-full">
                  <div className="shine facet-md bg-white p-8 h-full shadow-[0_20px_45px_-20px_rgba(10,31,59,.25)] border border-[var(--line)] transition-shadow duration-300 hover:shadow-[0_30px_60px_-15px_rgba(200,17,85,.25)]">
                    <span className="w-14 h-14 rounded-full bg-[var(--rose-soft)] flex items-center justify-center mb-6">
                      {React.createElement(Ic[w.icon], { className: "w-6 h-6 text-[var(--rose)]" })}
                    </span>
                    <h3 className="font-display font-semibold text-[var(--navy)] text-[19px] leading-snug">{w.title}</h3>
                    <p className="text-[13.5px] text-[var(--slate)] leading-relaxed mt-3">{w.desc}</p>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="py-24 lg:py-32 bg-[var(--paper)]">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal className="text-center max-w-xl mx-auto">
            <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-[var(--rose)] font-semibold justify-center">
              <span className="w-6 h-[2px] bg-[var(--rose)]" /> FAQ <span className="w-6 h-[2px] bg-[var(--rose)]" />
            </span>
            <h2 className="font-display font-semibold text-[var(--navy)] text-[32px] sm:text-[40px] leading-tight mt-4">Common Questions</h2>
          </Reveal>

          <div className="mt-14 space-y-4">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={i} delay={i * 80} className="facet-sm bg-[var(--cream)] border border-[var(--line)] overflow-hidden">
                  <button onClick={() => setOpenFaq(open ? -1 : i)} className="w-full flex items-center justify-between gap-4 px-6 sm:px-8 py-5 sm:py-6 text-left">
                    <span className="font-display font-medium text-[var(--navy)] text-[16px] sm:text-[18px]">{f.q}</span>
                    <span className={`w-8 h-8 rounded-full border border-[var(--rose)]/40 flex items-center justify-center shrink-0 transition-transform duration-400 ${open ? "bg-[var(--rose)] border-[var(--rose)] rotate-180" : ""}`}>
                      {open ? <Ic.minus className="w-3.5 h-3.5 text-white" /> : <Ic.plus className="w-3.5 h-3.5 text-[var(--rose)]" />}
                    </span>
                  </button>
                  <div className={`accordion-body ${open ? "open" : ""}`}>
                    <div>
                      <p className="text-[var(--slate)] leading-relaxed px-6 sm:px-8 pb-6 sm:pb-7">{f.a}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={200} className="text-center mt-14">
            <a href={APPOINTMENT_LINK} target="_blank" rel="noreferrer" className="facet-btn inline-flex items-center gap-2 bg-[var(--navy)] hover:bg-[var(--navy3)] text-white font-semibold px-8 py-4 transition-all duration-300 hover:-translate-y-1">
              Get Appointment <Ic.arrow className="w-4 h-4" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ================= CONTACT / CTA ================= */}
      <section id="contact" className="py-24 lg:py-28 grain-gradient relative overflow-hidden">
        <FacetRing className="top-0 right-10" size={240} tone="rose" opacity={0.15} />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Reveal className="facet-lg bg-white p-9 sm:p-14 grid lg:grid-cols-[1.1fr_0.9fr] gap-12">
            <div>
              <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-[var(--rose)] font-semibold">
                <span className="w-6 h-[2px] bg-[var(--rose)]" /> Get In Touch
              </span>
              <h2 className="font-display font-semibold text-[var(--navy)] text-[30px] sm:text-[38px] leading-tight mt-4">
                Ready to Feel Better? <br className="hidden sm:block" /> Book Your Consultation Today
              </h2>
              <p className="text-[var(--slate)] mt-5 leading-relaxed max-w-md">
                Reach out by phone or WhatsApp — our team responds quickly and will help you find the right slot at Papalkar Gastrocare.
              </p>

              <div className="space-y-5 mt-9">
                <div className="flex items-start gap-4">
                  <span className="w-11 h-11 rounded-full bg-[var(--rose-soft)] flex items-center justify-center shrink-0"><Ic.pin className="w-5 h-5 text-[var(--rose)]" /></span>
                  <p className="text-[14.5px] text-[var(--ink)] leading-relaxed">
                    {ADDRESS_LINES.map((l, i) => (<span key={i} className="block">{l}</span>))}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-11 h-11 rounded-full bg-[var(--rose-soft)] flex items-center justify-center shrink-0"><Ic.phone className="w-5 h-5 text-[var(--rose)]" /></span>
                  <div className="flex flex-col">
                    <a href={`tel:${PHONE_1_TEL}`} className="text-[14.5px] text-[var(--ink)] font-medium hover:text-[var(--rose)] transition-colors">{PHONE_1_DISPLAY}</a>
                    <a href={`tel:${PHONE_2_TEL}`} className="text-[14.5px] text-[var(--ink)] font-medium hover:text-[var(--rose)] transition-colors">{PHONE_2_DISPLAY}</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-11 h-11 rounded-full bg-[var(--rose-soft)] flex items-center justify-center shrink-0"><Ic.whatsapp className="w-5 h-5 text-[var(--rose)]" /></span>
                  <a href={APPOINTMENT_LINK} target="_blank" rel="noreferrer" className="text-[14.5px] text-[var(--ink)] font-medium hover:text-[var(--rose)] transition-colors">Message us on WhatsApp</a>
                </div>
              </div>
            </div>

            {/* quick request form -> opens WhatsApp with details filled in */}
            <form onSubmit={submitRequest} className="bg-[var(--cream)] facet-md p-7 sm:p-8 space-y-4 h-fit">
              <p className="font-display font-semibold text-[var(--navy)] text-lg">Request a Callback</p>
              <input value={formName} onChange={(e) => setFormName(e.target.value)} type="text" placeholder="Your Name" className="w-full bg-white border border-[var(--line)] px-4 py-3.5 text-[14px] outline-none focus:border-[var(--rose)] transition-colors" />
              <input value={formPhone} onChange={(e) => setFormPhone(e.target.value)} type="tel" placeholder="Phone Number" className="w-full bg-white border border-[var(--line)] px-4 py-3.5 text-[14px] outline-none focus:border-[var(--rose)] transition-colors" />
              <select value={formConcern} onChange={(e) => setFormConcern(e.target.value)} className="w-full bg-white border border-[var(--line)] px-4 py-3.5 text-[14px] outline-none focus:border-[var(--rose)] transition-colors text-[var(--slate)]">
                <option>General Consultation</option>
                <option>Upper GI Endoscopy</option>
                <option>Colonoscopy</option>
                <option>ERCP</option>
                <option>Other GI / Liver Concern</option>
              </select>
              <Magnetic className="block w-full">
                <button type="submit" className="facet-btn w-full flex items-center justify-center gap-2 bg-[var(--rose)] hover:bg-[var(--rose2)] text-white font-semibold px-6 py-4 transition-all duration-300 hover:-translate-y-0.5">
                  <Ic.whatsapp className="w-4 h-4" /> Send via WhatsApp
                </button>
              </Magnetic>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ================= ULTRA PREMIUM FOOTER ================= */}
      <footer
        className="relative overflow-hidden bg-[var(--navy)] pt-20 pb-8"
        style={{
          background:
            "radial-gradient(circle at 15% 20%, rgba(57,78,112,0.16), transparent 32%), radial-gradient(circle at 85% 25%, rgba(214,93,118,0.06), transparent 28%), var(--navy)",
        }}
      >
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-14 lg:gap-20">
            {/* ================= BRAND ================= */}
            <div className="group">
              <a href="#home" className="inline-flex items-center gap-4 mb-6">
                <span className="relative flex h-25 w-18 items-center justify-center">
                  <img
                    src={logopapa}
                    alt="Logo"
                    className="relative w-35 h-21 object-contain"
                  />                </span>
                <span className="flex flex-col">
                  <span className="font-display font-semibold text-white text-[26px] leading-none tracking-tight">Papalkar</span>
                  <span className="mt-1 text-[15px] uppercase tracking-[0.24em] text-white/45">Gastrocare</span>
                </span>
              </a>

              <p className="max-w-sm text-[14px] leading-7 text-white/55">
                Pusad's first dedicated Gastroenterology Super-Specialty Centre — carrying forward the legacy of Papalkar Nursing Home into a new era of gastroenterology care.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <span className="h-px w-10 bg-gradient-to-r from-[var(--rose)] to-transparent" />
                <span className="text-[10px] uppercase tracking-[0.28em] text-white/35">Trusted Care</span>
              </div>

              <div className="mt-7 flex items-center gap-3">
                <a
                  href={`tel:${PHONE_1_TEL}`}
                  aria-label="Call Papalkar Gastrocare"
                  className="group/icon relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.025] text-white/65 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[var(--rose)] hover:bg-[var(--rose)] hover:text-white hover:shadow-[0_12px_30px_rgba(214,93,118,0.25)]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover/icon:translate-x-full" />
                  <Ic.phone className="relative z-10 h-[17px] w-[17px]" />
                </a>
                <a
                  href={APPOINTMENT_LINK}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp Papalkar Gastrocare"
                  className="group/icon relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.025] text-white/65 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[#1ea952] hover:bg-[#1ea952] hover:text-white hover:shadow-[0_12px_30px_rgba(30,169,82,0.22)]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover/icon:translate-x-full" />
                  <Ic.whatsapp className="relative z-10 h-[17px] w-[17px]" />
                </a>
              </div>
            </div>

            {/* ================= QUICK LINKS ================= */}
            <div className="lg:pl-8">
              <div className="mb-6">
                <p className="font-display text-[17px] font-semibold text-white">Quick Links</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="h-[2px] w-8 rounded-full bg-[var(--rose)]" />
                  <span className="h-px w-5 bg-white/10" />
                </div>
              </div>

              <ul className="space-y-1">
                {NAV.map((n, index) => (
                  <li key={n.href}>
                    <a href={n.href} className="group relative flex items-center gap-3 py-2.5 text-[14px] text-white/55 transition-all duration-300 hover:translate-x-1 hover:text-white">
                      <span className="w-5 text-[9px] font-medium tracking-widest text-white/20 transition-colors duration-300 group-hover:text-[var(--rose)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="absolute left-0 h-px w-0 bg-[var(--rose)] transition-all duration-300 group-hover:w-2" />
                      <span>{n.label}</span>
                      <span className="ml-auto translate-x-[-8px] opacity-0 text-[var(--rose)] transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ================= CONTACT INFORMATION ================= */}
            <div>
              <div className="mb-6">
                <p className="font-display text-[17px] font-semibold text-white">Contact Information</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="h-[2px] w-8 rounded-full bg-[var(--rose)]" />
                  <span className="h-px w-5 bg-white/10" />
                </div>
              </div>

              <ul className="space-y-5">
                <li className="group flex gap-4">
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.025] text-[var(--rose)] transition-all duration-300 group-hover:border-[var(--rose)]/40 group-hover:bg-[var(--rose)]/10">
                    <span className="text-xs">✦</span>
                  </span>
                  <div className="text-[14px] leading-6 text-white/60">
                    <b className="font-medium text-white/90">Clinic:</b> Papalkar Gastrocare
                  </div>
                </li>

                <li className="group flex gap-4">
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.025] text-[var(--rose)] transition-all duration-300 group-hover:border-[var(--rose)]/40 group-hover:bg-[var(--rose)]/10">
                    <span className="text-xs">⌖</span>
                  </span>
                  <div className="text-[14px] leading-6 text-white/60">
                    <b className="font-medium text-white/90">Address:</b> {ADDRESS_LINES.join(" ")}
                  </div>
                </li>

                <li className="group flex gap-4">
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.025] text-[var(--rose)] transition-all duration-300 group-hover:border-[var(--rose)]/40 group-hover:bg-[var(--rose)]/10">
                    <Ic.phone className="h-3.5 w-3.5" />
                  </span>
                  <div className="text-[14px] leading-6 text-white/60">
                    <b className="font-medium text-white/90">Phone:</b>{" "}
                    <a href={`tel:${PHONE_1_TEL}`} className="transition-colors hover:text-[var(--rose)]">{PHONE_1_DISPLAY}</a>
                    {" · "}
                    <a href={`tel:${PHONE_2_TEL || PHONE_1_TEL}`} className="transition-colors hover:text-[var(--rose)]">{PHONE_2_DISPLAY}</a>
                  </div>
                </li>

                <li className="group flex gap-4">
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.025] text-[var(--rose)] transition-all duration-300 group-hover:border-[var(--rose)]/40 group-hover:bg-[var(--rose)]/10">
                    <span className="text-xs">◷</span>
                  </span>
                  <div className="text-[14px] leading-6 text-white/60">
                    <b className="font-medium text-white/90">Hours:</b> Call or WhatsApp to confirm today's consultation timings
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* ================= BOTTOM DIVIDER ================= */}
          <div className="relative mt-16 pt-7">
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="pointer-events-none absolute left-1/2 top-0 h-px w-40 -translate-x-1/2 bg-[var(--rose)]/30 blur-sm" />
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-center text-[12px] text-white/35 sm:text-left">© 2026 Papalkar Gastrocare. All rights reserved.</p>
              <p className="text-center text-[12px] text-white/35 sm:text-right">
                A legacy of medical excellence.
                <span className="mx-2 text-[var(--rose)]/60">•</span>
                A new era in gastroenterology.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= FLOATING ACTIONS ================= */}
      <a
        href={APPOINTMENT_LINK}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl"
        style={{ animation: "pulseRing 2.2s ease-out infinite" }}
        aria-label="Chat on WhatsApp"
      >
        <Ic.whatsapp className="w-7 h-7" />
      </a>

      <a
        href={`tel:${PHONE_1_TEL}`}
        className="fixed bottom-24 right-6 z-40 w-11 h-11 rounded-full bg-white text-[var(--navy)] border border-[var(--line)] flex items-center justify-center shadow-xl hover:-translate-y-0.5 transition-transform"
        aria-label="Call Papalkar Gastrocare"
      >
        <Ic.phone className="w-5 h-5" />
      </a>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 left-6 z-40 w-11 h-11 rounded-full bg-[var(--navy)] text-white flex items-center justify-center shadow-xl transition-all duration-400 ${showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
        aria-label="Back to top"
      >
        <Ic.top className="w-5 h-5" />
      </button>
    </div>
  );
}
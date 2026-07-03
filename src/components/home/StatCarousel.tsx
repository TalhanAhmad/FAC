"use client";

import { useCallback, useEffect, useState } from "react";

type Stat = {
  quote: string;
  source: string;
  /** Panel background colour. */
  bg: string;
  /** If set, render a donut at this percentage; otherwise the dot cluster. */
  percent?: number;
};

const STATS: Stat[] = [
  {
    quote: "1 in 13 children has a food allergy. That’s about 2 kids in every classroom.",
    source: "Source: CDC, Healthy Schools (cdc.gov)",
    bg: "#ffbc00",
  },
  {
    quote:
      "Over 60% of food allergy reactions at school happen in preschools and childcare facilities.",
    source: "Source: Food Allergy Research & Education (foodallergy.org)",
    bg: "#5bbaba",
    percent: 60,
  },
  {
    quote:
      "25% of severe reactions at school happen in children with no prior allergy diagnosis.",
    source: "Source: Food Allergy Research & Education (foodallergy.org)",
    bg: "#0089ff",
    percent: 25,
  },
  {
    quote: "Up to 72% of childcare staff have never received food allergy training.",
    source: "Source: FARE early-childhood training data (foodallergy.org)",
    bg: "#f46800",
    percent: 72,
  },
];

const AUTOPLAY_MS = 6000;

function DotCluster() {
  const rows = [
    { y: 30, xs: [70, 115, 160, 205] },
    { y: 72, xs: [47, 92, 137, 182, 227], blackIndex: 2 },
    { y: 114, xs: [70, 115, 160, 205] },
  ];
  return (
    <svg viewBox="0 0 274 144" className="mx-auto h-24 w-auto sm:h-28" aria-hidden="true">
      {rows.map((row, ri) =>
        row.xs.map((x, xi) => (
          <circle
            key={`${ri}-${xi}`}
            cx={x}
            cy={row.y}
            r={17}
            fill={row.blackIndex === xi ? "#111111" : "#ffffff"}
          />
        ))
      )}
    </svg>
  );
}

function Donut({ percent }: { percent: number }) {
  const r = 46;
  const circ = 2 * Math.PI * r;
  const filled = (percent / 100) * circ;
  return (
    <svg viewBox="0 0 140 140" className="mx-auto h-24 w-auto sm:h-28" aria-hidden="true">
      {/* Track */}
      <circle cx="70" cy="70" r={r} fill="none" stroke="#ffffff" strokeWidth="24" />
      {/* Filled portion */}
      <circle
        cx="70"
        cy="70"
        r={r}
        fill="none"
        stroke="#111111"
        strokeWidth="24"
        strokeDasharray={`${filled} ${circ - filled}`}
        transform="rotate(-90 70 70)"
      />
    </svg>
  );
}

export function StatCarousel() {
  const [index, setIndex] = useState(0);

  const go = useCallback((next: number) => {
    setIndex((next + STATS.length) % STATS.length);
  }, []);

  useEffect(() => {
    // Respect users who prefer reduced motion — don't auto-advance for them.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % STATS.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [index]);

  return (
    <section id="stats" className="relative scroll-mt-20 overflow-hidden">
      {/* Sliding track: each stat is a full-width coloured panel. */}
      <div
        className="flex transition-transform duration-700 ease-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {STATS.map((stat, i) => (
          <div
            key={i}
            className="flex min-h-[460px] w-full shrink-0 flex-col items-center justify-center px-6 pb-24 pt-16 text-center"
            style={{ backgroundColor: stat.bg }}
            aria-hidden={i !== index}
          >
            {stat.percent === undefined ? <DotCluster /> : <Donut percent={stat.percent} />}

            <blockquote className="mt-10 max-w-2xl font-serif text-[26px] font-extrabold italic leading-[1.2] text-ink sm:text-[34px]">
              {stat.quote}
            </blockquote>

            <p className="mt-6 text-sm text-ink/80">{stat.source}</p>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute inset-x-0 bottom-9 flex items-center justify-center gap-3">
        {STATS.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show statistic ${i + 1}`}
            aria-current={i === index}
            onClick={() => go(i)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              i === index ? "bg-ink" : "bg-ink/40 hover:bg-ink/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

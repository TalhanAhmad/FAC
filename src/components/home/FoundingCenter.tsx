"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

const foundingDaycare = "/images/FAC_Home-HappyHearts@2x 2.png";

const CENTERS = [
  { name: "Happy Hearts Daycare", status: "Approved / Parent Trusted" },
  { name: "Little Sprouts Academy", status: "Approved / Parent Trusted" },
  { name: "Bright Beginnings", status: "Approved / Parent Trusted" },
];

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}

export function FoundingCenter() {
  const [index, setIndex] = useState(0);
  const center = CENTERS[index];
  const go = (next: number) =>
    setIndex((next + CENTERS.length) % CENTERS.length);

  return (
    <section className="bg-brand-peach py-10 sm:py-16">
      <Container>
        <div className="mx-auto max-w-[520px] text-center">
          <Eyebrow className="text-[11px]">Founding Center Offer</Eyebrow>
          <h2 className="mt-3 font-serif text-[26px] font-bold leading-[1.04] text-ink sm:text-[28px]">
            A small number of centers are shaping what this looks like
            nationally.
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative mx-auto mt-14 flex max-w-[640px] items-center justify-center">
          <button
            type="button"
            aria-label="Previous center"
            onClick={() => go(index - 1)}
            className="absolute left-0 z-10 hidden h-8 w-8 items-center justify-center rounded-full bg-black/25 text-white transition hover:bg-black/40 sm:flex"
          >
            <Chevron dir="left" />
          </button>

          <figure className="mx-auto w-full max-w-[496px]">
            <div className="relative">
              <span className="absolute right-0 top-0 z-10 -translate-y-full rounded-t-lg bg-brand-orange px-9 py-2 text-sm font-semibold leading-none text-white shadow-sm">
                Pilot Program Center
              </span>
              <div className="relative aspect-[65/36] w-full overflow-hidden">
                <Image
                  src={foundingDaycare}
                  alt={`${center.name} - a colorful childcare center`}
                  fill
                  sizes="(max-width: 640px) 100vw, 496px"
                  className="object-cover"
                />
              </div>
            </div>
            <figcaption className="bg-white px-6 py-3.5 text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink">
                {center.name}
              </p>
              <p className="mt-1 text-sm leading-none text-ink/80">
                {center.status}
              </p>
            </figcaption>
          </figure>

          <button
            type="button"
            aria-label="Next center"
            onClick={() => go(index + 1)}
            className="absolute right-0 z-10 hidden h-8 w-8 items-center justify-center rounded-full bg-ink text-white transition hover:bg-black/80 sm:flex"
          >
            <Chevron dir="right" />
          </button>
        </div>

        {/* Mobile arrows below the card */}
        <div className="mt-6 flex items-center justify-center gap-4 sm:hidden">
          <button
            type="button"
            aria-label="Previous center"
            onClick={() => go(index - 1)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-black/25 text-white transition hover:bg-black/40"
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            aria-label="Next center"
            onClick={() => go(index + 1)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white transition hover:bg-black/80"
          >
            <Chevron dir="right" />
          </button>
        </div>

        <div className="mx-auto mt-8 max-w-[500px] space-y-3 text-center text-[13px] leading-[1.25] text-ink">
          <p>
            We are building the standard for food allergy safety in childcare
            across the country. The centers that join us now are not just getting
            certified. They are helping define what certification means for every
            center that comes after them.
          </p>
          <p>
            Founding Centers receive preferred pricing locked in for life, plus a
            permanent Founding Center designation that sets them apart from every
            center that joins after them.
          </p>
        </div>

        <div className="mt-7 flex flex-col items-center gap-5">
          <Button
            href="/book-a-call"
            size="sm"
            className="px-5 py-2 text-xs leading-none"
          >
            Apply for a founding center spot
          </Button>
          <p className="text-lg font-bold uppercase tracking-normal text-ink">
            10 spots. 7 spoken for.{" "}
            <span className="text-brand-blue">3 remain.</span>
          </p>
        </div>
      </Container>
    </section>
  );
}

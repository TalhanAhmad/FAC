"use client";

import { useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import centerBadge from "@/../public/images/Group 3.png";
import { Notch } from "./Notch";

const DELIVERABLES = [
  {
    title: "FAC Certified Center digital badge",
    caption: "for your website and social profiles",
  },
  {
    title: "Physical window decal",
    caption: "for your front entrance where parents can see it",
  },
  {
    title: "Parent Trust Kit",
    caption: "materials that answer parent questions before they ask",
  },
  {
    title: "Directory listing",
    caption: "so food allergy families can find and choose you",
  },
];

export function CenterReceives() {
  const [index, setIndex] = useState(0);
  const item = DELIVERABLES[index];
  const isFirst = index === 0;
  const isLast = index === DELIVERABLES.length - 1;

  return (
    <section className="relative bg-white pb-12 pt-14 sm:pb-[48px] sm:pt-[52px]">
      <Container>
        <div className="mx-auto text-center">
          <Eyebrow className="text-[13px]">What Your Center Receives</Eyebrow>
          <h2 className="mx-auto mt-3 max-w-[570px] font-serif text-[30px] font-bold leading-[1.05] text-ink sm:text-[32px]">
            Everything your center needs to show families you&rsquo;re ready.
          </h2>
        </div>

        <div className="relative mx-auto mt-14 max-w-[850px] sm:mt-[84px]">
          <button
            type="button"
            aria-label="Previous item"
            onClick={() => setIndex((current) => Math.max(0, current - 1))}
            disabled={isFirst}
            className="absolute left-0 top-[141px] hidden h-[42px] w-[42px] items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:bg-[#bcbcbc] sm:flex"
          >
            <FaChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <figure
            className="flex flex-col items-center text-center"
            aria-live="polite"
          >
            <Image
              src={centerBadge}
              alt={item.title}
              width={270}
              height={259}
              className="mx-auto h-auto w-[240px] sm:w-[270px]"
            />
            <figcaption className="mt-12 sm:mt-[62px]">
              <p className="text-base font-semibold leading-[1.2] text-ink">
                {item.title}
              </p>
              <p className="text-base leading-[1.2] text-ink">{item.caption}</p>
            </figcaption>
          </figure>

          <button
            type="button"
            aria-label="Next item"
            onClick={() =>
              setIndex((current) =>
                Math.min(DELIVERABLES.length - 1, current + 1),
              )
            }
            disabled={isLast}
            className="absolute right-0 top-[141px] hidden h-[42px] w-[42px] items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:bg-[#bcbcbc] sm:flex"
          >
            <FaChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 sm:hidden">
          <button
            type="button"
            aria-label="Previous item"
            onClick={() => setIndex((current) => Math.max(0, current - 1))}
            disabled={isFirst}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:bg-[#bcbcbc]"
          >
            <FaChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next item"
            onClick={() =>
              setIndex((current) =>
                Math.min(DELIVERABLES.length - 1, current + 1),
              )
            }
            disabled={isLast}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:bg-[#bcbcbc]"
          >
            <FaChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </Container>

      <Notch colorClass="text-white" />
    </section>
  );
}

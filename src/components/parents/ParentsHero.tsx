"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import heroImg from "@/../public/images/Asset 1@4x 2.png";
import parentWave from "@/../public/images/forParent.png";

function WaitlistForm() {
  const [done, setDone] = useState(false);
  const [values, setValues] = useState({ first: "", email: "", zip: "" });

  if (done) {
    return (
      <p
        role="status"
        className="mx-auto mt-10 max-w-2xl text-lg font-semibold text-ink"
      >
        You&rsquo;re on the list! We&rsquo;ll be in touch the moment a certified
        center opens near you.
      </p>
    );
  }

  const field =
    "h-[48px] w-full border border-ink/80 bg-white px-4 text-[16px] text-ink placeholder:text-ink focus:outline-none focus:ring-2 focus:ring-brand-orange";

  return (
    <form
      className="mx-auto mt-10 w-[calc(100%-48px)] space-y-[10px] sm:w-[50vw] sm:max-w-[700px]"
      onSubmit={(e) => {
        e.preventDefault();
        if (values.first && values.email && values.zip) setDone(true);
      }}
    >
      <label className="sr-only" htmlFor="wl-first">
        First name
      </label>
      <input
        id="wl-first"
        name="firstName"
        autoComplete="given-name"
        className={field}
        placeholder="first name"
        value={values.first}
        onChange={(e) => setValues((v) => ({ ...v, first: e.target.value }))}
        required
      />
      <label className="sr-only" htmlFor="wl-email">
        Email address
      </label>
      <input
        id="wl-email"
        name="email"
        type="email"
        autoComplete="email"
        className={field}
        placeholder="email address"
        value={values.email}
        onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
        required
      />
      <label className="sr-only" htmlFor="wl-zip">
        Zip code
      </label>
      <input
        id="wl-zip"
        name="postalCode"
        inputMode="numeric"
        autoComplete="postal-code"
        className={field}
        placeholder="zip code"
        value={values.zip}
        onChange={(e) => setValues((v) => ({ ...v, zip: e.target.value }))}
        required
      />
      <div className="pt-4">
        <button
          type="submit"
          className="h-[44px] rounded-full bg-ink px-7 text-[15px] font-medium text-white transition-colors hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
        >
          Join the waitlist
        </button>
      </div>
    </form>
  );
}

export function ParentsHero() {
  return (
    <section className="overflow-hidden bg-white pb-4">
      <div className="sm:hidden">
        <div className="relative">
          <Image
            src={heroImg}
            alt="A young child eating a cracker at the table"
            priority
            sizes="100vw"
            data-testid="parents-hero-image"
            className="block h-[294px] w-full object-cover object-center"
          />
          <Image
            src={parentWave}
            alt=""
            sizes="100vw"
            data-testid="parents-wave"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-auto w-full"
          />
        </div>

        <Container className="pb-0 pt-3 text-center">
          <h1 className="mx-auto max-w-[316px] font-serif text-[28px] font-extrabold leading-[1.02] text-brand-teal">
            <span className="block">You should not</span>
            <span className="block">have to wonder if</span>
            <span className="block">your child is safe.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-[322px] text-[16px] leading-[1.2] text-ink">
            We are building a national directory of FAC Certified childcare
            centers. Places where the staff is trained, the protocols are in
            place, and food allergy children are truly looked after.
          </p>

          <p className="mx-auto mt-5 max-w-[322px] text-[16px] font-semibold leading-[1.2] text-ink">
            Join the waitlist and we will let you know the moment a certified
            center opens in your area.
          </p>

          <div id="waitlist" className="scroll-mt-24">
            <WaitlistForm />
          </div>
        </Container>
      </div>

      <div className="hidden sm:block">
        <div className="relative">
          <Image
            src={heroImg}
            alt="A young child eating a cracker at the table"
            priority
            sizes="100vw"
            data-testid="parents-hero-image"
            className="block h-[420px] w-full object-cover object-center sm:h-auto"
          />
          <Image
            src={parentWave}
            alt=""
            sizes="100vw"
            data-testid="parents-wave"
            className="pointer-events-none absolute inset-x-0 -bottom-[37px] h-auto w-full"
          />
        </div>

        <Container className="relative -mt-[calc(24vw+10px)] pb-0 text-center">
          <h1 className="mx-auto font-serif text-[38px] font-extrabold leading-[1.08] text-brand-teal sm:text-[52px]">
            <span className="block">You should not</span>
            <span className="block">have to wonder if your</span>
            <span className="block">child is safe.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-[620px] text-lg leading-[1.35] text-ink sm:text-xl">
            We are building a national directory of FAC Certified childcare
            centers. Places where the staff is trained, the protocols are in
            place, and food allergy children are truly looked after.
          </p>

          <p className="mx-auto mt-6 max-w-[620px] text-lg font-semibold leading-[1.35] text-ink sm:text-xl">
            Join the waitlist and we will let you know the moment a certified
            center opens in your area.
          </p>

          <div id="waitlist" className="scroll-mt-24">
            <WaitlistForm />
          </div>
        </Container>
      </div>
    </section>
  );
}

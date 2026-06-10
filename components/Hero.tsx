"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { heroSlides } from "@/lib/site";

function usePrefersReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return reduceMotion;
}

function AnimatedStat({ value, label }: { value: number; label: string }) {
  const reduceMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    let animationFrame = 0;
    const frame = window.requestAnimationFrame(() => {
      setDisplay(0);
      const start = performance.now();
      const duration = 1450;

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(eased * value));

        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(tick);
        }
      };

      animationFrame = window.requestAnimationFrame(tick);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [reduceMotion, value]);

  return (
    <div className="hero-stat-enter">
      <div className="stat-num">{display}+</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export function Hero() {
  const [active, setActive] = useState(0);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % heroSlides.length);
    }, 3800);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <section className="hero">
      <div className="hero-slider">
        {heroSlides.map((slide, index) => (
          <div
            key={slide}
            className={`slide ${index === active ? "active" : ""}`}
            style={{ backgroundImage: `url('${slide}')` }}
          />
        ))}
      </div>
      <div className="hero-content">
        <div className="hero-badge hero-enter hero-enter-1">
          <span className="hero-badge-dot" />
          Islamabad, Pakistan · Est. 2020
        </div>
        <h1 className="hero-enter hero-enter-2">
          Providing <em>One Window</em>
          <br />
          Solutions for Global Trade
        </h1>
        <p className="hero-desc hero-enter hero-enter-3">
          Impex-Pro empowers startups, exporters, and businesses with comprehensive
          consultancy, customs clearance, freight forwarding, tax, legal, and training,
          all under one roof.
        </p>
        <div className="hero-btns hero-enter hero-enter-4">
          <Link href="/contact" className="btn btn-gold">Request a Quote</Link>
          <Link href="/services" className="btn btn-outline-white">Explore Services</Link>
        </div>
      </div>
      <div className="hero-stats">
        <AnimatedStat value={400} label="Individuals Trained" />
        <AnimatedStat value={10} label="Businesses Launched" />
        <AnimatedStat value={6} label="Core Services" />
        <AnimatedStat value={15} label="Years Experience" />
      </div>
    </section>
  );
}

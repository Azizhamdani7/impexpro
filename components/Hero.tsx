"use client";

import Link from "next/link";
import { animate, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { heroSlides } from "@/lib/site";

function AnimatedStat({ value, label }: { value: number; label: string }) {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    let controls: ReturnType<typeof animate> | undefined;
    const frame = window.requestAnimationFrame(() => {
      setDisplay(0);
      controls = animate(0, value, {
        duration: 1.45,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (latest) => setDisplay(Math.round(latest))
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      controls?.stop();
    };
  }, [reduceMotion, value]);

  return (
    <motion.div
      initial={reduceMotion ? false : { y: 14, opacity: 0 }}
      animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="stat-num">{display}+</div>
      <div className="stat-label">{label}</div>
    </motion.div>
  );
}

export function Hero() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % heroSlides.length);
    }, 3800);
    return () => window.clearInterval(timer);
  }, []);

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
      <motion.div
        className="hero-content"
        initial={reduceMotion ? false : "hidden"}
        animate={reduceMotion ? undefined : "show"}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } }
        }}
      >
        <motion.div
          className="hero-badge"
          variants={{ hidden: { y: 18, opacity: 0 }, show: { y: 0, opacity: 1 } }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero-badge-dot" />
          Islamabad, Pakistan · Est. 2020
        </motion.div>
        <motion.h1
          variants={{ hidden: { y: 24, opacity: 0 }, show: { y: 0, opacity: 1 } }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          Providing <em>One Window</em>
          <br />
          Solutions for Global Trade
        </motion.h1>
        <motion.p
          className="hero-desc"
          variants={{ hidden: { y: 18, opacity: 0 }, show: { y: 0, opacity: 1 } }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          Impex-Pro empowers startups, exporters, and businesses with comprehensive
          consultancy, customs clearance, freight forwarding, tax, legal, and training,
          all under one roof.
        </motion.p>
        <motion.div
          className="hero-btns"
          variants={{ hidden: { y: 16, opacity: 0 }, show: { y: 0, opacity: 1 } }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/contact" className="btn btn-gold">Request a Quote</Link>
          <Link href="/services" className="btn btn-outline-white">Explore Services</Link>
        </motion.div>
      </motion.div>
      <motion.div
        className="hero-stats"
        initial={reduceMotion ? false : "hidden"}
        animate={reduceMotion ? undefined : "show"}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08, delayChildren: 0.65 } }
        }}
      >
        <AnimatedStat value={400} label="Individuals Trained" />
        <AnimatedStat value={10} label="Businesses Launched" />
        <AnimatedStat value={6} label="Core Services" />
        <AnimatedStat value={15} label="Years Experience" />
      </motion.div>
    </section>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ClientEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const selectors = [
      ".fade-in",
      ".ip-svc-card",
      ".sp-svc-card",
      ".why-card",
      ".industry-item",
      ".team-card",
      ".tcard",
      ".masonry-item",
      ".vid-card",
      ".about-card",
      ".about-img-wrap",
      ".contact-item",
      ".cta-inner"
    ].join(",");

    const elements = Array.from(document.querySelectorAll<HTMLElement>(selectors));
    if (!elements.length || reduceMotion || !("IntersectionObserver" in window)) {
      document.body.classList.remove("motion-enhanced");
      elements.forEach((element) => element.classList.add("is-inview"));
      return;
    }

    document.body.classList.add("motion-enhanced");
    elements.forEach((element, index) => {
      element.classList.add("motion-item");
      element.style.setProperty("--motion-delay", `${Math.min(index % 8, 5) * 55}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        element.classList.add("is-inview");
      } else {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
      elements.forEach((element) => {
        element.classList.remove("motion-item", "is-inview");
        element.style.removeProperty("--motion-delay");
      });
    };
  }, [pathname]);

  useEffect(() => {
    const track = document.querySelector<HTMLElement>(".testi-track");
    const dotsWrap = document.querySelector<HTMLElement>(".testi-dots");
    if (!track || !dotsWrap) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>(".testi-card"));
    if (!cards.length) return;

    let current = 0;
    let autoTimer: number | undefined;

    const visible = () => (window.innerWidth <= 600 ? 1 : window.innerWidth <= 900 ? 2 : 3);
    const maxIndex = () => Math.max(0, cards.length - visible());
    const goTo = (index: number) => {
      current = Math.max(0, Math.min(index, maxIndex()));
      const width = cards[0].getBoundingClientRect().width + 22;
      track.style.transform = `translateX(-${current * width}px)`;
      dotsWrap.querySelectorAll(".testi-dot").forEach((dot, dotIndex) => {
        dot.classList.toggle("active", dotIndex === current);
      });
    };
    const buildDots = () => {
      dotsWrap.innerHTML = "";
      for (let i = 0; i <= maxIndex(); i += 1) {
        const dot = document.createElement("div");
        dot.className = `testi-dot${i === current ? " active" : ""}`;
        dot.addEventListener("click", () => goTo(i));
        dotsWrap.appendChild(dot);
      }
    };
    const startAuto = () => {
      if (autoTimer) window.clearInterval(autoTimer);
      autoTimer = window.setInterval(() => goTo(current >= maxIndex() ? 0 : current + 1), 5000);
    };
    const prev = document.getElementById("testiPrev");
    const next = document.getElementById("testiNext");
    const onPrev = () => {
      goTo(current - 1);
      startAuto();
    };
    const onNext = () => {
      goTo(current + 1);
      startAuto();
    };
    const onResize = () => {
      current = 0;
      buildDots();
      goTo(0);
    };

    let startX = 0;
    const onTouchStart = (event: TouchEvent) => {
      startX = event.touches[0].clientX;
    };
    const onTouchEnd = (event: TouchEvent) => {
      const diff = startX - event.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        goTo(diff > 0 ? current + 1 : current - 1);
        startAuto();
      }
    };

    prev?.addEventListener("click", onPrev);
    next?.addEventListener("click", onNext);
    window.addEventListener("resize", onResize);
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchend", onTouchEnd, { passive: true });
    buildDots();
    startAuto();

    return () => {
      if (autoTimer) window.clearInterval(autoTimer);
      prev?.removeEventListener("click", onPrev);
      next?.removeEventListener("click", onNext);
      window.removeEventListener("resize", onResize);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchend", onTouchEnd);
    };
  }, [pathname]);

  return null;
}

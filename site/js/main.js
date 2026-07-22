// main.js – Elektro Ihlow Demo
// Bewegung sparsam, transform/opacity only, prefers-reduced-motion respektiert.

(() => {
  "use strict";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const navToggle = $("[data-nav-toggle]");
  const navMenu = $("[data-nav-menu]");

  /* ---------- Sanftes Scrollen (Lenis) + saubere GSAP-Integration ----------
     Lenis wird ueber gsap.ticker getaktet und meldet jeden Scroll an
     ScrollTrigger. Dadurch laufen Header, Parallax und Reveals ueber EINE
     zuverlaessige Scroll-Quelle statt ueber unregelmaessige native Events. */
  let lenis = null;
  if (!reduceMotion && window.Lenis) {
    lenis = new window.Lenis({ duration: 1.1, smoothWheel: true });
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  /* ---------- Smart-Header: bei jeder Aufwaertsbewegung sichtbar, egal wo ----------
     Nutzt den echten Scroll-Wert (Lenis oder window). Keine Schwelle -> reagiert
     auch auf langsames Smooth-Scrollen. Ein Controller, gilt fuer alle Seiten. */
  const header = $("[data-header]");
  if (header) {
    const isSolid = header.classList.contains("site-header--solid");
    let lastY = window.scrollY;
    let hidden = false, scrolled = false;
    const applyHeader = (y) => {
      if (!isSolid) {
        const s = y > 20;
        if (s !== scrolled) { scrolled = s; header.classList.toggle("is-scrolled", s); }
      }
      const menuOpen = navMenu && navMenu.classList.contains("is-open");
      let wantHidden = hidden;
      if (menuOpen || y <= 120) wantHidden = false;   // oben / Menue offen -> sichtbar
      else if (y < lastY) wantHidden = false;         // hoch (jede Bewegung) -> sichtbar
      else if (y > lastY && y > 160) wantHidden = true; // runter -> aus
      if (wantHidden !== hidden) { hidden = wantHidden; header.classList.toggle("is-hidden", hidden); }
      lastY = y;
    };
    if (lenis && typeof lenis.on === "function") {
      lenis.on("scroll", (e) => applyHeader(e && typeof e.scroll === "number" ? e.scroll : window.scrollY));
      applyHeader(window.scrollY);
    } else {
      const loop = () => { applyHeader(window.scrollY); requestAnimationFrame(loop); };
      requestAnimationFrame(loop);
    }
  }

  /* ---------- Mobile-Navigation ---------- */
  if (navToggle && navMenu) {
    const setNav = (open) => {
      navToggle.setAttribute("aria-expanded", String(open));
      navMenu.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    };
    navToggle.addEventListener("click", () =>
      setNav(navToggle.getAttribute("aria-expanded") !== "true"));
    $$("a", navMenu).forEach((a) => a.addEventListener("click", () => setNav(false)));
  }

  /* ---------- Reveal-Animationen ---------- */
  const reveals = $$("[data-reveal]");
  if (reduceMotion || !window.gsap) {
    reveals.forEach((el) => el.classList.add("is-in"));
  } else {
    document.body.classList.add("reveal-ready");
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    reveals.forEach((el) => {
      if (el.closest(".hero, .khero")) return; // Hero kommt per Stagger (unten)
      ScrollTrigger.create({
        trigger: el, start: "top 88%",
        onEnter: () => el.classList.add("is-in"),
      });
    });
    // Hero staffelt beim Laden
    const heroReveals = $$(".hero [data-reveal], .khero [data-reveal]");
    heroReveals.forEach((el, i) => {
      setTimeout(() => el.classList.add("is-in"), 90 * i + 80);
    });
  }

  /* ---------- Bild-Reveal (Clip beim Scrollen) ---------- */
  const imgReveals = $$("[data-img-reveal]");
  if (reduceMotion || !window.gsap) {
    imgReveals.forEach((el) => el.classList.add("is-in"));
  } else {
    imgReveals.forEach((el) =>
      ScrollTrigger.create({ trigger: el, start: "top 85%", onEnter: () => el.classList.add("is-in") }));
  }

  /* ---------- Parallax (Team-Band) ---------- */
  const parallaxEls = $$("[data-parallax]");
  if (!reduceMotion && parallaxEls.length) {
    const applyP = () => {
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -60 || r.top > vh + 60) return;
        const prog = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.transform = `translateY(${(prog * -46).toFixed(1)}px)`;
      });
    };
    if (lenis) {
      lenis.on("scroll", applyP);
    } else {
      let ticking = false;
      const onP = () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { applyP(); ticking = false; }); } };
      window.addEventListener("scroll", onP, { passive: true });
    }
    window.addEventListener("resize", applyP);
    applyP();
  }

  /* ---------- Zähler (Hero-Stats) ---------- */
  const counters = $$("[data-count]");
  const runCounter = (el) => {
    const target = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    if (reduceMotion) { el.textContent = prefix + target + suffix; return; }
    const dur = 1100, t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      // Suffix (z.B. " Standorte", " Mio. €") erst am Ende einblenden, damit
      // keine unsauberen Zwischenwerte wie "1 Standorte" entstehen.
      el.textContent = p < 1 ? prefix + Math.round(target * eased) : prefix + target + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (counters.length) {
    if ("IntersectionObserver" in window && !reduceMotion) {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = counters.indexOf(e.target);
            setTimeout(() => runCounter(e.target), Math.max(0, i) * 130);
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.6 });
      counters.forEach((c) => io.observe(c));
    } else {
      counters.forEach(runCounter);
    }
  }

  /* ---------- Accordion (Stellen) ---------- */
  $$("[data-accordion]").forEach((btn) => {
    const panel = btn.nextElementSibling;
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      if (panel) panel.toggleAttribute("data-open", !open);
      if (lenis) setTimeout(() => ScrollTrigger && ScrollTrigger.refresh(), 420);
    });
  });

  /* ---------- Modal ---------- */
  let lastFocus = null;
  const openModal = (id) => {
    const modal = $(`[data-modal="${id}"]`);
    if (!modal) return;
    lastFocus = document.activeElement;
    const fn = modal.querySelector("[data-funnel]");
    if (fn && fn._reset) fn._reset();
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (lenis) lenis.stop();
    const focusable = modal.querySelector("input, button, [tabindex]");
    if (focusable) setTimeout(() => focusable.focus(), 60);
  };
  const closeModal = (modal) => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lenis) lenis.start();
    if (lastFocus) lastFocus.focus();
  };
  $$("[data-open-modal]").forEach((b) =>
    b.addEventListener("click", () => openModal(b.dataset.openModal)));
  $$("[data-modal-close]").forEach((b) =>
    b.addEventListener("click", () => closeModal(b.closest("[data-modal]"))));
  document.addEventListener("keydown", (e) => {
    const m = $(".modal.is-open");
    if (e.key === "Escape") { if (m) closeModal(m); return; }
    if (e.key === "Tab" && m) {
      const f = $$('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])', m)
        .filter((el) => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- Funnel (Bewerbung + Projektanfrage) ---------- */
  $$("[data-funnel]").forEach((funnel) => {
    const form = $("[data-funnel-form]", funnel);
    const steps = $$(".funnel__step", form);
    const bar = $("[data-funnel-bar]", funnel);
    const stepLabel = $("[data-funnel-steplabel]", funnel);
    const nav = $("[data-funnel-nav]", funnel);
    const backBtn = $("[data-funnel-back]", funnel);
    const nextBtn = $("[data-funnel-next]", funnel);
    const done = $("[data-funnel-done]", funnel);
    let idx = 0;
    let advanceTimer = null;
    const total = steps.length;

    const show = (i) => {
      steps.forEach((s, n) => s.hidden = n !== i);
      backBtn.hidden = i === 0;
      nextBtn.textContent = i === total - 1 ? "Absenden" : "Weiter";
      if (bar) bar.style.width = `${((i + 1) / total) * 100}%`;
      if (stepLabel) stepLabel.textContent = `Schritt ${i + 1} von ${total}`;
      const first = steps[i].querySelector("input");
      if (first && first.type === "text") setTimeout(() => first.focus(), 50);
    };

    const validate = (step) => {
      const radios = $$("input[type=radio]", step);
      const checks = $$("input[type=checkbox]", step);
      const texts = $$("input[type=text], input[type=tel], input[type=email]", step);
      if (radios.length) return radios.some((r) => r.checked);
      if (texts.length) return texts.every((t) => t.value.trim() !== "");
      if (checks.length) return checks.some((c) => c.checked); // Mehrfach: min. 1
      return true;
    };
    const markError = (step, on) => step.classList.toggle("has-error", on);

    // Auto-Advance bei Single-Choice
    steps.forEach((step) => {
      if (step.querySelector("[data-multi]")) return;
      $$("input[type=radio]", step).forEach((r) =>
        r.addEventListener("change", () => {
          markError(step, false);
          if (idx < total - 1) {
            clearTimeout(advanceTimer);
            advanceTimer = setTimeout(() => { advanceTimer = null; next(); }, 220);
          }
        }));
    });

    const next = () => {
      clearTimeout(advanceTimer); advanceTimer = null;
      const step = steps[idx];
      if (!validate(step)) { markError(step, true);
        const legend = step.querySelector("legend"); if (legend) legend.animate(
          [{ transform: "translateX(0)" }, { transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "translateX(0)" }],
          { duration: 260 });
        return; }
      if (idx < total - 1) { idx++; show(idx); }
      else finish();
    };
    const back = () => { if (idx > 0) { idx--; show(idx); } };
    const finish = () => {
      steps.forEach((s) => s.hidden = true);
      nav.hidden = true;
      done.hidden = false;
      if (bar) bar.style.width = "100%";
      if (stepLabel) stepLabel.textContent = "Fertig";
    };
    const reset = () => {
      clearTimeout(advanceTimer); advanceTimer = null;
      idx = 0;
      if (form && typeof form.reset === "function") form.reset();
      done.hidden = true;
      nav.hidden = false;
      show(0);
    };
    funnel._reset = reset;

    nextBtn.addEventListener("click", next);
    backBtn.addEventListener("click", back);
    show(0);
  });

  /* ---------- Bewerben mit vorbelegter Stelle ---------- */
  $$("[data-apply-role]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const role = btn.dataset.applyRole;
      const target = document.querySelector('input[name="stelle"][value="' + role + '"]');
      if (target) { target.checked = true; }
      const funnelSection = $("#funnel");
      if (funnelSection) {
        if (lenis) lenis.scrollTo(funnelSection, { offset: -20 });
        else funnelSection.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      }
    });
  });
})();

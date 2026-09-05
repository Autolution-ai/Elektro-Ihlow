// main.js – Elektro Ihlow Demo
// Bewegung sparsam, transform/opacity only, prefers-reduced-motion respektiert.
// Kein Smooth-Scroll-Framework: nativer window-Scroll (zuverlaessig fuer den
// Header) + GSAP ScrollTrigger fuer Reveals.

(() => {
  "use strict";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const navToggle = $("[data-nav-toggle]");
  const navMenu = $("[data-nav-menu]");

  const hasGsap = !reduceMotion && !!window.gsap;
  if (hasGsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ---------- Smart-Header (natives window-Scroll, bewaehrtes Muster) ----------
     Runter scrollen -> Header aus. Hoch scrollen (egal wo) -> Header sofort da.
     rAF + ticking = max. ein Update pro Frame. DELTA gegen iOS-Bounce/Trackpad-
     Zittern. Unter SHOW_HIDE_START immer sichtbar. */
  const header = $("[data-header]");
  if (header) {
    const isSolid = header.classList.contains("site-header--solid");
    const SHOW_HIDE_START = 120;
    const DELTA = 6;
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const dy = y - lastY;
        if (!isSolid) header.classList.toggle("is-scrolled", y > 20);
        const menuOpen = navMenu && navMenu.classList.contains("is-open");
        if (menuOpen || y < SHOW_HIDE_START) header.classList.remove("is-hidden");
        else if (Math.abs(dy) > DELTA) header.classList.toggle("is-hidden", dy > 0);
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile-Navigation ---------- */
  if (navToggle && navMenu) {
    const setNav = (open) => {
      navToggle.setAttribute("aria-expanded", String(open));
      navMenu.classList.toggle("is-open", open);
      document.body.classList.toggle("is-locked", open);
    };
    navToggle.addEventListener("click", () =>
      setNav(navToggle.getAttribute("aria-expanded") !== "true"));
    $$("a", navMenu).forEach((a) => {
      if (a.hasAttribute("data-nav-trigger")) return; // Trigger klappt Untermenue auf, schliesst nicht
      a.addEventListener("click", () => setNav(false));
    });
  }

  /* ---------- Mega-Menü: auf Touch/kleinen Screens aufklappen ---------- */
  $$("[data-nav-dropdown]").forEach((item) => {
    const trigger = item.querySelector("[data-nav-trigger]");
    if (!trigger) return;
    trigger.addEventListener("click", (e) => {
      if (window.matchMedia("(max-width: 900px)").matches) {
        e.preventDefault();
        const open = item.classList.toggle("is-open");
        trigger.setAttribute("aria-expanded", String(open));
      }
    });
  });

  /* ---------- Reveal-Animationen ---------- */
  const reveals = $$("[data-reveal]");
  if (!hasGsap) {
    reveals.forEach((el) => el.classList.add("is-in"));
  } else {
    document.body.classList.add("reveal-ready");
    reveals.forEach((el) => {
      if (el.closest(".hero, .khero")) return; // Hero kommt per Stagger (unten)
      ScrollTrigger.create({
        trigger: el, start: "top 88%",
        onEnter: () => el.classList.add("is-in"),
      });
    });
    $$(".hero [data-reveal], .khero [data-reveal]").forEach((el, i) => {
      setTimeout(() => el.classList.add("is-in"), 90 * i + 80);
    });
  }

  /* ---------- Bild-Reveal (Clip beim Scrollen) ---------- */
  const imgReveals = $$("[data-img-reveal]");
  if (!hasGsap) {
    imgReveals.forEach((el) => el.classList.add("is-in"));
  } else {
    imgReveals.forEach((el) =>
      ScrollTrigger.create({ trigger: el, start: "top 85%", onEnter: () => el.classList.add("is-in") }));
  }

  /* ---------- Die Leitung (Sektionstrenner zeichnet sich) ---------- */
  const wires = $$("[data-wire]");
  if (!hasGsap) {
    wires.forEach((el) => el.classList.add("is-in"));
  } else {
    wires.forEach((el) =>
      ScrollTrigger.create({ trigger: el, start: "top 92%", onEnter: () => el.classList.add("is-in") }));
  }

  /* ---------- Parallax (Team-Band) ---------- */
  const parallaxEls = $$("[data-parallax]");
  if (!reduceMotion && parallaxEls.length) {
    let ticking = false;
    const applyP = () => {
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -60 || r.top > vh + 60) return;
        const prog = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.transform = `translateY(${(prog * -46).toFixed(1)}px)`;
      });
      ticking = false;
    };
    const onP = () => { if (!ticking) { ticking = true; requestAnimationFrame(applyP); } };
    window.addEventListener("scroll", onP, { passive: true });
    window.addEventListener("resize", onP);
    applyP();
  }

  /* ---------- Zähler (Hero-Stats) ---------- */
  const counters = $$("[data-count]");
  const runCounter = (el) => {
    const target = parseFloat(el.dataset.count);
    // data-from: Startwert. Von 0 auf 1946 hochzuzaehlen sieht albern aus,
    // von 1926 aus wirkt es wie eine Jahreszahl, die hochlaeuft.
    const from = el.dataset.from !== undefined ? parseFloat(el.dataset.from) : 0;
    const dec = parseInt(el.dataset.decimals || "0", 10);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    // useGrouping aus, sonst wird aus dem Jahr 1946 ein "1.946".
    const fmt = (v) => v.toLocaleString("de-DE", {
      minimumFractionDigits: dec, maximumFractionDigits: dec, useGrouping: false });
    if (reduceMotion) { el.textContent = prefix + fmt(target) + suffix; return; }
    const dur = 1100, t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      // Suffix (z.B. " Standorte") erst am Ende, sonst entstehen falsche
      // Pluralformen wie "1 Standorte".
      el.textContent = p < 1 ? prefix + fmt(from + (target - from) * eased)
                             : prefix + fmt(target) + suffix;
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
      if (hasGsap && window.ScrollTrigger) setTimeout(() => ScrollTrigger.refresh(), 420);
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
    document.body.classList.add("is-locked");
    const focusable = modal.querySelector("input, button, [tabindex]");
    if (focusable) setTimeout(() => focusable.focus(), 60);
  };
  const closeModal = (modal) => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
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
      if (!validate(step)) {
        markError(step, true);
        const legend = step.querySelector("legend");
        if (legend) legend.animate(
          [{ transform: "translateX(0)" }, { transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "translateX(0)" }],
          { duration: 260 });
        return;
      }
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
    // Optionale Anreicherung NACH dem Absenden (Freitext + Lebenslauf).
    // Bewusst erst hier, damit die Bewerbung selbst kurz bleibt.
    const extra = $("[data-funnel-extra]", funnel);
    const extraDone = $("[data-funnel-extra-done]", funnel);
    const extraSend = $("[data-funnel-extra-send]", funnel);
    const fileInput = extra && $("input[type=file]", extra);
    const fileLabel = extra && $(".funnel__file-label", extra);
    const FILE_LABEL = fileLabel ? fileLabel.textContent : "";

    if (fileInput && fileLabel) {
      fileInput.addEventListener("change", () => {
        const f = fileInput.files && fileInput.files[0];
        fileLabel.textContent = f ? f.name : FILE_LABEL;
      });
    }
    if (extraSend) {
      extraSend.addEventListener("click", () => {
        if (extra) extra.hidden = true;
        if (extraDone) extraDone.hidden = false;
      });
    }

    const reset = () => {
      clearTimeout(advanceTimer); advanceTimer = null;
      idx = 0;
      if (form && typeof form.reset === "function") form.reset();
      done.hidden = true;
      nav.hidden = false;
      if (extra) extra.hidden = false;
      if (extraDone) extraDone.hidden = true;
      if (fileLabel) fileLabel.textContent = FILE_LABEL;
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
      if (target) target.checked = true;
      const funnelSection = $("#funnel");
      if (funnelSection) funnelSection.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    });
  });
})();

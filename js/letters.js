
const d=document.querySelectorAll(".letters"),m=o=>{let c,l;if(o.type==="mousemove"){const e=o;c=e.clientX,l=e.clientY}else{const e=o;c=e.touches[0].clientX,l=e.touches[0].clientY}const n=document.getElementById("page-scroller"),a=n?.scrollLeft??0,u=n?.scrollTop??0;d.forEach(e=>{const s=e;let r=0,f=0,t=s;for(;t;)r+=t.offsetLeft,f+=t.offsetTop,t=t.offsetParent;const i=250,y=250;s?.style.setProperty("--bg-x",`left calc(${c-r-i+a}px - var(--px))`),s?.style.setProperty("--bg-y",`top calc(${l-f-y+u}px - var(--py))`)})};document.body.addEventListener("mousemove",m);document.body.addEventListener("touchmove",m);
// ================= REVEAL ON LOAD + SCROLL (FIX ABOVE THE FOLD) =================

document.addEventListener("DOMContentLoaded", () => {
  const elements = Array.from(document.querySelectorAll(
    ".intro, .features, .feature-card, .steps__step, .contact, .footer"
  ));

  // 1) Навешиваем базовые классы
  elements.forEach((el, i) => {
    el.classList.add("reveal");

    if (el.classList.contains("feature-card")) {
      const d = (i % 4) + 1;
      el.classList.add(`reveal-delay-${d}`);
    }
  });

  // 2) ВАЖНО: принудительно применяем стили, чтобы transition точно сработал
  // (иначе элементы в первом экране появляются без анимации)
  void document.body.offsetHeight;

  // 3) IntersectionObserver для всего, что появится при скролле
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");

      if (entry.target.classList.contains("footer")) {
        entry.target.classList.add("footer-visible");
      }

      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
  });

  elements.forEach((el) => observer.observe(el));

  // 4) Отдельно: анимируем элементы, которые УЖЕ видны на первом экране
  requestAnimationFrame(() => {
    const vh = window.innerHeight || 800;

    const aboveFold = elements.filter((el) => {
      const r = el.getBoundingClientRect();
      return r.top < vh * 0.92; // всё, что попадает в первый экран
    });

    // небольшой stagger, чтобы выглядело “дороже”
    aboveFold.forEach((el, idx) => {
      setTimeout(() => el.classList.add("visible"), idx * 90);
    });
  });
});
const lettersEls = document.querySelectorAll(".letters");

const onMove = (ev) => {
  const isTouch = ev.type === "touchmove";
  const x = isTouch ? ev.touches[0].clientX : ev.clientX;
  const y = isTouch ? ev.touches[0].clientY : ev.clientY;

  lettersEls.forEach((el) => {
    const rect = el.getBoundingClientRect();

    // центр "пятна" (как было 250/250)
    const cx = 250;
    const cy = 250;

    el.style.setProperty("--bg-x", `left calc(${x - rect.left - cx}px - var(--px))`);
    el.style.setProperty("--bg-y", `top calc(${y - rect.top - cy}px - var(--py))`);
  });
};

document.addEventListener("mousemove", onMove, { passive: true });
document.addEventListener("touchmove", onMove, { passive: true });

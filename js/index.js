// -------------------------------
// GSAP 플러그인 등록 (한 번만)
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.addEventListener("DOMContentLoaded", () => {
  
  // -------------------------------
  // 네비게이션 스크롤 & active 클래스
  // -------------------------------
  (function initNavigation() {
    const links = gsap.utils.toArray("#parallax_nav ul li a");

    links.forEach(link => {
      const target = document.querySelector(link.getAttribute("href"));

      // 스크롤 위치에 따라 active 클래스 토글
      ScrollTrigger.create({
        trigger: target,
        start: "top center",
        end: "bottom center",
        toggleClass: { targets: link, className: "active" }
      });

      // 클릭 시 부드럽게 스크롤 이동
      link.addEventListener("click", e => {
        e.preventDefault();
        gsap.to(window, { duration: 1, scrollTo: target, overwrite: "auto" });
      });
    });
  })();

  // -------------------------------
  // Section1 핀 고정
  // -------------------------------
  (function initSection1Pin() {
    ScrollTrigger.create({
      trigger: "#section1",
      pin: ".main_sec1",
      start: "top top",
      end: "bottom top"
    });
  })();

  // -------------------------------
  // item_effect 패럴랙스 이질감 효과
  // -------------------------------
  (function initItemEffect() {
    gsap.utils.toArray(".item_effect").forEach(item => {
      gsap.to(item, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  })();

  // -------------------------------
  // 갤러리 스크롤 등장 + hover
  // -------------------------------
  (function initGallery() {
    const gallery = document.querySelector(".gallery");
    if (!gallery) return;

    const tiles = Array.from(gallery.querySelectorAll(".tile"));

    // 초기 애니메이션
    tiles.forEach((tile, i) => {
      const rect = tile.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        gsap.set(tile, { opacity: 1, y: 0 });
      } else {
        gsap.fromTo(tile, { opacity: 0, y: 50 }, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tile,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      }
    });

    // hover 효과 
    // tiles.forEach(tile => {
    //   tile.addEventListener("mouseenter", () => tile.style.borderRadius = "50%");
    //   tile.addEventListener("mouseleave", () => tile.style.borderRadius = "28px");
    // });
  })();

  // -------------------------------
  // 가로 스크롤 텍스트
  // -------------------------------
  (function initHorizontalText() {
    let horTextTween;
    let resizeTimer;

    function horTextAnimation() {
      const horText = document.querySelector(".section-scroll-text h1");
      if (!horText) return;

      if (horTextTween) {
        horTextTween.scrollTrigger.kill();
        horTextTween.kill();
      }

      const distance = horText.offsetWidth - window.innerWidth;
      const scrollMultiplier = 1.2;
      const endDistance = distance * scrollMultiplier;

      horTextTween = gsap.to(horText, {
        x: -distance,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".section-scroll-text",
          scrub: 0.5,
          start: "top bottom",
          end: `+=${endDistance}`
        }
      });
    }

    horTextAnimation();

    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        horTextAnimation();
        ScrollTrigger.refresh();
      }, 200);
    });
  })();

  // -------------------------------
  // Section5 리스트 효과
  // -------------------------------
  (function initSection5List() {
    const section = document.getElementById("section5");
    if (!section) return;

    const items = Array.from(section.querySelectorAll("li"));
    const hoverImg = document.getElementById("hoverImg");

    items.forEach(item => {
      const arrow = item.querySelector(".arrow");
      const lines = item.querySelectorAll(".line");

      ScrollTrigger.create({
        trigger: item,
        start: "top 90%",
        end: "bottom 10%",
        onEnter: () => {
          gsap.to(lines, { width: "50%", duration: 1 });
          if (arrow) gsap.to(arrow, { opacity: 1, x: 0, duration: 0.8 });
        },
        onLeaveBack: () => {
          gsap.to(lines, { width: 0, duration: 1 });
          if (arrow) gsap.to(arrow, { opacity: 0, x: 10, duration: 0.5 });
        }
      });

      item.addEventListener("mouseenter", () => {
        hoverImg.style.backgroundImage = `url(${item.dataset.img})`;
        hoverImg.classList.add("show");
      });

      item.addEventListener("mouseleave", () => {
        hoverImg.classList.remove("show");
      });
    });

    section.addEventListener("mousemove", e => {
      const rect = section.getBoundingClientRect();
      hoverImg.style.top = `${e.clientY - rect.top}px`;
    });
  })();

});

//-------------------------------
// 서브페이지 포폴리스트 텍스트
//-------------------------------
const lines = document.querySelectorAll(".line");

lines.forEach(line => {
  const overlay = line.querySelector(".overlay");

  line.addEventListener("mouseenter", () => {
    gsap.to(overlay, {
      clipPath: "inset(0 0% 0 0)",
      duration: 0.6,
      ease: "power2.out"
    });
  });

  line.addEventListener("mouseleave", () => {
    gsap.to(overlay, {
      clipPath: "inset(0 100% 0 0)",
      duration: 0.6,
      ease: "power2.in"
    });
  });
});

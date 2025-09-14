// //네비이동
// let links = gsap.utils.toArray("#parallax_nav ul li a");

// links.forEach(link => {
//     let element = document.querySelector(link.getAttribute("href"));
//     let linkST = ScrollTrigger.create({
//         trigger: element,
//         start: "top top"
//     });

//     ScrollTrigger.create({
//         trigger: element,
//         start: "top center",
//         end: "bottom center",
//         onToggle: self => setActive(link)
//     });

//     link.addEventListener("click", e => {
//         e.preventDefault();
//         gsap.to(window, {duration: 1, scrollTo: linkST.start, overwrite: "auto"});
//     })
// });

// function setActive(link){
//     links.forEach(el => el.classList.remove("active"));
//     link.classList.add("active");
// }


// //gsap
// gsap.registerPlugin(ScrollTrigger);

// ScrollTrigger.create({
//     trigger: "#section1",
//     pin: ".main_sec1",
//     markers: true,
//     start: "top top",
//     end: "bottom top",
// });

// //이질감효과
// gsap.to(".item_effect", {
//     yPercent: -100,
//     ease: "none",
//     duration: 0.5,
//     scrollTrigger: {
//         trigger: ".item_effect",
//         start: "top bottom", 
//         end: "bottom -300px",
//         markers: true,
//         scrub: true
//     },  
// });



// -------------------------------
// GSAP 플러그인 등록
// -------------------------------
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// -------------------------------
// 네비게이션 스크롤 & active 클래스
// -------------------------------
let links = gsap.utils.toArray("#parallax_nav ul li a");

links.forEach(link => {
    const target = document.querySelector(link.getAttribute("href"));

    // 스크롤 위치에 따라 active 클래스 자동 토글
    ScrollTrigger.create({
        trigger: target,
        start: "top center",
        end: "bottom center",
        toggleClass: { targets: link, className: "active" }
    });

    // 클릭 시 부드럽게 스크롤 이동
    link.addEventListener("click", e => {
        e.preventDefault();
        gsap.to(window, {
            duration: 1,
            scrollTo: target,
            overwrite: "auto"
        });
    });
});

// -------------------------------
// Section1 핀 고정
// -------------------------------
ScrollTrigger.create({
    trigger: "#section1",
    pin: ".main_sec1",
    start: "top top",
    end: "bottom top"
    // markers: true // 디버깅용, 배포 시 제거
});

// -------------------------------
// item_effect 패럴랙스 이질감 효과
// -------------------------------

// 요소가 많으면 batch 처리로 성능 최적화 가능
gsap.utils.toArray(".item_effect").forEach(item => {
    gsap.to(item, {
        yPercent: -100,   // 위로 이동
        ease: "none",     // 선형 이동
        scrollTrigger: {
            trigger: item,
            start: "top bottom",   // 요소 상단이 화면 하단에 닿으면 시작
            end: "bottom top",     // 요소 하단이 화면 상단에 닿으면 끝
            scrub: true            // 스크롤 위치와 애니메이션 동기화
            // markers: true       // 디버깅용, 배포 시 제거
        }
    });
});





//-------------------
// 갤러리
//-------------------
gsap.registerPlugin(ScrollTrigger);

// 스크롤 등장
gsap.utils.toArray(".tile").forEach((tile, i)=>{
  gsap.to(tile, {
    opacity:1,
    y:0,
    duration:0.8,
    delay: i*0.1,
    ease:"power3.out",
    scrollTrigger:{
      trigger: tile,
      start: "top 85%",
      toggleActions:"play none none reverse"
    }
  });
});

// hover: border-radius만 부드럽게 원형
document.querySelectorAll(".tile").forEach(tile=>{
  tile.addEventListener("mouseenter", ()=>{
    tile.style.borderRadius = "50%";
  });

  tile.addEventListener("mouseleave", ()=>{
    tile.style.borderRadius = "28px";
  });
});

// 마우스 무빙 인터랙션
const gallery = document.querySelector(".gallery");
const tiles = document.querySelectorAll(".tile");

// 각 타일에 랜덤 강도 부여 (움직임 차이 줌)
const effects = Array.from(tiles).map(() => ({
  strengthX: 10 + Math.random() * 15,
  strengthY: 10 + Math.random() * 15,
  rotation: 4 + Math.random() * 4,
  delay: 0.2 + Math.random() * 0.3
}));

// gsap.quickTo 세팅 (각 타일의 x,y,rotateX,rotateY를 빠르게 업데이트)
const animators = Array.from(tiles).map(tile => ({
  x: gsap.quickTo(tile, "x", { duration: 0.4, ease: "power2.out" }),
  y: gsap.quickTo(tile, "y", { duration: 0.4, ease: "power2.out" }),
  rx: gsap.quickTo(tile, "rotateX", { duration: 0.4, ease: "power2.out" }),
  ry: gsap.quickTo(tile, "rotateY", { duration: 0.4, ease: "power2.out" })
}));

let mouse = { x: 0, y: 0 };
let ticking = false;

gallery.addEventListener("mousemove", (e) => {
  const rect = gallery.getBoundingClientRect();
  mouse.x = (e.clientX - rect.left) / rect.width - 0.5;
  mouse.y = (e.clientY - rect.top) / rect.height - 0.5;

  if (!ticking) {
    requestAnimationFrame(updateTiles);
    ticking = true;
  }
});

function updateTiles() {
  tiles.forEach((tile, i) => {
    const { strengthX, strengthY, rotation } = effects[i];
    const { x, y, rx, ry } = animators[i];

    x(mouse.x * strengthX);
    y(mouse.y * strengthY);
    rx(-mouse.y * rotation);
    ry(mouse.x * rotation);
  });
  ticking = false;
}

gallery.addEventListener("mouseleave", () => {
  tiles.forEach((tile, i) => {
    gsap.to(tile, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      ease: "power3.out",
      duration: effects[i].delay
    });
  });
});

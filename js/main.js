////////////////////////////////////////////////////////////////////////////////////////
// Intersection Observer フェードイン
///////////////////////////////////////////////////////////////////////////////////////
// function initIntersectionObserver() {
//   const fadeIn = document.querySelectorAll(".fadeIn");
//   if (fadeIn.length === 0) return;

//   const options = {
//     rootMargin: "0px",
//     threshold: 0.6,
//   };

//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add("active");
//       }
//     });
//   }, options);

//   fadeIn.forEach((element) => {
//     observer.observe(element);
//   });
// }

////////////////////////////////////////////////////////////////////////////////////////
// Swiper
///////////////////////////////////////////////////////////////////////////////////////
function initSwipers() {
  const worksElement = document.querySelector(".swiper-works");
  if (worksElement) {
    new Swiper(".swiper-works", {
      loop: true,
      speed: 1000,
      allowTouchMove: false,
      slidesPerView: 1.4,
      spaceBetween: 9,
      centeredSlides: true, // アクティブなスライドを中央にする
      // 自動再生
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      // ページネーション
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      // 前後の矢印
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        767: {
          slidesPerView: "2.2",
        },
        1100: {
          slidesPerView: "3.4",
        },
      },
    });
  }

  const voiceElement = document.querySelector(".swiper-voice");
  if (voiceElement) {
    new Swiper(".swiper-voice", {
      loop: true,
      speed: 1000,
      allowTouchMove: false,
      slidesPerView: 1.2,
      spaceBetween: 10,
      centeredSlides: true, // アクティブなスライドを中央にする
      // 自動再生
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      // ページネーション
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      // 前後の矢印
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        767: {
          slidesPerView: "2.2",
          spaceBetween: 40,
        },
        1100: {
          slidesPerView: "1.4",
          spaceBetween: 82,
        },
      },
    });
  }
}
// DOM Ready時の初期化
document.addEventListener("DOMContentLoaded", function () {
  // initIntersectionObserver();
  initSwipers();
});

///////////////////////////////////////////
//FAQ アコーディオン
///////////////////////////////////////////
$(".qa-list dd").hide();
$(".qa-list dl").on("click", function (e) {
  $("dd", this).slideToggle("fast");
  if ($(this).hasClass("open")) {
    $(this).removeClass("open");
  } else {
    $(this).addClass("open");
  }
});

////////////////////////////////////////////////////////////////////////////////////////
// GSAP アニメーション
///////////////////////////////////////////////////////////////////////////////////////
// GSAPフェードイン
const textElements = document.querySelectorAll(".fadeIn");
if (textElements.length > 0) {
  textElements.forEach((element) => {
    gsap.from(element, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element, // 各要素をトリガーに
        start: "top 60%",
        once: true,
      },
    });
  });
}

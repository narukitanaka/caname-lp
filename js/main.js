////////////////////////////////////////////////////////////////////////////////////////
// GSAPアニメーション
///////////////////////////////////////////////////////////////////////////////////////
//順番にフェードイン
// document.querySelectorAll(".fade_triger").forEach((trigger) => {
//   gsap.fromTo(
//     trigger.querySelectorAll(".anime-fade"),
//     { opacity: 0, y: -10 },
//     {
//       opacity: 1,
//       y: 0,
//       duration: 0.7,
//       stagger: 0.3, // 順番にフェードインする間隔
//       scrollTrigger: {
//         trigger: trigger,
//         start: "top 50%",
//       },
//     }
//   );
// });

///////////////////////////////////////////
//ハンバーガーメニュー
//////////////////////////////////////////
$(".hambager").on("click", function () {
  navOpen();
});
let navFlg = false;
function navOpen() {
  if (!navFlg) {
    $(".hamberger-wrap").addClass("is-ham-open");
    $(".mega-menu").addClass("is-megamenu-open");
    $("header").addClass("is-megamenu-header");
    navFlg = true;
  } else {
    $(".hamberger-wrap").removeClass("is-ham-open");
    $(".mega-menu").removeClass("is-megamenu-open");
    $("header").removeClass("is-megamenu-header");
    navFlg = false;
  }
}
// ページ内リンクをクリックしたときにメニューを閉じる
$('.mega-menu a[href^="#"]').on("click", function () {
  if (navFlg) {
    navOpen(); // メニューが開いている場合は閉じる
  }
});

////////////////////////////////////////////
//メインビジュアルを過ぎたらheaderが固定表示される
///////////////////////////////////////////
// const fixedheader = document.querySelector(".header");
// // スクロールイベントリスナーを追加
// window.addEventListener("scroll", () => {
//   //.mv要素のトップ位置と高さを取得
//   const mvElement = document.querySelector(".mv");
//   const mvElementTop = mvElement.getBoundingClientRect().top + window.scrollY;
//   const mvElementHeight = mvElement.offsetHeight;
//   // 現在のスクロール位置を取得
//   const scrollPosition = window.scrollY;
//   // スクロール位置が.mv要素の一番下を過ぎた場合にボタンを表示
//   if (scrollPosition > mvElementTop + mvElementHeight) {
//     fixedheader.classList.add("fixed-active");
//   } else {
//     fixedheader.classList.remove("fixed-active");
//   }
// });

///////////////////////////////////////////
//スクロールフェードイン
///////////////////////////////////////////
const fadeIn = document.querySelectorAll(".fadeIn");
const options = {
  rootMargin: "0px",
  threshold: 0.6,
};
const observer = new IntersectionObserver(showElement, options);
fadeIn.forEach((fadeIn) => {
  observer.observe(fadeIn);
});
function showElement(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}

//////////////////////////////////////////////////////////////////////////////
//各Swiperイベントの初期化
//////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", (event) => {
  //実例ギャラリースライダー
  const swiperGallery = new Swiper(".swiper-gallery", {
    loop: true,
    slidesPerView: 2.5,
    speed: 3000,
    allowTouchMove: false,
    freeMode: {
      enabled: true,
      momentum: false,
      sticky: true,
    },
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    direction: "horizontal",
    effect: "slide",
    breakpoints: {
      769: {
        slidesPerView: 4.7,
      },
    },
  });

  //文字の無限スライダー
  // const swiperText = new Swiper(".txt-slider", {
  //   loop: true,
  //   slidesPerView: 0.4,
  //   speed: 12000,
  //   allowTouchMove: false,
  //   spaceBetween: 50,
  //   freeMode: {
  //     enabled: true,
  //     momentum: false,
  //     sticky: true,
  //   },
  //   autoplay: {
  //     delay: 0,
  //     disableOnInteraction: false,
  //   },
  //   direction: "horizontal",
  //   effect: "slide",
  //   breakpoints: {
  //     769: {
  //       slidesPerView: 0.9,
  //     },
  //   },
  // });
});

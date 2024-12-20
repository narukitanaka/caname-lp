////////////////////////////////////////////////////////////////////////////////////////
// GSAPアニメーション
///////////////////////////////////////////////////////////////////////////////////////
gsap.registerPlugin(ScrollTrigger);

gsap.to(".circle", {
  scale: 1, // 最大スケール
  ease: "none",
  scrollTrigger: {
    trigger: ".buis-trigger",
    start: "top bottom", // スクロール開始位置
    // end: "bottom 50%", // スクロール終了位置
    scrub: 1, // スクロールに追従する（1は追従の滑らかさ）
    invalidateOnRefresh: true, // リサイズ時に再計算
  },
});

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
  //Top - PressSwiper
  const topPress = new Swiper(".top-press_swiper", {
    slidesPerView: 1.2,
    loop: true,
    speed: 1000,
    allowTouchMove: false,
    spaceBetween: 20,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      769: {
        slidesPerView: "auto",
        loopedSlides: 3,
      },
    },
    on: {
      beforeInit: function () {
        // ループ用のスライドが追加される前に元のスライド数を保存
        this.params.loopedSlides = document.querySelectorAll(
          ".top-press_swiper .swiper-slide"
        ).length;
      },
    },
  });

  //Under - PressSwiper
  const underPress = new Swiper(".p-projects_swiper", {
    slidesPerView: 1.2,
    loop: true,
    speed: 1000,
    allowTouchMove: false,
    spaceBetween: 14,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      769: {
        slidesPerView: "3.4",
        loopedSlides: 5,
      },
    },
    on: {
      beforeInit: function () {
        // ループ用のスライドが追加される前に元のスライド数を保存
        this.params.loopedSlides = document.querySelectorAll(
          ".p-projects_swiper .swiper-slide"
        ).length;
      },
    },
  });
});

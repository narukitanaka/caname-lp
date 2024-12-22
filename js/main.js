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

gsap.to(".con-logo", {
  y: -500,
  ease: "none",
  scrollTrigger: {
    trigger: ".con-logo",
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

//ハンバーガーメニュー アコーディオン
///////////////////////////////////////////
$(document).ready(function () {
  $(".little-nav").hide();
  $(".nav-area .parent").on("click", function () {
    $(this).toggleClass("active");
    $(this).next(".little-nav").slideToggle(300);
  });
});

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
  //文字の無限スライダー
  const swiperText = new Swiper(".member_txtslider", {
    loop: true,
    slidesPerView: 0.8,
    speed: 40000,
    allowTouchMove: false,
    spaceBetween: 50,
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
        slidesPerView: 2,
      },
    },
  });
});

//////////////////////////////////////////////////////////////////////////////
//Top - XBP Projects　ホバー切り替え
//////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const imgBox = document.querySelector(".top-pjblock .left .img-box img");
  const txtBox = document.querySelector(".top-pjblock .left .txt p");

  // デフォルト値を保存
  const defaultImage = document.querySelector(".top-pjblock .left .img-box")
    .dataset.defaultImage;
  const defaultText = document.querySelector(".top-pjblock .left .txt").dataset
    .defaultText;

  // 各プロジェクトセレクターにホバーイベントを追加
  document.querySelectorAll(".pj-select").forEach((selector) => {
    selector.addEventListener("mouseenter", function () {
      const projectImage = this.dataset.image;
      const projectText = this.dataset.text;

      // フェードアウト
      imgBox.style.opacity = 0;
      txtBox.style.opacity = 0;

      // 0.1秒後に新しいコンテンツをセット
      setTimeout(() => {
        imgBox.src = projectImage;
        txtBox.textContent = projectText;

        // フェードイン
        imgBox.style.opacity = 1;
        txtBox.style.opacity = 1;
      }, 100);
    });

    selector.addEventListener("mouseleave", function () {
      // フェードアウト
      imgBox.style.opacity = 0;
      txtBox.style.opacity = 0;

      // 0.1秒後にデフォルトコンテンツに戻す
      setTimeout(() => {
        imgBox.src = defaultImage;
        txtBox.textContent = defaultText;

        // フェードイン
        imgBox.style.opacity = 1;
        txtBox.style.opacity = 1;
      }, 100);
    });
  });
});

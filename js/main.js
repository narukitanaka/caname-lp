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
    scrub: 1, // スクロールに追従する（1は追従の滑らかさ）
    invalidateOnRefresh: true, // リサイズ時に再計算
  },
});

// h1のテキストを1文字ずつspanで囲む（brタグを考慮）
const h1 = document.querySelector(".wrap_concept h1");
const h1Text = h1.innerHTML;
// テキストをbrタグで分割して処理
const lines = h1Text.split(/<br\s*\/?>/);
const wrappedLines = lines.map((line) => {
  return line
    .split("")
    .map((char) => {
      if (char.trim() === "") return char; // 空白はそのまま返す
      return `<span>${char}</span>`;
    })
    .join("");
});
// brタグを入れて結合
h1.innerHTML = wrappedLines.join("<br>");

// 概念セクションのアニメーション設定
const conceptSection = document.querySelector(".wrap_concept");
// 白いオーバーレイ要素を作成して追加
const whiteOverlay = document.createElement("div");
whiteOverlay.className = "white-overlay";
conceptSection.appendChild(whiteOverlay);

// タイムラインの作成
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: conceptSection,
    start: "top 50%",
    once: true,
  },
});

// タイムラインにアニメーションを追加
tl.to(whiteOverlay, {
  scaleY: 0,
  duration: 1,
  ease: "power2.inOut",
}).from(
  ".wrap_concept h1 span",
  {
    y: 20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
  },
  "<=0.01"
); // 白いオーバーレイのアニメーション終了0.３秒前から開始

//コンセプトーテキストフェードイン
const textElements = document.querySelectorAll(".gsapfadeIn span");
gsap.from(textElements, {
  opacity: 0,
  y: 20,
  duration: 0.8,
  stagger: 0.2, // 各要素の開始タイミングをずらす
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".gsapfadeIn",
    start: "top 60%", // 要素のトップが画面の上から20%の位置に来たとき
    once: true, // 1回だけ実行
  },
});

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
document.querySelectorAll(".topmember-fade_triger").forEach((trigger) => {
  const elements = trigger.querySelectorAll(".topmember-anime-fade");

  elements.forEach((element, index) => {
    const isEven = (index + 1) % 2 === 0;
    const baseY = 20; // 下からフェードインする距離を調整
    const finalY = isEven ? 68 : 0;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: baseY + (isEven ? 68 : 0), // 初期位置を最終位置からの相対位置に
      },
      {
        opacity: 1,
        y: finalY,
        duration: 1, // アニメーション時間を少し長く
        delay: index * 0.2, // 遅延時間を少し短く
        ease: "power2.out", // よりなめらかなイージング
        scrollTrigger: {
          trigger: trigger,
          start: "top 60%", // トリガー位置を少し下に
          toggleActions: "play none none reverse", // スクロール戻したときの動作を設定
        },
      }
    );
  });
});

///////////////////////////////////////////
//ハンバーガーメニュー
//////////////////////////////////////////
gsap.set(".ham-manulist", {
  y: 20,
  opacity: 0,
});
$(".hambager").on("click", function () {
  navOpen();
});
let navFlg = false;
function navOpen() {
  if (!navFlg) {
    $(".hamberger-wrap").addClass("is-ham-open");
    $(".mega-menu").addClass("is-megamenu-open");
    setTimeout(() => {
      gsap.to(".ham-manulist", {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, 300);
    navFlg = true;
  } else {
    $(".hamberger-wrap").removeClass("is-ham-open");
    $(".mega-menu").removeClass("is-megamenu-open");
    gsap.set(".ham-manulist", {
      y: 20,
      opacity: 0,
    });
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

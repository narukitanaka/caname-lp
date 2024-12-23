////////////////////////////////////////////////////////////////////////////////////////
// GSAPアニメーション
///////////////////////////////////////////////////////////////////////////////////////
gsap.registerPlugin(ScrollTrigger);

// 共通のGSAPアニメーション
function initCommonGsapAnimations() {
  // Circle animation
  const circleElement = document.querySelector(".circle");
  const buisTrigger = document.querySelector(".buis-trigger");
  if (circleElement && buisTrigger) {
    gsap.to(".circle", {
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".buis-trigger",
        start: "top bottom",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  }

  // Con-logo animation
  const conLogo = document.querySelector(".con-logo");
  if (conLogo) {
    gsap.to(".con-logo", {
      y: -500,
      ease: "none",
      scrollTrigger: {
        trigger: ".con-logo",
        start: "top bottom",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  }
}

// コンセプトセクションのアニメーション
function initConceptAnimation() {
  const h1 = document.querySelector(".wrap_concept h1");
  if (!h1) return;

  try {
    // テキストを1文字ずつspanで囲む
    const h1Text = h1.innerHTML;
    const lines = h1Text.split(/<br\s*\/?>/);
    const wrappedLines = lines.map((line) => {
      return line
        .split("")
        .map((char) => {
          if (char.trim() === "") return char;
          return `<span>${char}</span>`;
        })
        .join("");
    });
    h1.innerHTML = wrappedLines.join("<br>");

    // 概念セクションのアニメーション設定
    const conceptSection = document.querySelector(".wrap_concept");
    const whiteOverlay = document.createElement("div");
    whiteOverlay.className = "white-overlay";
    conceptSection.appendChild(whiteOverlay);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: conceptSection,
        start: "top 50%",
        once: true,
      },
    });

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
    );
  } catch (error) {
    console.warn("Concept animation error:", error);
  }
}

// ページ遷移アニメーション
function initializeTransition() {
  const panels = gsap.utils.toArray(".transition-panel");
  // 初期状態を設定（画面を覆った状態から開始）
  gsap.set(panels, {
    scaleY: 1,
    transformOrigin: "top",
  });
  // ページ読み込み完了時のアニメーション
  gsap.to(panels, {
    scaleY: 0,
    duration: 0.75,
    stagger: 0.1,
    ease: "power2.inOut",
    delay: 0.2, // コンテンツの読み込みを待つ
  });
}
// ページを離れるときのアニメーション
window.addEventListener("beforeunload", () => {
  const panels = gsap.utils.toArray(".transition-panel");
  // アニメーションをすぐに実行
  gsap.to(panels, {
    scaleY: 1,
    duration: 0.5,
    stagger: 0.1,
    ease: "power2.in",
    transformOrigin: "bottom",
  });
});
// ブラウザバック時の処理
window.addEventListener("pageshow", (e) => {
  if (e.persisted) {
    const panels = gsap.utils.toArray(".transition-panel");
    // バック時は上から下に消える
    gsap.to(panels, {
      scaleY: 0,
      duration: 0.75,
      stagger: 0.1,
      ease: "power2.inOut",
      transformOrigin: "top",
    });
  }
});

////////////////////////////////////////////////////////////////////////////////////////
// フェードイン
///////////////////////////////////////////////////////////////////////////////////////
function initFadeInAnimations() {
  // GSAPフェードイン
  const textElements = document.querySelectorAll(".gsapfadeIn span");
  if (textElements.length > 0) {
    gsap.from(textElements, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".gsapfadeIn",
        start: "top 60%",
        once: true,
      },
    });
  }

  // GSAPフェードイン（順番に汎用）
  const saggerElements = document.querySelectorAll(".fadeInStagger");
  if (saggerElements.length > 0) {
    gsap.from(saggerElements, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".staggerTriger",
        start: "top 60%",
        once: true,
      },
    });
  }

  // トップメンバーフェードイン
  document.querySelectorAll(".topmember-fade_triger").forEach((trigger) => {
    const elements = trigger.querySelectorAll(".topmember-anime-fade");
    if (elements.length === 0) return;
    elements.forEach((element, index) => {
      const isEven = (index + 1) % 2 === 0;
      const baseY = 20;
      const finalY = isEven ? 68 : 0;
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: baseY + (isEven ? 68 : 0),
        },
        {
          opacity: 1,
          y: finalY,
          duration: 1,
          delay: index * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: trigger,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  });
}

////////////////////////////////////////////////////////////////////////////////////////
// ハンバーガーメニュー
///////////////////////////////////////////////////////////////////////////////////////
let navFlg = false;
function initHamburgerMenu() {
  // 初期状態を設定
  gsap.set(".ham-manulist", {
    y: 20,
    opacity: 0,
  });
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
  // ハンバーガーボタンのクリックイベント（jQueryで設定）
  $(".hambager").on("click", function () {
    navOpen();
  });
  // アコーディオンメニューの設定
  $(".little-nav").hide();
  $(".nav-area .parent").on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("active");
    $(this).next(".little-nav").slideToggle(300);
  });
  // ページ内リンクのクリックイベント
  $('.mega-menu a[href^="#"]').on("click", function () {
    if (navFlg) {
      navOpen(); // メニューを閉じる
    }
  });
}

////////////////////////////////////////////////////////////////////////////////////////
// Intersection Observer フェードイン
///////////////////////////////////////////////////////////////////////////////////////
function initIntersectionObserver() {
  const fadeIn = document.querySelectorAll(".fadeIn");
  if (fadeIn.length === 0) return;

  const options = {
    rootMargin: "0px",
    threshold: 0.6,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, options);

  fadeIn.forEach((element) => {
    observer.observe(element);
  });
}

////////////////////////////////////////////////////////////////////////////////////////
// Swiper
///////////////////////////////////////////////////////////////////////////////////////
function initSwipers() {
  // Top Press Swiper
  const topPressElement = document.querySelector(".top-press_swiper");
  if (topPressElement) {
    new Swiper(".top-press_swiper", {
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
          this.params.loopedSlides = document.querySelectorAll(
            ".top-press_swiper .swiper-slide"
          ).length;
        },
      },
    });
  }

  // Under Press Swiper
  const underPressElement = document.querySelector(".p-projects_swiper");
  if (underPressElement) {
    new Swiper(".p-projects_swiper", {
      slidesPerView: 1.1,
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
          this.params.loopedSlides = document.querySelectorAll(
            ".p-projects_swiper .swiper-slide"
          ).length;
        },
      },
    });
  }

  // Member Text Slider
  const memberSliderElement = document.querySelector(".member_txtslider");
  if (memberSliderElement) {
    new Swiper(".member_txtslider", {
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
  }
}

////////////////////////////////////////////////////////////////////////////////////////
// Projects ホバー効果
///////////////////////////////////////////////////////////////////////////////////////
function initProjectHover() {
  const imgBox = document.querySelector(".top-pjblock .left .img-box img");
  const txtBox = document.querySelector(".top-pjblock .left .txt p");
  const imgBoxParent = document.querySelector(".top-pjblock .left .img-box");
  const txtBoxParent = document.querySelector(".top-pjblock .left .txt");

  if (!imgBox || !txtBox || !imgBoxParent || !txtBoxParent) return;

  const defaultImage = imgBoxParent.dataset.defaultImage;
  const defaultText = txtBoxParent.dataset.defaultText;

  document.querySelectorAll(".pj-select").forEach((selector) => {
    selector.addEventListener("mouseenter", function () {
      const projectImage = this.dataset.image;
      const projectText = this.dataset.text;

      imgBox.style.opacity = 0;
      txtBox.style.opacity = 0;

      setTimeout(() => {
        imgBox.src = projectImage;
        txtBox.textContent = projectText;
        imgBox.style.opacity = 1;
        txtBox.style.opacity = 1;
      }, 100);
    });

    selector.addEventListener("mouseleave", function () {
      imgBox.style.opacity = 0;
      txtBox.style.opacity = 0;

      setTimeout(() => {
        imgBox.src = defaultImage;
        txtBox.textContent = defaultText;
        imgBox.style.opacity = 1;
        txtBox.style.opacity = 1;
      }, 100);
    });
  });
}

// DOM Ready時の初期化
document.addEventListener("DOMContentLoaded", function () {
  initCommonGsapAnimations();
  initConceptAnimation();
  initializeTransition();
  initFadeInAnimations();
  initHamburgerMenu();
  initIntersectionObserver();
  initSwipers();
  initProjectHover();
});

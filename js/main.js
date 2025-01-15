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
    });
  }
}

// DOM Ready時の初期化
document.addEventListener("DOMContentLoaded", function () {
  initIntersectionObserver();
  initSwipers();
});

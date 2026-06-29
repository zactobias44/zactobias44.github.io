(function () {
  "use strict";

  function initCarousel(carousel) {
    var slides = Array.prototype.slice.call(
      carousel.querySelectorAll("[data-carousel-slide]")
    );
    var dots = Array.prototype.slice.call(
      carousel.querySelectorAll("[data-carousel-dot]")
    );
    var toggle = carousel.querySelector("[data-carousel-toggle]");
    var toggleIcon = carousel.querySelector("[data-carousel-toggle-icon]");
    var interval = parseInt(carousel.getAttribute("data-carousel-interval"), 10);
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    var activeIndex = 0;
    var timer = null;
    var manuallyPaused = false;
    var temporarilyPaused = false;

    if (slides.length < 2) {
      if (toggle) {
        toggle.hidden = true;
      }
      return;
    }

    if (!Number.isFinite(interval) || interval < 3000) {
      interval = 7000;
    }

    function loadImage(index) {
      var image = slides[index].querySelector("img[data-src]");
      if (image) {
        image.src = image.getAttribute("data-src");
        image.removeAttribute("data-src");
        image.loading = "eager";
      }
    }

    function render(index) {
      activeIndex = (index + slides.length) % slides.length;
      loadImage(activeIndex);
      loadImage((activeIndex + 1) % slides.length);

      slides.forEach(function (slide, slideIndex) {
        var isActive = slideIndex === activeIndex;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", isActive ? "false" : "true");
      });

      dots.forEach(function (dot, dotIndex) {
        var isActive = dotIndex === activeIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-current", isActive ? "true" : "false");
      });

    }

    function stop() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    function start() {
      stop();
      if (
        manuallyPaused ||
        temporarilyPaused ||
        reducedMotion.matches ||
        document.hidden
      ) {
        return;
      }

      timer = window.setInterval(function () {
        render(activeIndex + 1);
      }, interval);
    }

    function updateToggle() {
      if (!toggle) {
        return;
      }

      toggle.hidden = reducedMotion.matches;
      toggle.setAttribute(
        "aria-label",
        manuallyPaused ? "Play slideshow" : "Pause slideshow"
      );
      toggle.classList.toggle("is-paused", manuallyPaused);

      if (toggleIcon) {
        toggleIcon.textContent = manuallyPaused ? "▶" : "Ⅱ";
      }
    }

    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        render(parseInt(dot.getAttribute("data-slide-index"), 10));
        start();
      });
    });

    if (toggle) {
      toggle.addEventListener("click", function () {
        manuallyPaused = !manuallyPaused;
        updateToggle();
        start();
      });
    }

    carousel.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        render(activeIndex - 1);
        start();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        render(activeIndex + 1);
        start();
      }
    });

    carousel.addEventListener("mouseenter", function () {
      temporarilyPaused = true;
      stop();
    });

    carousel.addEventListener("mouseleave", function () {
      temporarilyPaused = false;
      start();
    });

    carousel.addEventListener("focusin", function () {
      temporarilyPaused = true;
      stop();
    });

    carousel.addEventListener("focusout", function () {
      window.setTimeout(function () {
        if (!carousel.contains(document.activeElement)) {
          temporarilyPaused = false;
          start();
        }
      }, 0);
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    });

    if (typeof reducedMotion.addEventListener === "function") {
      reducedMotion.addEventListener("change", function () {
        updateToggle();
        start();
      });
    }

    updateToggle();
    render(0);
    start();
  }

  function initHomeCarousels() {
    document.querySelectorAll("[data-home-carousel]").forEach(initCarousel);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHomeCarousels);
  } else {
    initHomeCarousels();
  }
})();

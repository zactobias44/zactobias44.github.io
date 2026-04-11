(function () {
  function prettifyCaption(path) {
    var filename = path.split("/").pop() || "";
    var stem = filename.replace(/\.[^.]+$/, "");
    return stem.replace(/[-_]+/g, " ").trim();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var galleryRoot = document.querySelector("[data-gallery-lightbox]");
    if (!galleryRoot) {
      return;
    }

    var triggerNodes = Array.prototype.slice.call(
      galleryRoot.querySelectorAll("[data-gallery-image]")
    );

    if (!triggerNodes.length) {
      return;
    }

    var overlay = document.querySelector("[data-lightbox-overlay]");
    var imageNode = overlay.querySelector("[data-lightbox-image]");
    var captionNode = overlay.querySelector("[data-lightbox-caption]");
    var prevNode = overlay.querySelector("[data-lightbox-prev]");
    var nextNode = overlay.querySelector("[data-lightbox-next]");
    var closeNodes = overlay.querySelectorAll("[data-lightbox-close]");
    var currentIndex = 0;

    function render(index) {
      currentIndex = (index + triggerNodes.length) % triggerNodes.length;
      var activeNode = triggerNodes[currentIndex];
      imageNode.src = activeNode.getAttribute("data-full-image");
      imageNode.alt = activeNode.getAttribute("data-image-alt") || "";
      captionNode.textContent =
        activeNode.getAttribute("data-image-caption") ||
        prettifyCaption(activeNode.getAttribute("data-full-image"));
    }

    function openLightbox(index) {
      render(index);
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
      document.body.classList.add("gallery-lightbox-open");
    }

    function closeLightbox() {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      document.body.classList.remove("gallery-lightbox-open");
      imageNode.removeAttribute("src");
    }

    triggerNodes.forEach(function (node, index) {
      node.addEventListener("click", function () {
        openLightbox(index);
      });
    });

    prevNode.addEventListener("click", function () {
      render(currentIndex - 1);
    });

    nextNode.addEventListener("click", function () {
      render(currentIndex + 1);
    });

    closeNodes.forEach(function (node) {
      node.addEventListener("click", closeLightbox);
    });

    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (!overlay.classList.contains("is-open")) {
        return;
      }

      if (event.key === "Escape") {
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        render(currentIndex - 1);
      } else if (event.key === "ArrowRight") {
        render(currentIndex + 1);
      }
    });
  });
})();

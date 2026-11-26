const enterButton = document.querySelector("#enter-button");
const lightbox = document.querySelector("#photo-lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const lightboxCloseButton = document.querySelector("#lightbox-close");
const memoryImages = document.querySelectorAll(".memory-photo__trigger img");
let lastFocusedTrigger = null;

if (enterButton) {
  enterButton.addEventListener("click", () => {
    window.location.assign("story.html");
  });
}

memoryImages.forEach((image) => {
  const usePlaceholder = () => {
    if (image.getAttribute("src") !== image.dataset.fallbackSrc) {
      image.src = image.dataset.fallbackSrc;
    }
  };

  image.addEventListener("error", usePlaceholder);
  if (image.complete && image.naturalWidth === 0) {
    usePlaceholder();
  }
});

if (lightbox && lightboxImage && lightboxCaption && lightboxCloseButton) {
  document.querySelectorAll(".memory-photo__trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const image = trigger.querySelector("img");
      const caption = trigger.closest("figure").querySelector("figcaption");

      lastFocusedTrigger = trigger;
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightboxCaption.textContent = caption.textContent;
      lightbox.showModal();
    });
  });

  lightboxCloseButton.addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.close();
    }
  });
  lightbox.addEventListener("close", () => {
    if (lastFocusedTrigger) {
      lastFocusedTrigger.focus();
    }
  });
}

const revealElements = document.querySelectorAll(".reveal");
document.documentElement.classList.add("js");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -35px 0px" }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

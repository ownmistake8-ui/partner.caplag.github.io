(function(){const autoPlay = true;
const autoPlayInterval = 4000;
const images = [{"src":"/images/pages/authorization.png","alt":"Авторизация"},{"src":"/images/pages/competitions.png","alt":"Соревнования"},{"src":"/images/pages/competiton_end.png","alt":"Страница соревнования"},{"src":"/images/pages/history.png","alt":"История"},{"src":"/images/pages/profile.png","alt":"Профиль"}];

  let currentIndex = 0;
  let autoPlayTimer = null;

  function updateImage(index) {
    const imageElement = document.getElementById("slider-image");
    const titleElement = document.getElementById("image-title");
    const indicators = document.querySelectorAll("[data-index]");

    if (imageElement && titleElement && indicators.length > 0) {
      imageElement.src = images[index].src;
      imageElement.alt = images[index].alt;
      titleElement.textContent = images[index].alt;

      indicators.forEach((indicator, i) => {
        if (i === index) {
          indicator.classList.add("active");
        } else {
          indicator.classList.remove("active");
        }
      });

      currentIndex = index;
    }
  }

  function nextImage() {
    const nextIndex = (currentIndex + 1) % images.length;
    updateImage(nextIndex);
  }

  function prevImage() {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    updateImage(prevIndex);
  }

  function goToImage(index) {
    updateImage(index);
  }

  function startAutoPlay() {
    if (!autoPlay) return;

    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
    }
    autoPlayTimer = setInterval(() => {
      nextImage();
    }, autoPlayInterval);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  function handleKeydown(event) {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        prevImage();
        break;
      case "ArrowRight":
        event.preventDefault();
        nextImage();
        break;
      case " ":
        event.preventDefault();
        if (autoPlayTimer) {
          stopAutoPlay();
        } else {
          startAutoPlay();
        }
        break;
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("keydown", handleKeydown);

    const sliderElement = document.querySelector(".slider__image-wrapper");
    if (sliderElement) {
      sliderElement.addEventListener("mouseenter", stopAutoPlay);
      sliderElement.addEventListener("mouseleave", startAutoPlay);
    }

    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");

    if (prevButton) {
      prevButton.addEventListener("mouseover", stopAutoPlay);
      prevButton.addEventListener("mouseout", startAutoPlay);
      prevButton.addEventListener("focus", stopAutoPlay);
      prevButton.addEventListener("blur", startAutoPlay);
    }

    if (nextButton) {
      nextButton.addEventListener("mouseover", stopAutoPlay);
      nextButton.addEventListener("mouseout", startAutoPlay);
      nextButton.addEventListener("focus", stopAutoPlay);
      nextButton.addEventListener("blur", startAutoPlay);
    }

    const indicators = document.querySelectorAll("[data-index]");
    indicators.forEach((indicator) => {
      indicator.addEventListener("mouseenter", stopAutoPlay);
      indicator.addEventListener("mouseleave", startAutoPlay);
    });

    if (autoPlay) {
      startAutoPlay();
    }
  });

  window.nextImage = nextImage;
  window.prevImage = prevImage;
  window.goToImage = goToImage;
})();

export function goToSlide(slides, slideIndex) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slideIndex)}%)`;

    const content = s.querySelector(".book__slide-content");
    if (!content) return;
    if (i === slideIndex) {
      content.classList.add("active");
    } else {
      content.classList.remove("active");
    }
  });
}

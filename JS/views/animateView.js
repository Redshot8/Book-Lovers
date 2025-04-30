class animateView {
  observer = new IntersectionObserver(
    (entries, observe) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observe.unobserve(entry.target);
        }
      });
    },
    { root: null, threshold: 0.2 }
  );

  init() {
    this.animate = document.querySelectorAll(".animate");
    this.animate.forEach((el) => this.observer.observe(el));
  }
}

export default new animateView();

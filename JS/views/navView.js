class navView {
  header = document.querySelector(".header");
  nav = document.querySelector(".header__section-top");

  obserHeader() {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) {
          this.nav.classList.add("sticky");
        } else {
          this.nav.classList.remove("sticky");
        }
      },
      {
        root: null,
        threshold: 0.5,
        rootMargin: "10%",
      }
    );

    observer.observe(this.header);
  }
}

export default new navView();

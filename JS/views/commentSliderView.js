import { goToSlide } from "../controllers/slideController.js";

class CommentSliderView {
  slider = document.querySelector(".slider");
  slides = document.querySelectorAll(".slide");
  btnRight = document.querySelector(".slider__btn-right");
  btnLeft = document.querySelector(".slider__btn-left");
  curslide = 0;
  mmaxSlide = this.slides.length - 1;

  constructor() {
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
  }

  nextSlide() {
    if (this.curslide === this.mmaxSlide) {
      this.curslide = 0;
    } else {
      this.curslide++;
    }
    goToSlide(this.slides, this.curslide);
  }
  prevSlide() {
    if (this.curslide === 0) {
      this.curslide === this.mmaxSlide;
    } else {
      this.curslide--;
    }
    goToSlide(this.slides, this.curslide);
  }
  init() {
    this.btnRight.addEventListener("click", this.nextSlide);
    this.btnLeft.addEventListener("click", this.prevSlide);
    goToSlide(this.slides, this.curslide);
  }
}

export default new CommentSliderView();

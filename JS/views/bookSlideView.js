import { goToSlide } from "../controllers/slideController.js";
class BookSlideView {
  Slider = document.querySelector(".book__slider");
  slide = document.querySelectorAll(".book__slide");
  SliderRightBtn = document.querySelector(".book__slider-right");
  SliderLeftBtn = document.querySelector(".book__slider-left");
  curSlide = 0;
  maxSlide = this.slide.length - 1;
  autoNext;
  //////////////////
  constructor() {
    this.nextSlide = this.nextSlide.bind(this);
    this.pervSlide = this.pervSlide.bind(this);
    this.autoSlide();
  }
  nextSlide() {
    if (this.curSlide === this.maxSlide) {
      this.curSlide = 0;
    } else {
      this.curSlide++;
    }
    // clearInterval(this.autoNext);
    // this.autoNext = setInterval(() => {
    //   this.SliderRightBtn.click();
    // }, 5000);
    this.autoSlide();
    goToSlide(this.slide, this.curSlide);
  }
  pervSlide() {
    if (this.curSlide === 0) {
      this.curSlide = this.maxSlide;
    } else {
      this.curSlide--;
    }
   this.autoSlide();
    goToSlide(this.slide, this.curSlide);
  }

  autoSlide() {
    clearInterval(this.autoNext);
    this.autoNext = setInterval(() => {
      this.SliderRightBtn.click();
    }, 5000);
  }

  init() {
    this.SliderRightBtn.addEventListener("click", this.nextSlide);
    this.SliderLeftBtn.addEventListener("click", this.pervSlide);
    goToSlide(this.slide, this.curSlide);
  }
}

export default new BookSlideView();

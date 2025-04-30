class NumberController {
  formatToPersian(num) {
    return new Intl.NumberFormat("fa-IR").format(num);
  }
  formatToEnglish(num) {
    return new Intl.NumberFormat("en-US").format(num);
  }
}

export default new NumberController();

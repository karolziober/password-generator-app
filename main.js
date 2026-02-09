class Generator {
  constructor() {
    this.slider = document.getElementById("slider");
    this.sliderOutput = document.getElementById("slider-output");
    this.init();
  }

  init() {
    this.sliderHandling();
  }

  sliderHandling() {
    this.slider.addEventListener("input", () => {
      const sliderValue = (this.slider.value / this.slider.max) * 100;
      this.slider.style.setProperty("--fill-percent", `${sliderValue}%`);
      this.sliderOutput.textContent = this.slider.value;
    });
  }
}
new Generator();

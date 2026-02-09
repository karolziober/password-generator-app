class Generator {
  constructor() {
    //// DATA
    this.UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
    this.NUMBERS = "0123456789";
    this.SYMBOLS = "!@#$%^&*()-_=+[]{}|;:,.<>?/~";
    this.DATASET = {
      "upper-case": this.UPPERCASE,
      "lower-case": this.LOWERCASE,
      numbers: this.NUMBERS,
      symbols: this.SYMBOLS,
    };

    //// SELECTORS
    // Slider
    this.slider = document.getElementById("slider");
    this.sliderOutput = document.getElementById("slider-output");

    // Checkboxes
    this.checkboxesAll = document.querySelectorAll(".generator__checkbox");
    this.upperCaseCheck = document.getElementById("upper-case");
    this.lowerCaseCheck = document.getElementById("lower-case");
    this.numbersCheck = document.getElementById("numbers");
    this.symbolsCheck = document.getElementById("symbols");

    // Generate
    this.generateBtn = document.getElementById("generatePW");
    //// INIT
    this.init();
  }

  init() {
    this.sliderHandling();
    this.passwordGen();
  }

  sliderHandling() {
    this.slider.addEventListener("input", () => {
      const sliderValue = (this.slider.value / this.slider.max) * 100;
      this.slider.style.setProperty("--fill-percent", `${sliderValue}%`);
      this.sliderOutput.textContent = this.slider.value;
    });
  }

  passwordGen() {
    this.generateBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // COLLECT INPUT
      const charLength = Number(this.slider.value);
      if (charLength > 0) {
        let options = [];
        this.checkboxesAll.forEach((item) => {
          item.checked ? options.push(this.DATASET[item.id]) : null;
        });
        const remaining = options.join("");

        // RANDOM FROM EACH SELECTED CHECKBOX
        const pwSet = [];
        for (const option of options) {
          const x = Math.floor(Math.random() * option.length);
          pwSet.push(option[x]);
        }

        console.log(charLength - pwSet.length);
      }
    });
  }
}
new Generator();

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

    // PW OUTPUT
    this.pwOutput = document.querySelector(".password-display__text");
    this.copyPW = document.getElementById("copyPW");
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
    this.passwordCopy();
  }

  sliderHandling() {
    this.slider.addEventListener("input", () => {
      const sliderValue =
        ((this.slider.value - this.slider.min) /
          (this.slider.max - this.slider.min)) *
        100;
      this.slider.style.setProperty("--fill-percent", `${sliderValue}%`);
      this.sliderOutput.textContent = this.slider.value;
    });
  }

  arrayShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      [array[i], array[random]] = [array[random], array[i]];
    }
    return array;
  }

  randomCharacter(array) {
    return Math.floor(Math.random() * array.length);
  }

  passwordGen() {
    this.generateBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // COLLECT INPUT
      const charLength = Number(this.slider.value);

      let options = [];
      this.checkboxesAll.forEach((item) => {
        item.checked ? options.push(this.DATASET[item.id]) : null;
      });

      if (options.length > 0) {
        const remaining = options.join("");

        // RANDOM FROM EACH SELECTED CHECKBOX
        const charCheckBased = options.map((option) => {
          // const char = Math.floor(Math.random() * option.length);
          const char = this.randomCharacter(option);
          return option[char];
        });

        // RANDOM SELECT FROM REMAINING
        const length = charLength - charCheckBased.length;
        const randomRemaining = Array.from({ length }, () => {
          return remaining[this.randomCharacter(remaining)];
        });

        // PASSWORD OUTPUT
        const concatArray = charCheckBased.concat(randomRemaining);
        this.pwOutput.textContent = this.arrayShuffle(concatArray).join("");
        this.pwOutput.classList.add("active");
      } else {
        this.pwOutput.textContent = "Checkbox is required";
      }
    });
  }

  passwordCopy() {
    this.copyPW.addEventListener("click", () => {
      if (this.pwOutput.textContent !== "P4$5W0rD!") {
        navigator.clipboard.writeText(this.pwOutput.textContent);
      }
    });
  }
}
new Generator();

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
    this.STRENGTH_LEVELS = [
      { minScore: 10, label: "STRONG", color: "--green-200", bars: 4 },
      { minScore: 7, label: "MEDIUM", color: "--yellow-300", bars: 3 },
      { minScore: 4, label: "WEAK", color: "--orange-400", bars: 2 },
      { minScore: 1, label: "TOO WEAK!", color: "--red-500", bars: 1 },
    ];
    this.SLIDER_SCORE = [
      { min: 16, points: 3 },
      { min: 12, points: 2 },
      { min: 8, points: 1 },
    ];

    //// SELECTORS

    // PW OUTPUT
    this.pwOutput = document.querySelector(".password-display__text");
    this.copyPW = document.getElementById("copyPW");
    this.copiedAlert = document.querySelector(".password-display__copied");

    // Slider
    this.slider = document.getElementById("slider");
    this.sliderOutput = document.getElementById("slider-output");

    // Checkboxes
    this.checkboxesAll = document.querySelectorAll(".generator__checkbox");

    // Strength
    this.strenghtLevelText = document.getElementById("strength-meter-text");
    this.strenghtLevelBoxes = document.querySelectorAll(".strength-meter__box");

    // Generate
    this.generateBtn = document.getElementById("generatePW");
    //// INIT
    this.init();
  }

  init() {
    this.sliderHandling();
    this.passwordGen();
    this.passwordCopy();
    this.checkBoxHandling();
    this.updateStrengthMeter();
  }

  sliderHandling() {
    this.slider.addEventListener("input", () => {
      const sliderValue =
        ((this.slider.value - this.slider.min) /
          (this.slider.max - this.slider.min)) *
        100;
      this.slider.style.setProperty("--fill-percent", `${sliderValue}%`);
      this.sliderOutput.textContent = this.slider.value;
      this.updateStrengthMeter();
    });
  }

  checkBoxHandling() {
    this.checkboxesAll.forEach((item) =>
      item.addEventListener("change", () => {
        this.updateStrengthMeter();
      }),
    );
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

      const options = [];
      this.checkboxesAll.forEach((item) => {
        item.checked ? options.push(this.DATASET[item.id]) : null;
      });

      if (options.length > 0) {
        const remaining = options.join("");

        // RANDOM FROM EACH SELECTED CHECKBOX
        const charCheckBased = options.map((option) => {
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
        this.pwOutput.classList.add("password-display__text--generated");

        // SCORE OUTPUT
        this.updateStrengthMeter();
      } else {
        this.pwOutput.textContent = "Checkbox is required";
      }

      this.copiedAlert.style.display = "";
    });
  }

  passwordCopy() {
    this.copyPW.addEventListener("click", () => {
      if (this.pwOutput.textContent !== "P4$5W0rD!") {
        navigator.clipboard.writeText(this.pwOutput.textContent);
        this.copiedAlert.style.display = "block";
      }
    });
  }

  calculateScore() {
    const selectedCheckBoxes = [...this.checkboxesAll].filter(
      (item) => item.checked,
    );

    if (selectedCheckBoxes.length > 0) {
      const checkBoxScore = selectedCheckBoxes.length * 2;

      const sliderScore = this.SLIDER_SCORE.find(
        (item) => Number(this.slider.value) >= item.min,
      ).points;
      return sliderScore + checkBoxScore;
    } else {
      return 0;
    }
  }

  updateStrengthMeter() {
    const score = this.calculateScore();
    const meterObj = this.STRENGTH_LEVELS.find(
      (item) => score >= item.minScore,
    );
    if (meterObj) {
      this.strenghtLevelText.textContent = meterObj.label;

      this.strenghtLevelBoxes.forEach((item, i) => {
        if (i < meterObj.bars) {
          item.style.backgroundColor = `var(${meterObj.color})`;
          item.style.border = `2px solid var(${meterObj.color})`;
        } else {
          item.style.backgroundColor = "";
          item.style.border = `2px solid white`;
        }
      });
    } else {
      this.strenghtLevelText.textContent = "";
      this.strenghtLevelBoxes.forEach((item) => {
        item.style.backgroundColor = "";
        item.style.border = `2px solid white`;
      });
    }
  }
}
new Generator();

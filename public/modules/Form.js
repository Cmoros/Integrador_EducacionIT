export default class Form {
  constructor(formTarget, errors = {}, submitCb = async () => {}) {
    this.errors = errors;
    this.formTarget = formTarget;
    this.inputsToGo = 0;
    this.submitCb = submitCb;
    formTarget.querySelectorAll("[required]").forEach((input) => {
      if (this.errors[input.id]) {
        this.inputsToGo++;
      }
    });
    this.inputsCurrentlyValid = new Set();
    this.init();
  }

  init() {
    this.submitButton = this.formTarget.querySelector(
      '[data-input="submit"]:not(:disabled)'
    );
    this.formTarget.addEventListener("change", (event) => {
      const errorId = event.target.id;
      if (!this.errors[errorId]) return;
      let error = this.errors[errorId];
      let currentTarget = event.target;
      if (this.clearInput(currentTarget)) {
        return;
      }
      this.trimValue(currentTarget);
      let test = error.test?.bind(this) || this.validation;
      if (test(currentTarget, error)) {
        this.displayCheckOnInput(currentTarget);
        currentTarget.required && this.inputsCurrentlyValid.add(currentTarget);
      } else {
        this.modifyInputBackgroundOnError(currentTarget);
        this.displayWarningError(currentTarget, error);
        this.inputsCurrentlyValid.delete(currentTarget);
      }
    });
    this.formTarget.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (this.checkForm(e)) {
        await this.submitCb(e);
      } else {
        e.preventDefault();
      }
    });
  }

  validation(input, error) {
    return error.regExp.test(input.value);
  }

  clearInput(target) {
    if (target.value === "") {
      target.classList.remove("error-display__popup-input-check");
      target.classList.remove("error-display__popup-input-error");
      return true;
    }
    return false;
  }

  trimValue(target) {
    if (target.type == "file") return;
    target.value = target.value.trim();
  }

  checkForm(e) {
    const inputsWithErrors = this.formTarget.querySelectorAll(
      ".error-display__popup-input-error"
    );
    console.warn("Validados:", this.inputsCurrentlyValid.size);
    console.warn("Total a Validar:", this.inputsToGo);
    if (
      this.inputsToGo !== this.inputsCurrentlyValid.size ||
      inputsWithErrors.length > 0
    ) {
      if (inputsWithErrors.length == 0) return false;
      e.preventDefault();
      inputsWithErrors.forEach((input) => {
        this.displayWarningError(input, this.errors[input.id]);
      });
      return false;
    }
    return true;
  }

  hardCheck() {
    this.inputsToGo = 0;
    formTarget.querySelectorAll("[required]").forEach((input) => {
      if (this.errors[input.id]) {
        this.inputsToGo++;
      }
    });
  }

  displayWarningError(target, err) {
    let divError = document.createElement("div");
    divError.classList.add("error-display__popup");
    divError.innerHTML = err.message;
    target.insertAdjacentElement("afterend", divError);
    setTimeout(() => divError.remove(), 3000);
    return divError;
  }

  displayCheckOnInput(target) {
    target.classList.add("error-display__popup-input-check");
    target.classList.remove("error-display__popup-input-error");
  }

  modifyInputBackgroundOnError(target) {
    target.classList.add("error-display__popup-input-error");
    target.classList.remove("error-display__popup-input-check");
  }

  restartForm() {
    this.inputsToGo = 0;
    this.formTarget.querySelectorAll("[required]").forEach((input) => {
      if (this.errors[input.id]) {
        this.inputsToGo++;
      }
    });
    this.inputsCurrentlyValid = new Set();
    this.formTarget
      .querySelectorAll(".error-display__popup-input-error")
      .forEach((input) => {
        input.classList.remove("error-display__popup-input-error");
      });
    this.formTarget
      .querySelectorAll(".error-display__popup-input-check")
      .forEach((input) => {
        input.classList.remove("error-display__popup-input-check");
      });
    this.formTarget.reset();
  }

  getFormData() {
    const data = new FormData(this.formTarget);
    printDataInfo(data);
    return data;
  }
}

const styleArg1 = "color: teal; font-weight: bold; font-size: 1.1em;";
const styleArg2 = "color: pink; background-color: #111; padding: 3px;";

function printDataInfo(data) {
  let keys = data.keys();
  let values = data.values();

  do {
    let key = keys.next();
    let value = values.next();

    if (key.done || value.done) {
      break;
    }

    console.info(
      `%c${key.value}: %c${value.value.toString() || value.value}`,
      styleArg1,
      styleArg2
    );
  } while (true);
}

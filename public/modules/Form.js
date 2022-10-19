export default class Form {
  constructor(formTarget, errors = {}) {
    this.errors = errors;
    this.formTarget = formTarget
    this.inputsToGo = 0
    formTarget.querySelectorAll('input').forEach(input => {
      if (this.errors[input.id] && input.required) {
        this.inputsToGo++;
      }
    })
    this.inputsCurrentlyValid = new Set();
    this.submitButton =
      formTarget.querySelector("input[type=submit]") ||
      formTarget.querySelector("button[type=submit]");
    // for (let errorId in errors) {
    document
      // .querySelector("#" + errorId)
      .addEventListener("change", (event) => {
        const errorId = event.target.id;
        if (!errors[errorId]) return;
        let error = errors[errorId];
        let currentTarget = event.target;
        if (this.clearInput(currentTarget)) {
          return;
        }
        this.trimValue(currentTarget);
        if (
          this.validation(currentTarget.value, error.regExp) /*||
                    e.target.value === ""*/
        ) {
          this.displayCheckOnInput(currentTarget);
          currentTarget.required && this.inputsCurrentlyValid.add(currentTarget);
        } else {
          this.modifyInputBackgroundOnError(currentTarget);
          this.displayWarningError(currentTarget, error);
          this.inputsCurrentlyValid.delete(currentTarget);
          // if (this.inputsToGo !== this.inputsCurrentlyValid.size) {
          //   this.submitButton.disabled = true;
          //   this.submitButton.classList.add("disabled");
          //   this.submitButton.classList.add("disabled--submit");
          // } else {
          //   this.submitButton.disabled = false;
          //   this.submitButton.classList.remove("disabled");
          //   this.submitButton.classList.remove("disabled--submit");
          // }
        }
      });
    this.submitButton.addEventListener("click", (e) => {
      const inputsWithErrors = this.formTarget.querySelectorAll('.error-display__popup-input-error');
      if (this.inputsToGo !== this.inputsCurrentlyValid.size || inputsWithErrors.length > 0) {
        if (inputsWithErrors.length == 0) return;
        // e.preventDefault();
        inputsWithErrors.forEach(input => {
          this.displayWarningError(input, this.errors[input.id])
        })
      }
    });
    // }
  }

  validation(value, regExp) {
    return regExp.test(value);
  }

  clearInput(target) {
    if (target.value === "") {
      target.classList.remove('error-display__popup-input-check');
      target.classList.remove('error-display__popup-input-error');
      return true;
    }
    return false;
  }

  trimValue(target) {
    target.value = target.value.trim();
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
    target.classList.add('error-display__popup-input-check');
    target.classList.remove('error-display__popup-input-error');
  }

  modifyInputBackgroundOnError(target) {
    target.classList.add('error-display__popup-input-error');
    target.classList.remove('error-display__popup-input-check');
  }
}

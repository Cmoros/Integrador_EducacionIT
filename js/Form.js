class Form {
    constructor(formTarget, errors = {}) {
        this.errors = errors;
        this.inputsToGo = Object.keys(errors).length;
        this.inputsCurrentlyValid = new Set();
        this.submitButton = formTarget.querySelector('.form-buttons__submit');

        for (let errorId in errors) {
            formTarget.querySelector("#"+errorId).addEventListener("change", (event) => {
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
                    this.inputsCurrentlyValid.add(currentTarget);
                } else {
                    this.modifyInputBackgroundOnError(currentTarget);
                    this.displayWarningError(currentTarget, error);
                    this.inputsCurrentlyValid.delete(currentTarget);
                }
                if (this.inputsToGo !== this.inputsCurrentlyValid.size) {
                    this.submitButton.disabled = true;
                    this.submitButton.classList.add('disabled');
                    this.submitButton.classList.add('disabled--submit');
                } else {
                    this.submitButton.disabled = false;
                    this.submitButton.classList.remove('disabled');
                    this.submitButton.classList.remove('disabled--submit');
                }
            });
        }
    }
    validation(value, regExp) {
        return regExp.test(value);
    }

    clearInput(target) {
        if (target.value === "") {
            target.style.backgroundImage = "";
            target.style.backgroundColor = "";
            target.style.color = "";
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
        if (target.parentElement.classList.contains("input-group--address")) {
            divError.classList.add("error-display__popup--address");
        }
        setTimeout(() => divError.remove(), 3000);
        return divError;
    }

    displayCheckOnInput(target) {
        target.style.background = "url(./img/check.svg) no-repeat right";
        target.style.backgroundColor = "white";
        target.style.backgroundSize = "1.2em";
        target.style.backgroundPosition = "98% center";
    }

    modifyInputBackgroundOnError(target) {
        target.style.backgroundColor = "#f1c3c4";
        target.style.backgroundImage = "";
    }
}

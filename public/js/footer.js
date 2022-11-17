import Form from "/modules/Form.js";
import popup from "/modules/popup.js";

class Footer {
  constructor() {
    this.HTMLFooter = document.querySelector(".main-footer");
    this.invitationForm = this.HTMLFooter.querySelector(
      ".invitation-newsletter"
    );
    this.formErrors = {
      "invitation-newsletter__input": {
        message: "Debe contener @ y dominio",
        regExp: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      },
    };
    this.form = new Form(
      this.invitationForm,
      this.formErrors,
      async function submitNewsletter(e) {
        e.preventDefault();
        try {
          const result = await fetch("./api/contact/json", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: "Newsletter",
              lastName: "Newsletter",
              email: this.formTarget.querySelector('[name="email"]').value,
              phoneNumber: "999",
              message: "Newsletter",
            }),
          }).then((res) => res.json());
          if (Object.keys(result).length == 0 || result.error) {
            throw new Error(
              "Algo salió mal suscribiéndose al Newsletter. Inténtelo más tarde"
            );
          }
          popup.init(
            `<i class="fa-solid fa-check"></i>¡Gracias por suscribirte a nuestro Newsletter!`
          );
          this.restartForm();
        } catch (e) {
          popup.init(`<i class="fa-solid fa-ban"></i>${e.message}`);
        }
      }
    );
  }
  init() {}
}

const footer = new Footer();
footer.init();

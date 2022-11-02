import Form from "/modules/Form.js";

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
    this.form = new Form(this.invitationForm, this.formErrors);
  }
  init() {}
}

const footer = new Footer();
footer.init();

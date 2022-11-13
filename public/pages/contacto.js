import popup from "../modules/popup.js";
import Spin from "../modules/Spin.js";

export default class PageContacto {
  constructor() {
    this.errors = {
      "contact-name": {
        message: "Campo de 2 a 9 sin caracteres especiales",
        regExp:
          /^([a-zA-ZÁÉÍÓÚÑÜáéíóúñü][a-záéíóúñü]{2,9})(\s[a-zA-ZÁÉÍÓÚÑÜáéíóúñü][a-záéíóúñü]{2,9})?$/,
      },
      "contact-last-name": {
        message: "Campo de 1 a 19 sin caracteres especiales",
        regExp:
          /^([a-zA-ZÁÉÍÓÚÑÜáéíóúñü][A-ZÁÉÍÓÚÑÜa-záéíóúñü']{1,19})(\s[a-zA-ZÁÉÍÓÚÑÜáéíóúñü][A-ZÁÉÍÓÚÑÜa-záéíóúñü']{1,19}$)?$/,
      },
      "contact-email": {
        message: "Campo debe incluir @ y dominio",
        regExp: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      },
      "contact-phone-number": {
        message: "Campo con y sin codigo de área, sin espacios ni guiones",
        regExp:
          /^(\+54|0)?(9[1-9]|[1-9][1-9]|[1-9][1-9][1-9])(\d{4}|\d{3})(\d{4})$/,
      },
      "contact-message": {
        message: "Campo de 30 a 300 caracteres",
        regExp:
          /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"@¿*&%\/,+\-\(\)~?!]{30,300}$/,
      },
    };
    this.contactFormHTML = document.querySelector(".main-form");
  }

  async init() {
    const { default: Form } = await import("/modules/Form.js");
    this.contactForm = new Form(this.contactFormHTML, this.errors);
    this.contactForm.submitCb = async function contactSubmitCB(e) {
      e.preventDefault();
      const data = this.getFormData();
      try {
        Spin.init();
        const result = await fetch("./api/contact/", {
          method: "post",
          body: data,
        }).then((res) => res.json());
        if (!Object.keys(result).length || result.error) {
          throw new Error(result);
        }
        popup.init(
          `<i class="fa-solid fa-envelope"></i> Mensaje recibido! Nos contactaremos contigo en breve`,
          5
        );
        this.restartForm();
      } catch (e) {
        popup.init(
          `<i class="fa-solid fa-ban"></i>Ups! Algo salio mal enviando el formulario`
        );
        console.log("Error enviando el formulario de contacto: ", e);
      }
      Spin.remove();
    };
  }
}

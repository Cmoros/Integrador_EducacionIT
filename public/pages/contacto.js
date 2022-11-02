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
  }
}

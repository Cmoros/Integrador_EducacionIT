

export default class PageContacto {
  constructor() {
    this.errors = {
      "contact-name": {
        message: "Error en el campo de nombre",
        regExp:
          /^([a-zA-ZÁÉÍÓÚÑÜáéíóúñü][a-záéíóúñü]{2,9})(\s[a-zA-ZÁÉÍÓÚÑÜáéíóúñü][a-záéíóúñü]{2,9})?$/,
      },
      "contact-last-name": {
        message: "Error en el campo de apellido",
        regExp:
          /^([a-zA-ZÁÉÍÓÚÑÜáéíóúñü][A-ZÁÉÍÓÚÑÜa-záéíóúñü']{1,19})(\s[a-zA-ZÁÉÍÓÚÑÜáéíóúñü][A-ZÁÉÍÓÚÑÜa-záéíóúñü']{1,19}$)?$/,
      },
      "contact-email": {
        message: "Error en el campo de email",
        regExp: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      },
      "contact-phone-number": {
        message: "Error en el campo de número",
        regExp:
          /^(\+54|0)?(9[1-9]|[1-9][1-9]|[1-9][1-9][1-9])(\d{4}|\d{3})(\d{4})$/,
      },
      "contact-message": {
        message: "Error en el campo de comentarios",
        regExp:
          /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"@¿*&%\/,+\-\(\)~?!]{30,300}$/,
      },
    };
    this.contactFormHTML = document.querySelector(".main-form");
  }

  async init() {
    const {default: Form} = await import('/modules/Form.js');
    this.contactForm = new Form(this.contactFormHTML, this.errors)
  }
}

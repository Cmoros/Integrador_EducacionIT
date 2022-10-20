export default class PageAlta {
  constructor() {
    this.errors = {
      "product-name": {
        message: "Error en el campo de nombre",
        regExp:
          /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"_@¿*&%\/,+\-\(\)~?!]{2,30}$/,
      },
      "product-price": {
        message: "Error en el campo de precio",
        regExp: /^(?!0)\d{1,7}(\.\d{1,2})?$/,
      },
      "product-category": {
        message: "Error en el campo de categoría",
        regExp: /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"_@¿*&%\/,+\-\(\)~?!]{2,50}$/,
      },
      "product-stock": {
        message: "Error en el campo de stock",
        regExp: /^\d{1,5}$/,
      },
      "product-brand": {
        message: "Error en el campo de marca",
        regExp:
          /^[A-Za-z\dÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇ!ç&\s\.\,\-\(\)\'\"\°\/]{3,40}$/,
      },
      "product-description-short": {
        message: "Error en el campo de descripción corta",
        regExp:
          /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"@¿*&%\/,+\-\(\)~?!]{30,80}$/,
      },
      "product-description-long": {
        message: "Error en el campo de descripción larga",
        regExp:
          /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"@¿*&%\/,+\-\(\)~?!]{30,2000}$/,
      },
      "product-age-max": {
        message: "Error en la edad máxima",
        test(toTest, mySelf ) {
          const inputMin = this.formTarget.querySelector('#product-age-min');
          if (inputMin.value > toTest) {
            mySelf.message = "El mínimo es mayor que el máximo"
            return false
          }
          const radio = this.formTarget.querySelector('[name="product[ageType]"][checked]')
          let regExp;
          if (radio.value === "M") {
            regExp = /^(\d|1[0-2])$/
            mySelf.message = "Los meses deben estar entre 0 y 12"
          } else {
            regExp = /^[1-9]\d?$/
            mySelf.message = "Los años deben estar entre 1 y 99"
          }
          return regExp.test(toTest)
        }
      },
      "product-age-min": {
        message: "Error en la edad mínima",
        test(toTest, mySelf ) {
          const radio = this.formTarget.querySelector('[name="product[ageType]"]:checked')
          let regExp;
          if (radio.value === "M") {
            regExp = /^(\d|1[0-2])$/
            mySelf.message = "Meses en intervalo de 0 a 12"
          } else {
            regExp = /^[1-9]\d?$/
            mySelf.message = "Años en intervalo de 1 y 99"
          }
          return regExp.test(toTest)
        }
      }
    };
    this.altaFormHTML = document.querySelector(".main-form");
  }

  async init() {
    const {default: Form} = await import('/modules/Form.js');
    this.altaForm = new Form(this.altaFormHTML, this.errors)
  }
}
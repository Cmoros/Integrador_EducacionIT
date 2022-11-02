export default class PageAlta {
  constructor() {
    this.errors = {
      "product-name": {
        message: "Campo hasta 30 caracteres del español",
        regExp:
          /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"_@¿*&%\/,+\-\(\)~?!]{2,30}$/,
      },
      "product-price": {
        message: "Campo numérico positivo con o sin decimales",
        regExp: /^(?!0)\d{1,7}(\.\d{1,2})?$/,
      },
      "product-category": {
        message: "Campo de 10 a 50 caracteres del español",
        regExp:
          /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"_@¿*&%\/,+\-\(\)~?!]{10,50}$/,
      },
      "product-stock": {
        message: "Campo numérico positivo sin decimales",
        regExp: /^\d{1,5}$/,
      },
      "product-brand": {
        message: "Campo de 3 a 40 caracteres del español",
        regExp:
          /^[A-Za-z\dÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇ!ç&\s\.\,\-\(\)\'\"\°\/]{3,40}$/,
      },
      "product-description-short": {
        message: "Campo de hasta 80 caracteres libres",
        regExp: /^.{10,80}$/
          // /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"@¿*&%\/,+\-\(\)~?!]{10,80}$/,
      },
      "product-description-long": {
        message: "Campo de hasta 80 caracteres libres",
        regExp: /^.{10,80}$/
          // /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"@¿*&%\/,+\-\(\)~?!]{20,2000}$/,
      },
      "product-age-max": {
        message: "Error en la edad máxima",
        test(toTest, mySelf) {
          const inputMin = this.formTarget.querySelector("#product-age-min");
          if (inputMin.value > toTest) {
            mySelf.message = "El mínimo es mayor que el máximo";
            return false;
          }
          const radio = this.formTarget.querySelector(
            '[name="product[ageType]"][checked]'
          );
          let regExp;
          if (radio.value === "M") {
            regExp = /^(\d|1[0-2])$/;
            mySelf.message = "Los meses deben estar entre 0 y 12";
          } else {
            regExp = /^[1-9]\d?$/;
            mySelf.message = "Los años deben estar entre 1 y 99";
          }
          return regExp.test(toTest);
        },
      },
      "product-age-min": {
        message: "Error en la edad mínima",
        test(toTest, mySelf) {
          const radio = this.formTarget.querySelector(
            '[name="product[ageType]"]:checked'
          );
          let regExp;
          if (radio.value === "M") {
            regExp = /^(\d|1[0-2])$/;
            mySelf.message = "Meses en intervalo de 0 a 12";
          } else {
            regExp = /^[1-9]\d?$/;
            mySelf.message = "Años en intervalo de 1 y 99";
          }
          return regExp.test(toTest);
        },
      },
    };
    this.altaFormHTML = document.querySelector(".main-form");
  }

  async init() {
    const { default: Form } = await import("/modules/Form.js");
    this.altaForm = new Form(this.altaFormHTML, this.errors);
  }
}

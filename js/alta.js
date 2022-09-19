let errors = {
    "product-name": {
        message: "Error en el campo de nombre",
        regExp: /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"@¿*&%\/,+\-\(\)~?!]{2,60}$/,
    },
    "product-price": {
        message: "Error en el campo de precio",
        regExp: /^(?!0)\d{1,7}(\.\d{1,2})?$/
    },
    "product-category": {
        message: "Error en el campo de categoría",
        regExp: /^([a-zA-ZÁÉÍÓÚÑÜáéíóúñü'"\-\s\.]{3,30})$/,
    },
    "product-stock": {
        message: "Error en el campo de stock",
        regExp: /^(?!0)\d{1,5}$/,
    },
    "product-brand": {
        message: "Error en el campo de marca",
        regExp: /^[A-Za-z\dÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇ!ç&\s\.\,\-\(\)\'\"\°\/]{3,50}$/,
    },
    "product-description-short": {
        message: "Error en el campo de descripción corta",
        regExp: /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"@¿*&%\/,+\-\(\)~?!]{30,75}$/,
    },
    "product-description-long": {
        message: "Error en el campo de precio",
        regExp: /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"@¿*&%\/,+\-\(\)~?!]{30,300}$/,
    },
}

let altaFormHTML = document.querySelector('.main-form');
let altaForm = new Form(altaForm, errors);
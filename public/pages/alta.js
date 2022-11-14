import ProductsTable from "../modules/ProductsTable.js";
import popup from "../modules/popup.js";

const MAX_IMAGE_SIZE = 1048576 / 2;

const errors = {
  "product-name": {
    message: "Campo hasta 35 caracteres del español",
    regExp:
      /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"_@¿*&%\/,+\-\(\)~?!]{2,35}$/,
  },
  "product-id": {
    message: "Esto no debería estar incorrecto. Algo ocurrió",
    regExp: /^|[\dabcdef]{24}$/,
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
    regExp: /^.{10,80}$/m,
    // /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"@¿*&%\/,+\-\(\)~?!]{10,80}$/,
  },
  "product-description-long": {
    message: "Campo de hasta 300 caracteres libres",
    regExp: /^.{10,450}$/m,
    // /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"@¿*&%\/,+\-\(\)~?!]{20,2000}$/,
  },
  "product-age-max": {
    message: "Error en la edad máxima",
    test(input, mySelf) {
      const inputMin = this.formTarget.querySelector("#product-age-min");
      if (inputMin.value > input.value) {
        mySelf.message = "El mínimo es mayor que el máximo";
        return false;
      }
      const radio = this.formTarget.querySelector('[name="typeAge"][checked]');
      let regExp;
      if (radio.value === "M") {
        regExp = /^(\d|1[0-2])$/;
        mySelf.message = "Los meses deben estar entre 0 y 12";
      } else {
        regExp = /^[1-9]\d?$/;
        mySelf.message = "Los años deben estar entre 1 y 99";
      }
      return regExp.test(input.value);
    },
  },
  "product-age-min": {
    message: "Error en la edad mínima",
    test(input, mySelf) {
      const radio = this.formTarget.querySelector('[name="typeAge"]:checked');
      let regExp;
      if (radio.value === "M") {
        regExp = /^(\d|1[0-2])$/;
        mySelf.message = "Meses en intervalo de 0 a 12";
      } else {
        regExp = /^[1-9]\d?$/;
        mySelf.message = "Años en intervalo de 1 y 99";
      }
      return regExp.test(input.value);
    },
  },
  "product-profile-image": {
    message: "Error en el campo de imagen de portada",
    maxImageSize: MAX_IMAGE_SIZE,
    test(input, mySelf) {
      if (input.files.length > 1) {
        mySelf.message = "Se admite solo 1 imagen como imagen de portada";
        return false;
      }
      mySelf.message = `Máximo ${MAX_IMAGE_SIZE / 1024}KB de tamaño tolerado`;
      return input.files[0].size < MAX_IMAGE_SIZE;
    },
  },
  "product-images": {
    message: "Error en el campo de imagenes",
    maxImages: 5,
    maxImageSize: MAX_IMAGE_SIZE,
    test(input, mySelf) {
      if (input.files.length > mySelf.maxImages) {
        mySelf.message = `Se admiten hasta un máximo de ${mySelf.maxImages} imágenes`;
        return false;
      }
      mySelf.message = `Máximo ${MAX_IMAGE_SIZE / 1024}KB de tamaño tolerado`;
      for (let i = 0; i < input.files.length; i++) {
        if (input.files[i].size > MAX_IMAGE_SIZE) return false;
      }
      return true;
    },
  },
};

const { default: Form } = await import("/modules/Form.js");
let altaFormHTML = document.querySelector(".main-form");

function normalizeFileInputs(dataForm) {
  if (dataForm.get("profileImageUrl").size == 0) {
    dataForm.append("profileImageUrlMissing", "true");
  }
  if (dataForm.get("imagesUrls").size == 0) {
    dataForm.append("imagesUrlsMissing", "true");
  } else {
    const images = document.querySelector('[name="imagesUrls"]').files;
    dataForm.delete("imagesUrls");
    for (let i = 0; i < images.length; i++) {
      dataForm.append("imagesUrls", images[i]);
    }
  }
}

async function altaCbPost(e) {
  e.preventDefault();
  const data = altaForm.getFormData();
  normalizeFileInputs(data);
  try {
    const result = await fetch("./api/products/", {
      method: "post",
      // headers: {
      //   // Accept: "application/json",
      //   "content-type": "application/json",
      // },
      body: data,
    }).then((res) => res.json());
    if (checkResultFromFetch(result, "dar de alta", "dio de alta")) {
      currentTable.updateTable();
    }
  } catch (e) {
    console.log("Error tratando de actualizar un producto: ", e);
    checkResultFromFetch({}, "dar de alta", "dio de alta");
  }
}

async function altaCbPut(e) {
  e.preventDefault();
  const data = altaForm.getFormData();
  normalizeFileInputs(data);
  // data.append("_method", "PUT");
  try {
    const result = await fetch(
      "./api/products/" +
        altaForm.state[1] +
        "?" +
        new URLSearchParams({ _method: "PUT", method: "PUT" }),
      {
        method: "post",
        // _method: "put",
        // headers: {
        //   // Accept: "application/json",
        //   // "content-type": "application/json",
        // "Content-Type": "multipart/form-data"
        // },
        body: data,
      }
    ).then((res) => res.json());
    if (checkResultFromFetch(result, "actualizar", "actualizó")) {
      currentTable.updateTable();
    }
  } catch (e) {
    console.log("Error tratando de actualizar un producto: ", e);
    checkResultFromFetch({}, "actualizar", "actualizó");
  }
}

const altaForm = new Form(altaFormHTML, errors, altaCbPost);
altaForm.idInput = altaFormHTML.querySelector("#product-id");

const idCheckbox = document.querySelector("#id-form__toggle-checkbox");

altaForm.state = ["adding"];
altaForm.updateButton = altaFormHTML.querySelector(".form-buttons__update");
altaForm.cancelButton = altaFormHTML.querySelector(".form-buttons__cancel");

altaForm.setButtons = function () {
  const adding = altaForm.state[0] == "adding";
  altaForm.submitButton.disabled = !adding;
  altaForm.submitButton.classList.toggle("hidden", !adding);
  altaForm.updateButton.disabled = adding;
  altaForm.updateButton.classList.toggle("hidden", adding);
  altaForm.cancelButton.disabled = adding;
  altaForm.cancelButton.classList.toggle("hidden", adding);
  idCheckbox.checked = !adding;
  altaFormHTML.querySelector("#product-profile-image").required = adding;
  altaFormHTML.querySelector(
    "[for='product-profile-image'] .required"
  ).innerHTML = adding ? "*" : "";
  altaForm.submitCb = adding ? altaCbPost : altaCbPut;
};

altaForm.selectProduct = function (product) {
  altaForm.state[0] = "updating";
  altaForm.state[1] = product.id;
  altaForm.setButtons();
  altaForm.restartForm();

  scrollTo({ top: altaForm.formTarget.offsetTop - 100, behavior: "smooth" });

  altaForm.formTarget.querySelectorAll("[data-input]").forEach((input) => {
    input.required && altaForm.inputsCurrentlyValid.add(input);
    const value = product[input.dataset.input];
    if (value) {
      input.value = value;
    }
  });
  altaForm.formTarget.querySelectorAll("[data-radio]").forEach((input) => {
    const value = product[input.dataset.radio];
    if (value == input.value) {
      input.checked = true;
    }
  });
  altaForm.formTarget.querySelectorAll("[data-checkbox]").forEach((input) => {
    const value = product[input.dataset.checkbox];
    input.checked = value;
  });
  altaForm.idInput.value = product.id;
};

function checkResultFromFetch(result, text1, text2) {
  if (!Object.keys(result).length || result.error) {
    popup.init(
      `<i class="fa-solid fa-ban"></i>Ups! No se pudo ${text1} el producto`
    );
    return false;
  }
  popup.init(
    `<i class="fa-solid fa-check"></i>Se ${text2} el producto correctamente`
  );
  return true;
}

const searchSubmitCb = async function (e) {
  e.preventDefault();
  const id = this.formTarget.querySelector("#search-id").value;
  const product = await fetch("./api/products/" + id).then((res) => res.json());

  if (checkResultFromFetch(product, "pudo encontrar", "encontró")) {
    altaForm.selectProduct(product);
  }
};

let currentTable;

export default class PageAlta {
  constructor() {
    this.tableContainer = document.querySelector(".table-products__wrapper");
    this.errors = errors;
    this.altaFormHTML = document.querySelector(".main-form");
    this.table = new ProductsTable(this.tableContainer, this.altaFormHTML);
    currentTable = this.table;

    this.altaForm = altaForm;
    if (altaForm.formTarget != this.altaFormHTML) {
      altaForm.formTarget = this.altaFormHTML;
      altaFormHTML = this.altaFormHTML;
      altaForm.updateButton = this.altaFormHTML.querySelector(
        ".form-buttons__update"
      );
      altaForm.cancelButton = this.altaFormHTML.querySelector(
        ".form-buttons__cancel"
      );
      altaForm.init();
      altaForm.restartForm();
    }
    this.searchIdForm = new Form(
      document.querySelector(".id-form"),
      {
        "search-id": {
          message: "El id ingresado no es válido",
          regExp: /^[\dabcdef]{24}$/,
        },
      },
      searchSubmitCb
    );
    this.altaFormHTML.addEventListener("click", async (e) => {
      if (e.target.classList.contains("form-buttons__cancel")) {
        altaForm.restartForm();
        altaForm.state[0] = "adding";
        altaForm.setButtons();
      }
    });
  }

  async init() {}
}

export { altaForm, idCheckbox };

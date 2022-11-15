import mongoose from "mongoose";
import { unlink } from "fs";

const productSchemaObj = {
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  minAge: {
    type: String,
    required: true,
  },
  maxAge: {
    type: String,
    required: true,
  },
  typeAge: {
    type: String,
    required: true,
  },
  profileImageUrl: {
    type: String,
    required: true,
  },
  imagesUrls: [
    {
      imageUrl: {
        type: String,
      },
    },
  ],
  shipping: {
    type: Boolean,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  visits: {
    type: Number,
    // default: 0,
  },
  date: {
    type: Date,
    // default: Date.now,
  },
  sponsored: {
    type: Boolean,
    // default: false,
  },
};

const productSquema = mongoose.Schema(productSchemaObj);

productSquema.pre("save", function () {
  this.sponsored ||= false;
  this.date ||= Date.now();
  this.visites ||= 0;
});

productSquema.pre("validate", function () {
  console.log("pre-validate");
  if (!this.imagesUrls || !Array.isArray(this.imagesUrls)) {
    this.imagesUrls = [
      // Para el caso de tener inicialmente algo en el imageUrls, que se arregló después en el controller
      // { imageUrl: this.profileImageUrl }
    ];
    return;
  }
  console.log("this", this);
  this.shipping &&= true;
  this.shipping ||= false;
});

productSquema.pre("findOneAndUpdate", function () {
  console.log("pre-findOneAndUpdate");
  if (this._update.$set) {
    this._update.$set.shipping &&= true;
  }
  // Solamente por las dudas
  // if (this.stock == -1) {
  //   delete this.stock;
  //   this.$inc = {
  //     stock: -1,
  //   };
  // }
});

productSquema.post("findOneAndDelete", function (doc) {
  console.log("Documento a eliminar:", doc);
  if (doc.profileImageUrl.includes("uploads")) {
    unlink("./public/" + doc.profileImageUrl, (err) => {
      if (err) return console.log(err);
      console.log("Eliminado", doc.profileImageUrl);
    });
  }

  for (const image of doc.imagesUrls) {
    const { imageUrl } = image;
    if (!imageUrl.includes("uploads")) continue;
    unlink("./public/" + doc.profileImageUrl, (err) => {
      if (err) return console.log(err);
      console.log("Eliminado", imageUrl);
    });
  }
});

export default mongoose.model("product", productSquema);

export { productSchemaObj };

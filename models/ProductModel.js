import mongoose from "mongoose";

const productSquema = mongoose.Schema({
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
    default: false,
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
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  sponsored: {
    type: Boolean,
    default: false,
  },
});

productSquema.pre("save", function () {
  console.log("pre-save");
  if (!this.imagesUrls || !Array.isArray(this.imagesUrls)) {
    this.imagesUrls = [
      // Para el caso de tener inicialmente algo en el imageUrls, que se arregló después en el controller
      // { imageUrl: this.profileImageUrl }
    ];
    return;
  }
  this.shipping &&= true;
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

export default mongoose.model("product", productSquema);

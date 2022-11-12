import mongoose from "mongoose";

const productSquema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
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
      /*{ imageUrl: this.profileImageUrl }*/
    ];
    return;
  }
  this.shipping &&= true;
});

productSquema.pre("findOneAndUpdate", function () {
  console.log("pre-findOneAndUpdate");
  this._update.$set.shipping &&= true;
});

export default mongoose.model("product", productSquema);

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
    type: String,
    default: "false",
  },
  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    // required: true
  },
  visits: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: new Date,
  },
  sponsored: {
    type: Boolean,
    default: false,
  },
});

productSquema.pre("save", function () {
  // console.log("Document pre-save", this);
  console.log('pre-save')
  if (
    !this.imagesUrls ||
    !Array.isArray(this.imagesUrls) ||
    this.imagesUrls.length == 0
  )
    this.imagesUrls = [
      { imageUrl: this.profileImageUrl },
    ];
});

// productSquema.pre("updateOne", function () {
//   // console.log("Document pre-save", this);
//   console.log('pre-save')
//   if (
//     !this.imagesUrls ||
//     !Array.isArray(this.imagesUrls) ||
//     this.imagesUrls.length == 0
//   )
//     this.imagesUrls = [
//       { imageUrl: this.profileImageUrl },
//     ];
// });

export default mongoose.model("product", productSquema);

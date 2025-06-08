import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    collection: { type: String, required: true },
    soldOut: { type: Boolean, defualt: false },
    subCategory: { type: String, required: true },
    sizes: { type: Array ,  required: true},
    colors: { type: Array }, 
    bestseller: { type: Boolean },
    date: { type: Number, required: true }
})

const productModel  = mongoose.models.product || mongoose.model("product",productSchema);

export default productModel
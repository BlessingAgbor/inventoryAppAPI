// product page: product name
// quantity and amount

const mongoose = require('mongoose')
const Schema= mongoose.Schema;
const productSchema= new Schema({
    productName:{
        type: String,
        required: true
    },
    productQuantity: {
        type: Number,
        required: true
    },
     amount: {
        type: Number,
        required: true
    },
    size:{
        type: String
    },
    brand:{
        type: String,
    }, 
    user:{
        type: Schema.Types.ObjectId,
        ref:"users"
    },
    
}, {timestamps: true})

module.exports= mongoose.model("products", productSchema)


const mongoose = require ('mongoose')
const Schema= mongoose.Schema;
const companySchema= new Schema({
    logo: {
        type: String,
        required: true
    },
    companyName:{
        type: String,
        required: true
    }, 
    adminName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    products:[{
        type: Schema.Types.ObjectId,
        ref: "products"
    }], 
    createdAt: {
       type: Date, 
       default: new Date()
    }
}, {timestamps: true})
module.exports= mongoose.model("company", companySchema)
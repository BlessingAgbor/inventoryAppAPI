const productModel = require('../Model/productModel')
const companyModel = require('../Model/companyModel')

// function to create one product
const createProduct= async(req, res)=> {
    try{
     const create= await companyModel.findById(req.params.companyID)
     const product = new productModel(req.body)
     product.company= create
     product.save()
     create.products.push(product)
     create.save()

     res.status(201).json({
         status: "success",
         message: product
     })
    }catch(error){
        res.status(500).json({
            status: "fail", 
            message: error.message
        })
    }
 }


//  function to update a product

const productUpdate= async(req, res)=> {
    try{
     const update= await productModel.findByIdAndUpdate(req.params.productID, req.body)
     res.status(200).json({
         status: "success",
         message: update
     })
    }catch(error){
        res.status(500).json({
            status: "fail", 
            message: error
        })
    }
 }

// function to delete a product

 const productDelete= async(req, res)=> {
    try{
     const deleter= await productModel.findByIdAndDelete(req.params.productID)
     res.status(200).json({
         status: "success",
         message: deleter
     })
    }catch(error){
        res.status(404).json({
            status: "fail", 
            message: error
        })
    }
 }
 
// delete all products

 const deleteAll= async(req, res)=> {
    try{
     const update= await productModel.deleteMany()
     res.status(200).json({
         status: "success",
         message: update
     })
    }catch(error){
        res.status(400).json({
            status: "fail", 
            message: error
        })
    }
 }
 
// Get all products

const getAllProducts= async(req, res)=> {
    try{
    const cId = req.params.companyID
     const company = await companyModel.findById(cId).populate("products")
    //  .populate("products")
     res.status(200).json({
         status: "success",
         message: company
     })
    }catch(error){
        res.status(400).json({
            status: "fail", 
            message: error
        })
    }
 }

 const getOneProduct= async(req, res)=> {
    try{
     const getter= await productModel.findById(req.params.productID)
     res.status(200).json({
         status: "success",
         message: getter
     })
    }catch(error){
        res.status(400).json({
            status: "fail", 
            message: error
        })
    }
 }
 
 module.exports={
    createProduct, productUpdate, productDelete, deleteAll, getAllProducts, getOneProduct
 }
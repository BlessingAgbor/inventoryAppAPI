const express= require('express')
const productRoute= express.Router()
const {
    createProduct, productUpdate, productDelete, deleteAll, getAllProducts, getOneProduct
}= require('../Controller/productController')

productRoute
.route('/company/:companyID/products')
.get(getAllProducts)
.post(createProduct)
.delete(deleteAll)

productRoute
.route('/company/:companyID/products/:productID')
.get(getOneProduct)
.patch(productUpdate)
.delete(productDelete)


module.exports= productRoute;
const express= require('express')
const companyRoute= express.Router()
const {getAllCompanys, getOneCompany, deleteAll, deleteOne, companyUpdate, companyCreate}=require('../Controller/companyController')

const logoUpload = require("../Config/multer")

companyRoute
.route('/company')
.get(getAllCompanys)
.post(logoUpload, companyCreate)
.delete(deleteAll)

companyRoute
.route('/company/:companyID')
.get(getOneCompany)
.patch(logoUpload, companyUpdate)
.delete(deleteOne)

module.exports=companyRoute
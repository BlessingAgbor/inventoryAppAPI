const companyModel= require('../Model/companyModel')


//function to create a company 

const companyCreate= async(req, res)=> {
   try{
    const create= await companyModel.create({
        logo: req.file.path,
        companyName: req.body.companyName,
        adminName: req.body.adminName,
        email: req.body.email,
        password: req.body.password
    })
    res.status(201).json({
        status: "success",
        message: create
    })
   }catch(error){
       res.status(500).json({
           status: "fail", 
           message: error
       })
   }
}

//update the details of the company created 


const companyUpdate= async(req, res)=> {
    try{
     const update= await companyModel.findByIdAndUpdate(req.params.companyID, {
        logo: req.file.path,
        companyName: req.body.companyName,
        adminName: req.body.adminName,
        email: req.body.email,
        password: req.body.password
     }, {new:true})
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


// function to delete one of the company created


 const deleteOne= async(req, res)=> {
    try{
     const deleter= await companyModel.findByIdAndDelete(req.params.companyID)
     res.status(201).json({
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


//  function to delete all the companies

const deleteAll= async(req, res)=> {
    try{
     const create= await companyModel.deleteMany()
     res.status(200).json({
         status: "success",
         message: create
     })
    }catch(error){
        res.status(500).json({
            status: "fail", 
            message: error
        })
    }
 }


// function to get one company

 const getOneCompany= async(req, res)=> {
    try{
     const getter= await companyModel.findById(req.params.companyID)
     res.status(201).json({
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


// function to get all companies
 const getAllCompanys= async(req, res)=> {
    try{
     const getAll= await companyModel.find(req.params.companyID)
     res.status(201).json({
         status: "success",
         message: getAll
     })
    }catch(error){
        res.status(404).json({
            status: "fail", 
            message: error
        })
    }
 }

 module.exports= {
    getAllCompanys, getOneCompany, deleteAll, deleteOne, companyUpdate, companyCreate
 }
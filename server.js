// require('./MongoDb/db')
require('./MongoDb/atlas')
const express =require('express')
const port = 4000;
const app = express()

app.use(express.json())

// welcome message, i.e starting point of our database
app.get("/", (req, res)=>{
    res.send("Welcome to Inventory App database, where you have the Api of companies and their products")
})

const productRoute= require('./Routes/productRoute')
const companyRoute= require('./Routes/companyRoute')
// for the nodeJs to understand the routing, we need a middlware, i.e the .use

app.use('/api', productRoute)
app.use('/api', companyRoute)
app.use('/api/user', require("./Routes/userRouter"))


// now lets listen to our server
app.listen(port, ()=> {
    console.log("server is listening on port", port);
})

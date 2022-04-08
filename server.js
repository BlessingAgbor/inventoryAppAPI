// require('./MongoDb/db')
require('./MongoDb/atlas')
require("dotenv").config()
const express =require('express')
const port = process.env.PORT || 4000;
const app = express()
const cors = require("cors")

app.use(express.json())

// welcome message, i.e starting point of our database
app.get("/", (req, res)=>{
    res.send("Welcome to Inventory App database, where you have the Api of companies and their products")
})


const productRoute= require('./Routes/productRoute')
const companyRoute= require('./Routes/companyRoute')
// for the nodeJs to understand the routing, we need a middlware, i.e the .use

//calling cors for cross communication 
// app.use(cors({origin: "*"}))
app.use(cors())
app.use('/api/user', productRoute)
// app.use('/api/user', companyRoute)
app.use('/api/user', require("./Routes/userRouter"))


// now lets listen to our server
app.listen(port, ()=> {
    console.log("server is listening on port", port);
})

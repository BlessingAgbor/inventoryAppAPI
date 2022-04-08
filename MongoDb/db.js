const mongoose= require('mongoose')
const url= 'mongodb://localhost/inventoryApp'
mongoose.connect(url).then(()=> {
    console.log("connected to mongoose successfully");
}).catch((error)=>{
    console.log(error);
})

module.exports = mongoose;
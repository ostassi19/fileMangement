const express = require('express')
const colors = require('colors')
require('dotenv').config()
const {errorHandler}= require('./middlware/errorMiddelware')
const connectDB= require('./config/db')
const cors = require('cors');
const path = require("path")
const upload= require('express-fileupload')
//console.log(process.env.PORT)
const port= process.env.PORT || 5000

connectDB()
const app=express()
app.use(cors());
app.use(upload())
// View Engine Setup
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})
app.post('/',(req,res)=>{
    if (req.files){
        console.log(req.files)
    }
})
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/files',require('./routes/fileRoutes'))
app.use('/api/users',require('./routes/userRoutes'))
app.use('/api/folders',require('./routes/folderRoutes'))
app.use('/api/category',require('./routes/categoryRoutes'))
app.use(errorHandler)

app.listen(port,()=>console.log(`Server started on port ${port}`))

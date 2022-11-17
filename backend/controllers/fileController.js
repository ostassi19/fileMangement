const asyncHandler= require('express-async-handler')
const faker = require('@faker-js/faker')

const File = require('../models/fileModel')
const User = require('../models/userModel')
const Category= require('../models/categoryModel')
const multer = require("multer")

// @desc get files
// @route GET /api/files
// @access Private
const getFiles=asyncHandler( async (req, res) => {
    const page = req.query.page
    const limit = req.query.limit
    const startIndex= (page-1)*limit
    endIndex= page*limit
    const files = await File.find({user:req.user.id})
    paginatedFiles= files.slice(startIndex,endIndex)
    res.status(200).json(paginatedFiles)
})

// @desc create files
// @route POST /api/files
// @access Private
const setFiles=asyncHandler( async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('please add some fields')
    }
    if (!req.body.reference) {
        res.status(400)
        throw new Error('please add the file reference')
    }
    if (!req.body.path) {
        res.status(400)
        throw new Error('please add the file path')
    }

    if (!req.body.extension) {
        res.status(400)
        throw new Error('please add the file extension')
    }

    const file = await File.create({
        text: req.body.text,
        reference: req.body.reference,
        path: req.body.path,
        extension: req.body.extension,
        user: req.user.id,
        category: req.body.category,
        folder: req.body.folder
    })

    res.status(200).json(file)
})


// @desc create fake files
// @route POST /api/files/fake
// @access Private
const createFakeFiles=asyncHandler( async (req, res) => {
    for (var i=0;i<10;i++){
        var fakeFiles= new File({
            text: faker.Lorem.paragraph(),
            user: req.user.id
        })
        fakeFiles.save((err,data)=>{
            if (err){
                console.log(err)
            }
        })
    }
    res.status(200).json(fakeFiles)
})


// @desc create massive files
// @route POST /api/files/massive
// @access Private
const createMassiveFiles=asyncHandler( async (req, res) => {
    for (var i=0;i<500;i++){
        var massiveFiles= new File({
            text: 'ccccc',
            user: req.user.id
        })
        massiveFiles.save((err,data)=>{
            if (err){
                console.log(err)
            }
        })
    }
    res.status(200).json(massiveFiles)
})



// @desc update files
// @route PUT /api/files/:id
// @access Private
const updateFiles=asyncHandler( async (req, res) => {

    const file = await File.findById(req.params.id)

    if (!file){
        res.status(400)
        throw new Error('File not found')
    }
    const user= await User.findById(req.user.id)

    //check for user
    if (!user){
        res.status(401)
        throw new Error('User not found')
    }
    //make sure the logged user matches the goal user
    if (file.user.toString()!= user.id){
        res.status(401)
        throw new Error('user not authorized')
    }

    const updatedFile = await File.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedFile)
})

// @desc DELETE files
// @route DELETE /api/files/:id
// @access Private
const deleteFiles=asyncHandler( async (req, res) => {

    const file = await File.findById(req.params.id)

    if (!file) {
        res.status(400)
        throw new Error('File not found')
    }

    const user= await User.findById(req.user.id)
    //check for user
    if (!user){
        res.status(401)
        throw new Error('User not found')
    }
    //make sure the logged user matches the file user
    if (file.user.toString()!= user.id){
        res.status(401)
        throw new Error('user not authorized')
    }

    const deletedFile = await file.remove()

    res.status(200).json({id : req.params.id})
})

// @desc upload file
// @route Post /api/files/upload
// @access Private
const uploadFile=asyncHandler( async (req,res)=> {

     multer({


        fileFilter: function (req, file, cb){

            // Set the filetypes, it is optional
            var filetypes = /jpeg|jpg|png/;
            var mimetype = filetypes.test(file.mimetype);

            var extname = filetypes.test(path.extname(
                file.originalname).toLowerCase());

            if (mimetype && extname) {
                return cb(null, true);
            }

            cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes);
        }

// mypic is the name of file attribute
    }).single("mypic");
    res.send("Success, Image uploaded!")
})

module.exports={
    getFiles,
    setFiles,
    updateFiles,
    deleteFiles,
    createFakeFiles,
    createMassiveFiles
}

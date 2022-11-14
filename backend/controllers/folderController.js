const asyncHandler= require('express-async-handler')
const User = require('../models/userModel')

const Folder = require('../models/FolderModel')

// @desc get foladers
// @route GET /api/folders
// @access Private
const getFolders=asyncHandler( async (req, res) => {
    const folders = await Folder.find()
    res.status(200).json(folders)
})

// @desc create folder
// @route POST /api/folders
// @access Private
const setFolders=asyncHandler( async (req, res) => {

    if (!req.body.name) {
        res.status(400)
        throw new Error('please add the folder name')
    }
    if (!req.body.path) {
        res.status(400)
        throw new Error('please add the folder path')
    }

    const folder = await Folder.create({
        name: req.body.name,
        path: req.body.path,
        user: req.user.id,
        folder: req.body.folder
    })

    res.status(200).json(folder)
})

// @desc update folders
// @route PUT /api/folders/:id
// @access Private
const updateFolders=asyncHandler( async (req, res) => {

    const folder = await Folder.findById(req.params.id)

    if (!folder){
        res.status(400)
        throw new Error('Folder not found')
    }

    const updatedFolder = await Folder.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedFolder)
})

// @desc DELETE folder
// @route DELETE /api/folder/:id
// @access Private
const deleteFolders=asyncHandler( async (req, res) => {

    const folder = await Folder.findById(req.params.id)

    if (!folder) {
        res.status(400)
        throw new Error('Folder not found')
    }

    const deletedFolder = await folder.remove()

    res.status(200).json({id : req.params.id})
})


module.exports={
    getFolders,
    setFolders,
    updateFolders,
    deleteFolders
}

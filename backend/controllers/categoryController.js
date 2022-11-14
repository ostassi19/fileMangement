const asyncHandler= require('express-async-handler')

const Category = require('../models/categoryModel')
const File = require("../models/fileModel");
const User = require("../models/userModel");

// @desc create category
// @route POST /api/category
// @access Private
const setCategory=asyncHandler( async (req, res) => {
    if (!req.body.categoryName) {
        res.status(400)
        throw new Error('please add the category name')
    }
    const category = await Category.create({
        abreviation: req.body.abreviation,
        categoryName: req.body.categoryName,

    })

    res.status(200).json(category)
})

// @desc get categories
// @route GET /api/category
// @access Private
const getCategories=asyncHandler( async (req, res) => {
    const categories = await Category.find()
    res.status(200).json(categories)
})

// @desc update categories
// @route PUT /api/category/:id
// @access Private
const updateCategory=asyncHandler( async (req, res) => {

    const category = await Category.findById(req.params.id)

    if (!category){
        res.status(400)
        throw new Error('category not found')
    }

    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedCategory)
})

const deleteCategory=asyncHandler( async (req, res) => {

    const category = await Category.findById(req.params.id)

    if (!category) {
        res.status(400)
        throw new Error('category not found')
    }

    const deletedCategory = await category.remove()

    res.status(200).json({id : req.params.id})
})


module.exports={
    setCategory,
    getCategories,
    updateCategory,
    deleteCategory
}
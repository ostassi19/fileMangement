const express=require('express')
const router = express.Router()

const {protect}=require('../middlware/authMiddlware')
const {setCategory, getCategories, updateCategory, deleteCategory} = require("../controllers/categoryController");


router.route('/').post(protect,setCategory).get(protect,getCategories)
router.route('/:id').put(protect,updateCategory).delete(protect,deleteCategory)

module.exports= router

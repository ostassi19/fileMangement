const mongoose = require('mongoose')
const  categorySchema = mongoose.Schema(
    {
        abreviation:{
            type: String,
            required: [false]
        },
        categoryName:{
            type: String,
            required: [true, 'Please add a category name']
        },
    }
)
module.exports= mongoose.model('Category', categorySchema)

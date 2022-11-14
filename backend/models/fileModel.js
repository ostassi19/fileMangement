const mongoose = require('mongoose')
const  fileSchema = mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },

        text:{
            type: String,
            required: [true, 'Please add a text value']
        },
        reference:{
            type: String,
            required: [true, 'Please add a reference value']
        },
        path:{
            type: String,
            required: true
        },
        extension:{
            type: String,
            required: true
        },
        folder:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref:"Folder"
        },
        category:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref:"Category"
        }
    },
    {
            timestamps: true
    }
)

module.exports= mongoose.model('File', fileSchema)

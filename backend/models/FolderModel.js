const mongoose = require('mongoose')
const  folderSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, 'Please add a text value']
        },
        path:{
            type: String,
            required: [true, 'Please add a text value']
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        folder:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Folder'
        },
    },
    {
        timestamps: true
    }
)
module.exports= mongoose.model('Folder', folderSchema)
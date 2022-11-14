const express=require('express')
const router = express.Router()
const {getFolders,
     setFolders,
    updateFolders,
    deleteFolders
}= require('../controllers/folderController')

const {protect}=require('../middlware/authMiddlware')

router.route('/').get(protect,getFolders).post(protect,setFolders)

router.route('/:id').put(protect,updateFolders).delete(protect,deleteFolders)

module.exports= router

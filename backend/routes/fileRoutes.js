const express=require('express')
const router = express.Router()
const {getFiles,
    setFiles,
    updateFiles,
    deleteFiles, createFakeFiles, createMassiveFiles
}= require('../controllers/fileController')

const {protect}=require('../middlware/authMiddlware')

router.route('/').get(protect,getFiles).post(protect,setFiles)

router.route('/:id').put(protect,updateFiles).delete(protect,deleteFiles)

router.route('/fake').post(protect,createFakeFiles)

router.route('/massive').post(protect,createMassiveFiles)

router.route('/upload').post(protect,updateFiles)
module.exports= router

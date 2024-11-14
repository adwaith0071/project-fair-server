const express=require('express')
const userController=require('../controllers/userController')
const projectController=require('../controllers/projectController')
const jwtMiddleware=require('../Middlewares/jwtMiddleware')

const multerMiddleware=require('../Middlewares/multerMiddleware')

const route=express.Router()

route.post('/reg',userController.userRegister)
route.post('/log',userController.userLogin)
route.put('/updateprofile',jwtMiddleware,multerMiddleware.single('profile'),userController.profileAdd)


route.post('/addproject',jwtMiddleware, multerMiddleware.single('image'), projectController.addProject)
route.get('/getlist',jwtMiddleware,projectController.getProjects)
route.delete('/deletepro/:pid',jwtMiddleware,projectController.deleteProject)
route.put('/updatepro/:pid',jwtMiddleware,multerMiddleware.single('image'),projectController.updateProject)
route.get('/allproject',projectController.allProject)
route.get('/search',projectController.searchProjects)




module.exports=route
const express=require('express')
const { signUp, signIn, current } = require('../controllers/authController')
const isAuth = require('../middleware/isAuth')
const { registerRules,validator, loginRules } = require('../middleware/validator')
const router=express.Router()

// create new user and generate token
router.post('/signup',registerRules,validator,signUp)
router.post('/signin',loginRules,validator,signIn)
router.get('/current',isAuth,current)


module.exports=router
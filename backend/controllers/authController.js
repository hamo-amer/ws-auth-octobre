const User = require("../models/User")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp=async(req,res)=>{
    const {username,email,password}=req.body
    try {
        // check user
        const checkuser=await User.findOne({email})
        if(checkuser){
            return res.status(401).json({errors:[{msg:"user already exists"}]})
        }
        const user= new User({
            username,email,password
        })
        user.password=await bcrypt.hash(password,10)
        await user.save()

        // generate token
        const payload={
            id:user._id
        }
        const token=jwt.sign(payload,process.env.secret_key,{expiresIn:'3d'})

        res.status(201).json({user,msg:"user craeted",token})
    } catch (error) {
        res.status(500).send('server error')
    }
}

exports.signIn=async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({errors:[{msg:"bad credentials"}]})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({errors:[{msg:"bad credentials"}]})
        }

        // generate token
        const payload={
            id:user._id
        }
        const token=jwt.sign(payload,process.env.secret_key,{expiresIn:'3d'})

        res.status(200).json({user,msg:"login with success",token})
    } catch (error) {
        res.status(500).send('server error')
    }
}
exports.current=async(req,res)=>{
    try {
        console.log(req.user.id)
        const user=await User.findById(req.user.id)
        res.send(user)
    } catch (error) {
        res.status(500).send('server error')
    }
}

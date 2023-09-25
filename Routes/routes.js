const express = require('express')
const router = express.Router()
const passport = require("passport")

//homepage
router.get('/',(req,res)=>{
    res.render('home',{user:req.user})
})

//login with google
router.get('/google',passport.authenticate('google',{
    scope:['profile']
}))

//logout
router.get('/logout',(req,res)=>{
    res.redirect("/auth/");
})

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.redirect('/profile/')
})



module.exports = router
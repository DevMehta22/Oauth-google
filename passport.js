require('dotenv').config()
const mongoose = require('mongoose')
const passport = require('passport')
const googleStrategy = require("passport-google-oauth20").Strategy
const User = require('./Models/userSch') 

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    }) 
})

passport.use(
    new googleStrategy(
        {
            clientID:process.env.clientID,
            clientSecret:process.env.clientSecret,
            callbackURL:'/auth/google/redirect'
        }
    ,(accessToken,refreshToken,profile,done)=>{
        const username = profile.displayName
        const googleId = profile.id
        User.findOne({googleId})
        .then((user)=>{
            if(user){
                console.log(user)
                done(null,user)
            }
            else{
                new User({
                    username,
                    googleId
                }).save().then((newuser)=>{
                    console.log(newuser)
                    done(null,newuser)
                })  
            }
        })        
    })
)




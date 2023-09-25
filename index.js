require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const routes = require('./Routes/routes')
const profileRoutes = require('./Routes/profile-routes')
const passportsetup = require('./passport') 
const session = require('express-session')
const passport = require('passport')

app.use(express.json())

app.set('view engine','ejs')

app.use(session({
    secret:process.env.KEY,
    resave: false,
    saveUninitialized: true 
  }))

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth',routes)
app.use('/profile',profileRoutes)

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to DB!")
    app.listen(process.env.PORT || 3000,(err)=>{
        if (err) throw err
        console.log(`Server running on port: ${process.env.PORT}`)
    })
}).catch((err)=>{
    console.log(err)
})

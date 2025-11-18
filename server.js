//Build server
const express = require('express')
const server = express()
const router = require('./routes/router')
const port = process.env.port || 3000

//handle Security
const helmet = require('helmet')
const cors = require('cors')

//configuring helmet
server.use(helmet.contentSecurityPolicy(
{
    useDefaults: true,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    directives:
    {
        "ing-src": ["'self'", "https: data"],
        "scriptSrc": ["'self'", "cdn.jsdelivr.net"]
    }
}))

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true}))

//Hey, I'm setting ejs as my view engine!
server.set('view engine', 'ejs')

//localhost:3000
server.use('/', router)//this code will cause a crash until you export your router

server.listen(port, ()=> console.log(`Aye! You are learning to make it work! And the port is ${port}`))
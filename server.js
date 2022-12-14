const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const colors = require('colors')
const app = express()
const path = require('path')
const users = require('./routes/users')
dotenv.config({ path: './config/config.env' })
const PORT = process.env.PORT
const cookieParser = require('cookie-parser')

connectDB()

app.use(express.static('Frontend'))
app.use(express.json())
app.use(cookieParser())
app.use('/', users)

const server = app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`.cyan.bold)
})

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red.bold)
})
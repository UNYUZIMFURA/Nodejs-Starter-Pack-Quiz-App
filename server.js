const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const colors = require('colors')
const PORT = process.env.PORT
const users = require('./routes/users')
const app = express()
const path = require('path')

app.use(express.static('Frontend'))
app.use(express.json())

dotenv.config({ path: './config/config.env' })

connectDB()

app.use('/', users)

const server = app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`.cyan.bold)
})

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red.bold)
    server.close(() => process.exit(1))
})
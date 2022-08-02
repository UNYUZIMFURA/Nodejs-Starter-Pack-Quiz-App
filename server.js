const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const colors = require('colors')
const path = require('path')
const users = require('./routes/users')


dotenv.config({ path: './config/config.env' })

connectDB()



const app = express()
app.use(express.static('Frontend'))

app.use(express.json())
const PORT = process.env.PORT

app.use('/', users)
const server = app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`.cyan.bold)
})

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red.bold)
    server.close(() => process.exit(1))
})
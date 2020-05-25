require('dotenv').config()

console.log(process.env.TZ)
const express = require('express')
const app = express()

const bodyParser = require('body-parser')

const temperatureRouter = require('./routers/router-temperatures.js')

app.use(bodyParser.json())

app.use('/api/temperatures', temperatureRouter)

app.listen(5000, () => console.log(`Listening on port ${5000}...`))

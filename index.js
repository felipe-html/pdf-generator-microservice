var express = require('express')
const bodyParser = require('body-parser')
var app = express()
const cors = require('cors')

//routes
const assti = require('./routes/service-report/service-report')

app.use(bodyParser.json())
app.use(cors())
app.use('/assti', assti)
app.listen(3003, () => {
    console.log("Server started on http://localhost:3003/assti/service-report");
})
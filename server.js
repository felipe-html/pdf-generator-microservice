var express = require('express')
const bodyParser = require('body-parser')
var app = express()

//routes
const assti = require('./routes/service-report/service-report')

app.use(bodyParser.json())
app.use('/assti', assti)
app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
})
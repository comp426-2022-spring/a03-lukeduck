const express = require('express')
const app = express()

var port = 5001 // change to command line later (default 5000)

const server = app.listen(port, () => {
    console.log('App is running on port %PORT%'.replace('%PORT%', port))
})

app.use(function(req,res) {
    res.status(404).send("Endpoint does not exist")
    res.type("text/plain")
})
var express = require('express')
var bodyParser = require('body-parser')
var video = require('./controllers/video')
var playlist = require('./controllers/playlist')
var port = process.env.PORT || 8009

var app = express()

app.use(bodyParser.json())
app.set('view engine', 'ejs')

// Public Folder
app.use(express.static('./public'))
app.use('/api/video',video)
app.use('/api/playlist',playlist)

app.listen(port, function (){
	console.log("Listening on", port)
})

module.exports = app

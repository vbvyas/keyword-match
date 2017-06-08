const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    index = require('./controllers'),
    app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', index.index)
app.post('/', index.compare)

app.listen(3000, () => {
    console.log('Server started:', 'http://localhost:3000')
})
const Matcher = require('../lib/matcher')

function index(req, res) {
    res.render('index')
}

function compare(req, res) {
    let matcher = new Matcher(req.body.text1, req.body.text2)
    res.json(matcher.match())
}

module.exports = {
    index,
    compare
}
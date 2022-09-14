const express = require('express')
const request = require('request')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server Online in http://localhost:${port}`))
app.use(express.static(path.join(__dirname, '..', 'public')))

const viewsPath = path.join(__dirname, '..', 'templates', 'views')
app.set('view engine', 'hbs')
app.set('views', viewsPath)

const apiURL = `https://newsapi.org/v2/top-headlines?country=eg&category=entertainment&apiKey=cdb8e7fcef874a5c918afe2886db3712`
request({
    url: apiURL,
    json: true,
    headers: { 'User-Agent': 'request' }
}, (err, response) => {
    if (err) console.log(`You have error:${err}`)
    app.get('/', (req, res) => {
        res.render('index', {
            news: response.body.articles
        })
    })
})
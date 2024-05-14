require('dotenv').config()
const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')

const artistsRouter = require ('./routes/artists')

const port = process.env.PORT || 3000

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

nunjucks.configure('views', {
    autoescape: true,
    express: app,
})

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index.njk',{
        title: "landing page"
    })
})

app.use('/artists', artistsRouter)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })

/*
const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
    autoescape: true,
    express: app,
})

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index.njk', {
        title: "Landing pages"
    })
})

app.listen(3000, () => {
    console.log('server is listening on https://localhost:3000')
})
*/






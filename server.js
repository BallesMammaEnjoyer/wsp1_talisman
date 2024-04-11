const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('hello world med nodemon')
})

app.listen(3000, () => {
    console.log('bla bla')
})
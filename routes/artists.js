const express = require('express')
const router = express.Router()
const { body, matchedData, validationResult } = require('express-validator')

const pool = require('../db')

router.get('/', async (req, res) => {

    const [artists] = await pool.promise().query('SELECT * FROM mille_artist')

    console.log(artists)

    res.render('artists.njk', {
        title: 'All artists',
        artists
    })
})
router.get('/new', (req, res) => {
    res.render('newartist.njk', {
        title: 'Create new artist',
    })
})

router.post('/new',
    body('name').notEmpty().trim().escape(),
 async (req, res) => {
        
        const result = validationResult(req);

        if(result.isEmpty()){
            const data = matchedData(req);
            

        const [dbResult] = await pool.promise().query('INSERT INTO mille_artist (name) VALUES (?)', [data.name])
        console.log(result)

        if (dbResult.affectedRows === 1) {
            res.send('form posted, artist created')

        } else {
            res.status(500)
        }
    } else {
        res.send({errors: result.array()});
    }

})

router.get('/:id', async (req, res) => {
    console.log(Number.isInteger(parseInt(req.params.id)))

    const id = parseInt(req.params.id)
    if (Number.isInteger(id)) {
        const [artist] = await pool.promise().query('SELECT * FROM mille_artist WHERE id = ?', [id])

        res.render('artist.njk', {
            title: artist[0].name,
            artist: artist[0]
        })
    } else {

        res.redirect('/artists')
    }

})





module.exports = router
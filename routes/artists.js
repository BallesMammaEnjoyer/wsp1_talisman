const express = require('express')
const router = express.Router()
const { param, body, matchedData, validationResult } = require('express-validator')

const pool = require('../db')
const { text } = require('body-parser')

router.get('/', async (req, res) => {

    const [artists] = await pool.promise().query('SELECT * FROM mille_artist')

    const [albums] = await pool.promise().query('SELECT * FROM mille_album')

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
    body('name').notEmpty().trim().escape().isLength({min: 1, max:100}),
    async (req, res) => {

        const result = validationResult(req);
        

        if (result.isEmpty()) {
            const data = matchedData(req);
            const [dbResult] = await pool.promise().query('INSERT INTO mille_artist (name) VALUES (?)', [data.name])
            console.log(result)

            if (dbResult.affectedRows === 1) {
                //res.send('form posted, artist created')
                //res.redirect('/artists/' + dbResult.insertId)
                res.redirect('/artists')
            } else {
                res.status(500)
            }
        } else {
            // res.redirect('newartist')
            res.render("newartist.njk", { title: "Create new artist", error: "Felaktig input"})
            
        }

    })

router.get('/:id/edit',
    param('id').notEmpty().isInt().trim(),
    async (req, res) => {
        const validation = validationResult(req)
        console.log(validation)

        if (validation.isEmpty()) {
            const data = matchedData(req)
            const [artist] = await pool
                .promise()
                .query('SELECT * FROM mille_artist WHERE id = ?', [data.id])


            if (artist.length > 0) {
                res.render('editartist.njk', {
                    title: 'Edit artist',
                    artist: artist[0]
                })
            } else {
                console.log('artist not found error')
                res.redirect('/artists')
            }
        } else {
            res.send('validation error')
        }
    })

router.post('/:id/edit',
    body('name').notEmpty().trim().escape().isLength({min: 1, max:100}),
    param('id').notEmpty().isInt().trim().isLength({min: 1, max:100}),
    async (req, res) => {

        const validation = validationResult(req);
        console.log({ validation })

        if (validation.isEmpty()) {
            const data = matchedData(req);
            console.log({data})
            const [artist] = await pool
                .promise()
                .query('SELECT * FROM mille_artist WHERE id = ?', [data.id])

            if (artist.length > 0) {
                if (artist[0].name === data.name) {
                    console.log('nothing to update')
                    return res.redirect('/artists')
                } else {
                    const [result] = await pool.promise().query('UPDATE mille_artist SET name = ? WHERE id = ?', [data.name, data.id])
                    if (result.changedRows === 1) {
                        console.log('fjisjgis')
                        res.redirect('/artists/' + data.id)
                    } else {
                        console.log('failed to update')
                        res.redirect(`/artists/${data.id}/edit`)
                    }
                }
            } else {
                console.log('artist not found')
                res.redirect('/artists')
            }


            /*
                        if (dbResult.affectedRows === 1) {
                            //res.send('form posted, artist created')
                            //res.redirect('/artists/' + dbResult.insertId)
                            res.redirect('/artists')
                        } else {
                            res.status(500)
                        }
            */
        } else {
            res.render("editartist.njk", { title: "Edit artist", error: "Felaktig input"})
        }

    })

//delete
router.post('/:id/delete', param('id').notEmpty().isInt().trim(), async (req, res) => {

    const validation = validationResult(req)
    if (validation.isEmpty()) {
        const data = matchedData(req)
        const [result] = await pool
            .promise()
            .query('DELETE FROM mille_artist WHERE id = ?', [data.id])

        if (result.affectedRows === 1) {
            //resource deleted
            res.redirect('/artists')
        } else {
            res.redirect('/artists')
        }
    } else {
        res.send('validation failed')
    }
})


router.get('/:id', param('id').notEmpty().isInt().trim(), async (req, res) => {
    const result = validationResult(req)
    console.log(result)

    if (result.isEmpty()) {
        const data = matchedData(req)
        const [artist] = await pool
            .promise()
            .query('SELECT * FROM mille_artist WHERE id = ?', [data.id])

        if (artist.length > 0) {
            return res.render('artist.njk', {
                title: artist[0].name,
                artist: artist[0],
                
            })
        } else {
            console.log('artist not found error')
            res.redirect('/artists')
        }
    } else {

        res.redirect('/artists')
    }

})





module.exports = router
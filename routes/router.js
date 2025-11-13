//export router
const express = require('express')
const router = express.Router()
const port = process.env.port || 3000

//http://localhost:3000
router.get('/', (req, res)=>
{
    res.send('<h1>Movie App</h1>')
})

//root route => http://localhost:3000/api
router.get('/api', (req, res)=>
{
    res.json(
    {
        'All Movies': `http://localhost:${port}/api/movie`,
        'All Actors': `http://localhost:${port}/api/actor`,
        'All Directors': `http://localhost:${port}/api/director`,
        'All Genres': `http://localhost:${port}/api/genre`,
        'All Productions': `http://localhost:${port}/api/production`
    })
})

//endpoint
router.use('/api/movie', require('./api/movieRoutes'))
router.use('/api/actor', require('./api/actorRoutes'))
router.use('/api/director', require('./api/directorRoutes'))
router.use('/api/genre', require('./api/genreRoutes'))
router.use('/api/production', require('./api/productionRoutes'))


//error handling
router.use((req, res, next)=>
{
    res.status(404)
    .send('<h3>404 ERROR:</h3><h1> THIS PAGE DOES NOT EXIST!</h1>')
})

module.exports = router
//export router
const express = require('express')
const router = express.Router()
const port = process.env.port || 3000

//http://localhost:3000
router.get('/', (req, res)=>
{
    //res.send('<h1>Movie App</h1>')
    res.render('pages/home',
    {
        title: 'movie-app home',
        name: "LaTorya's Movie App"
    })
})

//Actor-Form => http://localhost:3000/actor-form
router.get('/actor-form', (req, res)=>
{
    res.render('pages/actor-form',
        {
            title: 'actor form',
            name: 'actor-form'
        }
    )
})

//Director-Form => http://localhost:3000/director-form
router.get('/director-form', (req, res)=>
{
    res.render('pages/director-form',
        {
            title: 'director form',
            name: 'director form'
        }
    )
})

//Genre-Form => http://localhost:3000/genre-form
router.get('/genre-form', (req, res)=>
{
    res.render('pages/genre-form', 
        {
            title: 'genre form',
            name: 'genre-form'
        }
    )
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
        'All Productions': `http://localhost:${port}/api/production`,
        'All Streaming Platforms': `http://localhost:${port}/api/streaming_platform`
    })
})

//endpoint
// router.use('/api/movie', require('./api/movieRoutes'))
// router.use('/api/actor', require('./api/actorRoutes'))
// router.use('/api/director', require('./api/directorRoutes'))
// router.use('/api/genre', require('./api/genreRoutes'))
// router.use('/api/production', require('./api/productionRoutes'))
// router.use('/api/streaming_platform', require('./api/streaming_platformRoutes'))
const endpoints = 
[
    'movie',
    'actor',
    'director',
    'genre',
    'production',
    'streaming_platform'
]

endpoints.forEach(endpoint =>
{
    router.use(`/api/${endpoint}`, require(`./api/${endpoint}Routes`))
})

//error handling
router.use((req, res, next)=>
{
    res.status(404)
    //.send('<h3>404 ERROR:</h3><h1> THIS PAGE DOES NOT EXIST!</h1>')
    .render('pages/error',
    {
        title: 'Error Page',
        name: 'Error'
    })
})

module.exports = router
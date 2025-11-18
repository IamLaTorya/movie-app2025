const router = require('express').Router()
const { streaming_platformDao : dao } = require('../../daos/dao')

router.get('/', (req, res)=> {
    dao.findAll(res, dao.table)
})

router.get('/count', (req, res)=> {
    dao.countAll(res, dao.table)
})

router.get('/search', (req, res)=> {
    dao.findMoviesByStreamingPlatform(req, res, dao.table)
})

router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

//POST
//http://localhost:3000/api/streaming_platform/create
router.post('/create', (req, res)=>
{
    dao.create(req, res, dao.table)
})

//PATCH
router.patch('/update/:id', (req, res)=>
{
    dao.update(req, res, dao.table)
})

module.exports = router 
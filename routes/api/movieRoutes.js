const router = require('express').Router()
const { movieDao : dao } = require('../../daos/dao')

router.get('/', (req, res)=> 
{
    dao.findMovieInfo(res, dao.table)
})

router.get('/sort/:sorter', (req, res)=> 
{
    dao.sort(res, dao.table, req.params.sorter)
})

router.get('/search', (req, res)=>
{
    dao.search(req, res, dao.table)
})

router.get('/:id', (req, res)=> 
{
    dao.findById(res, dao.table, req.params.id)
})
router.get('/count', (req, res)=> 
{
    dao.countAll(res, dao.table)
})

//POST
//http://localhost:3000/api/production/create
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
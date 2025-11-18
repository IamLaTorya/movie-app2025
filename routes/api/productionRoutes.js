const router = require('express').Router()
const { productionDao : dao } = require('../../daos/dao')

router.get('/', (req, res)=> {
    dao.findAll(res, dao.table)
})

router.get('/count', (req, res)=> {
    dao.countAll(res, dao.table)
})

router.get('/search', (req, res)=> {
    dao.findMoviesByProduction(req, res, dao.table)
})

router.get('/', (req, res)=>
{
    dao.findMoviesByProduction(req, res, dao.table, req.params.id)
})

router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
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
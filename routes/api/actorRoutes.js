const router = require('express').Router()
const { actorDao : dao} = require('../../daos/dao')

router.get('/', (req, res)=> 
{
    dao.findMovieInfo(res, dao.table)
})
router.get('/search', (req, res)=>
{
    dao.search(req, res, dao.table)
})
//http:localhost:3000/api/actor
router.get('/', (req, res)=>
{
    dao.findMovieByActor(res, dao.table, req.params.id)
})

router.get('/sort/:sorter', (req, res)=> 
{
    dao.sort(res, dao.table, req.params.sorter)
})

router.get('/:id', (req, res)=> 
{
    dao.findById(res, dao.table, req.params.id)
})


module.exports = router
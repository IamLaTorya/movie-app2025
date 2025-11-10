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

router.get('/:id', (req, res)=> 
{
    dao.findById(res, dao.table, req.params.id)
})


module.exports = router
const daoCommon = require('./common/daoCommon')

const movieDao = 
{
    ...daoCommon,
    ...require('./api/movieDao')
}

const actorDao = 
{
    ...daoCommon,
    ...require('./api/actorDao')
}

module.exports = 
{
    movieDao,
    actorDao
}
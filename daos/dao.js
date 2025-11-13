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

const directorDao = 
{
    ...daoCommon,
    ...require('./api/directorDao')
}

const genreDao =
{
    ...daoCommon,
    ...require('./api/genreDao')
}

const productionDao =
{
    ...daoCommon,
    ...require('./api/productionDao')
}

const streaming_platformDao =
{
    ...daoCommon,
    ...require('./api/streaming_platformDao')
}

module.exports = 
{
    movieDao,
    actorDao,
    directorDao,
    genreDao,
    productionDao,
    streaming_platformDao
}
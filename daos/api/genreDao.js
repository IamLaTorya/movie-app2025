const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')


    //methods that are particular to the artist table

    const genreDao = {

    table: 'genre',

    findMoviesByGenre: (req, res, table)=> {

        const query = req.query ? req.query : {}
        let genre = query.genre || null 

        let sql = ''

        if (genre != null) {
            // select all from one table and certain fields from another => stackoverflow
            sql = `SELECT movie.*, g.genre FROM movie JOIN movie_to_genre USING (movie_id) JOIN genre g USING (genre_id) WHERE g.genre = '${genre}';`
        } else {
            sql = `SELECT * FROM movie;`
        }

        console.log(sql)

        con.execute(
            sql,
            (error, rows)=> {
                rows.length == 0 ? res.send('<h1>No data to share</h1>') : queryAction(res, error, rows, table)
            }
        )
    }
}

module.exports = genreDao
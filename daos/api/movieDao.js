const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')


const movieDao = 
{
    table: 'movie',

    findMovieInfo: (res, table)=> 
    {

        const sql = `SELECT * FROM movie;`
        con.query(
		    sql,
		    (error, rows)=> 
            {
			    queryAction(res, error, rows, table)
		    }
	    )
    },
    findById: (res, table, id)=>
    {
        const sql = `SELECT title, movie_id, yr_released FROM ${table} WHERE movie_id = ${id};`

        con.query(
            sql,
            (error, rows)=>
            {
                queryAction(res, error, rows, table)
            }
        )
    },
    search: (req, res, table)=>
    {
        let sql = ''
        const query = req.query ? req.query : {}
        
        let genre = query.genre || null // comedy, drama, sci-fi, null
        let rating = query.rating || null

        if (genre == null && rating == null) {
            sql = `SELECT * FROM ${table};`
        } else if (rating == null) {
            sql = `SELECT m.*, g.genre_id, g.genre 
                FROM movie m 
                JOIN movie_to_genre USING (movie_id) 
                JOIN genre g USING (genre_id) 
                WHERE g.genre = '${genre}';`
        } else if (genre == null ) {
            sql = `SELECT * FROM movie WHERE rating = '${rating}';`
        } else {
            sql = `SELECT m.movie_id, m.title, m.rating, m.runtime, m.nationality, m.yr_released, m.budget, m.gross, m.production_id, m.showing, m.poster, g.genre_id, g.genre 
                FROM movie m 
                JOIN movie_to_genre USING (movie_id) 
                JOIN genre g USING (genre_id) 
                WHERE g.genre = '${genre}' AND m.rating = '${rating}';`
        }

        con.execute(
            sql,
            (error, rows)=> {
                rows.length == 0 ? res.send('<h1>No data to show</h1>') : queryAction(res, error, rows, table)
            }
        )
    }
}

module.exports = movieDao
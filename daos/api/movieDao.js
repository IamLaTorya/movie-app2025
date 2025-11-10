const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')


const movieDao = 
{

    table: 'movie',

    findMovieInfo: (res, table)=> 
    {

        const sql = `SELECT m.movie_id, m.title, m.rating, m.runtime, m.nationality, m.yr_released, m.budget, m.gross, m.production_id, m.showing, m.poster, 
        CASE 
            WHEN m.title = 'the great gatsby' THEN CONCAT(m.title, ' ', m.yr_released)
            ELSE m.title
            END AS conditional_title
        FROM movie m;`

        con.query(
		    sql,
		    (error, rows)=> {
			    queryAction(res, error, rows, table)
		    }
	    )
    }
}



module.exports = movieDao
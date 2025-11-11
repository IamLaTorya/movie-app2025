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
    }
}

module.exports = movieDao
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
    }
}



module.exports = movieDao
const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')

const actorDao = 
{
    table: 'actor',

    //methods that are particular to the artist table
    //store movies from an actor into an array and send with response
    //find albums by artist
    findMoviesByActor: (res, table, id)=>
    {
        const movies = []

        // let sql = `SELECT * FROM movie m JOIN movie_to_${table} USING (movie_id) JOIN ${table} USING (${table}_id) WHERE ${table}_id = ${id};`
        let sql = `SELECT a.actor_id, a.first_name, a.last_name, m.movie_id, m.title FROM actors a JOIN actor_to_movie am ON a.actor_id = am.actor_id JOIN movies m ON am.movie_id = m.movie_id ORDER BY a.first_name, m.title;`

        con.execute(
            sql,
            (error, rows)=> {
                if (!error) {
                    Object.values(rows).forEach(obj => {
                        movies.push(obj)
                    })
                    con.execute(
                        `SELECT first_name as first, last_name as last FROM ${table} WHERE ${table}_id = ${id};`,
                        (error, rows)=> {
                            rows.forEach(row => {
                                row.movies = movies
                            })
                            if (!error) {
                                res.json(...rows)
                            } else {
                                console.log('DAO Error', error)
                            }
                        }
                    )
                } else {
                    res.json({
                        message: 'error',
                        table: `${table}`,
                        error: error
                    })
                }
            }
        )
    },

    search: (req, res, table)=> {

        let sql = ''

        const query = req.query ? req.query : {}

        /**
         * Ex.
         * query = { first_name: ro, last_name: di }
         */

        let first_name = query.first_name || null
        let last_name = query.last_name || null

        if (first_name == null && last_name == null) {
            sql = `SELECT * FROM ${table};`
        } else if (last_name == null) {
            sql = `SELECT * FROM ${table} WHERE first_name LIKE '%${first_name}%';`
        } else if (first_name == null) {
            sql = `SELECT * FROM ${table} WHERE last_name LIKE '%${last_name}%';`
        } else {
            sql = `SELECT * FROM ${table} WHERE first_name LIKE '%${first_name}%' AND last_name LIKE '%${last_name}%';`
        }

        con.execute(
            sql, 
            (error, rows)=> {
                if (rows.length == 0) {
                    res.send('<h1>No data to send</h1>')
                } else {
                    queryAction(res, error, rows, table)
                }
            }
        )
    }
}

module.exports = actorDao
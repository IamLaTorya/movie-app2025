const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')

const directorDao = 
{
    table: 'director',

    //methods that are particular to the artist table

        search: (req, res, table)=> {

        let sql = ''

        const query = req.query ? req.query : {}

        let first_name = req.query.first_name || null
        let last_name = req.query.last_name || null

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
    },

    findMoviesByDirector: (res, table, id)=> {
        // store movies from a director into an array and send with response
        const movies = []

        let sql = `SELECT movie_to_director FROM movies ORDERED BY Director;`

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
    }
}

module.exports = directorDao
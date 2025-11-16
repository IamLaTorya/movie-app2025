const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')

const productionDao = 
{
    table: 'production',

    //methods that are particular to the artist table

    //find albums by artist
    findMoviesByProduction: (res, table, id)=>
    {
        let movies = []
        //this is a query
        let sql = `SELECT = ${id};`
        //.execute(query, callback function)
        //.execute(query, array, callback function)
        con.execute(
            sql,
            (error, rows)=> 
            {
                if (!error) 
                {
                    Object.values(rows).forEach(obj => 
                    {
                        movies.push(obj)
                    })
                    // console.log(albums)
                    //res.send('success')
                    con.execute(
                        `Select * FROM ${table} WHERE ${table}_id = ${id};`,
                        (error, rows)=> 
                        {
                            rows.forEach(row => 
                            {
                                row.movies = movies
                            })
                            if (!error) 
                            {
                                res.json(...rows)
                            } 
                            else 
                            {
                                console.log('DAO Error:', error)
                            }
                        }
                    )
                }
                else
                {
                    //res.end('error')
                    res.json(
                        {
                            message: 'error',
                            table: `${table}`,
                            error: error
                        }
                    )
                }
            }
        )
    }
}

module.exports = productionDao
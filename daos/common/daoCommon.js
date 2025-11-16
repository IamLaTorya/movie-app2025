const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')

const daoCommon = 
{

    findAll: (res, table)=> 
        {
        con.execute(
            `SELECT * FROM ${table};`,
            (error, rows)=> 
            {
                queryAction(res, error, rows, table)
            }
        )
    },

    findById: (res, table, id)=> 
        {
        con.execute(
            `SELECT * FROM ${table} WHERE ${table}_id = ${id};`,
            (error, rows)=> 
            {
                queryAction(res, error, rows, table)
            }
        )
    },

    sort: (res, table, sorter)=> 
        {
        con.execute(
            `SELECT * FROM ${table} ORDER BY ${sorter};`,
            (error, rows)=> 
            {
                queryAction(res, error, rows, table)
            }
        )
    },
    countAll: (res, table)=>
    {
        con.execute(
            `SELECT COUNT(*) as total_count FROM ${table};`,
            (error, rows)=>
            {
                queryAction(res, error, rows, table)
            }
        )
    },

    create: (req, res, table)=>
    {
        if(Object.keys(req.body).length ===0)
            //Object.keys(obj) => array of keys
        {
            res.json(
            {
                "error": true,
                "message": "No fields to create"
            })
        }
        else
        {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)
            connect.execute(
                `INSERT INTO ${table} SET ${fields.join(' = ?, ')} = ?;`,
                values,
                (error, dbres)=>
                {
                    if (!error)
                    {
                        res.json(
                        {
                            Last_id: dbres.insertId
                        })
                    }
                    else
                    {
                        console.log(`${table}Dao error: `, error)
                    }
                }
            )
        }
    }
}

module.exports = daoCommon
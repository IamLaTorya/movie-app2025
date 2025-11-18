//import dbconfig
const connect = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')

const daoCommon = 
{
    //create methods that will query the database
    findAll: (res, table)=>
    {
        //.query(sql query, callback function)
        connect.query(
            `SELECT * FROM ${table};`,
            (error, rows)=>
            {
                queryAction(res, error, rows, table)
                
            }
        )
    },
    findById: (res, table, id)=>
    {
        connect.query(
            `SELECT * FROM ${table} WHERE ${table}_id = ${id};`,
            (error, rows)=>
            {
                queryAction(res, error, rows, table)
                
            }
        )
    },
    sort: (res, table, sorter)=>
    {
        connect.execute(
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
            `SELECT COUNT(*) as total_count FROM $table;`,
            (error, rows)=>
            {
                queryAction(res, error, rows, table)
            }
        )
    },

    create: (req, res, table)=>
    {
        // console.log(req)
        // res.send('complete')
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
    },
update: (req, res, table)=> {

        // check if id == number
        if (isNaN(req.params.id)) {
            res.json({
                "error": true,
                "message": "Id must be a number"
            })
        } else if (Object.keys(req.body).length == 0) {
            res.json({
                "error": true,
                "message": "No fields to update"
            })
        } else {

            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            connect.execute(
                `UPDATE ${table} SET ${fields.join(' = ?, ')} = ? WHERE ${table}_id = ?;`,
                [...values, req.params.id],
                (error, dbres)=> {
                    if (!error) {
                        // res.send(`Changed ${dbres.changedRows} row(s)`)
                        res.json({
                            "status": 'updated',
                            "changedRows": dbres.changedRows
                        })
                    } else {
                        res.json({
                            "error": true,
                            "message": error
                        })
                    }
                }
            )
        }
    },
     /** DANGER ZONE!!! **/
    delete: (res, table, id)=> {
        console.log(`${table}_id: ${id}`)

        connect.execute(
            `DELETE from ${table} WHERE ${table}_id = ${id};
            SET @num := 0;
            UPDATE ${table} SET ${table}_id = @num := (@num + 1);
            ALTER TABLE ${table} AUTO_INCREMENT = 1;`,
            (error, dbres)=> {
                if (!error) {
                    res.send('Record Deleted')
                } else {
                    res.json({
                        "error": true,
                        "message": error
                    })
                }
            }
        )
        // prompt('Are you sure you want to delete?')

        // do stuff
    }
}

module.exports = daoCommon
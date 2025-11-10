const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')

const daoCommon = {

    findAll: (res, table)=> {
        con.execute(
            `SELECT * FROM ${table};`,
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    },

    findById: (res, table, id)=> {
        con.execute(
            `SELECT * FROM ${table} WHERE ${table}_id = ${id};`,
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    },

    sort: (res, table, sorter)=> {
        con.execute(
            `SELECT * FROM ${table} ORDER BY ${sorter};`,
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    },

    countAll: (res, table)=> {
        con.execute(
            `SELECT COUNT(*) as total_count FROM ${table};`,
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    }
}

module.exports = daoCommon
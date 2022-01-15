const mysql = require("mysql")

//insert database connection
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'root',
    database: "produtosDB"
})

function databaseProdutos() {
    return {
        insert: function(descProduto, price, qtd) {
            con.query(
                `insert into tb_produtos(DESC_produto, PRICE_produto, QTD_produto) values ("${descProduto}", "${price}", "${qtd}")`
            )
        },
        select: function(columns, table) {
            let promise = new Promise((resolve,reject) => {
                con.query(
                    `select ${columns} from ${table}`, function(err, results, fields){
                        if (results) {
                            resolve(JSON.parse(JSON.stringify(results)))
                        } else {
                            reject(err);
                        }
                    }) 
            }   )
            return promise  
        },
        selectWhere: function(columns, table, id) {
            let promise = new Promise((resolve,reject) => {
                con.query(
                    `select ${columns} from ${table} where ID_produto = ${id}`, function(err, results, fields){
                        if (results) {
                            resolve(JSON.parse(JSON.stringify(results)))
                        } else {
                            reject(err);
                        }
                    }) 
            }   )
            return promise  
        },
        update: function(table, valueToChange, changingValue, id) {
            con.query(
                `update ${table} set ${valueToChange} = "${changingValue}" where ID_produto = ${id}`
            )
        },
        updateMultiple: function(table, updatedValue1, updatedValue2, id) {
            con.query(
                `update ${table} set PRICE_produto = "${updatedValue1}", QTD_produto = "${updatedValue2}" where ID_produto = ${id}`
            )
        },
        delete: function(table, id) {
            con.query(
            `delete from ${table} where ID_produto = ${id}`, function(err, results, fields) {
                console.log(err);
                console.log(results);
            })
        }
    }
}

module.exports = databaseProdutos()

const db = databaseProdutos();

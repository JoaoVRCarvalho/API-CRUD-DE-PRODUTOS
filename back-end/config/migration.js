const sql = require("./db.js");
var fs = require('fs');
var readline = require('readline');
function initDb() {
    var rl = readline.createInterface({
        input: fs.createReadStream('./inital.sql'),
        terminal: false
    });
    rl.on('line', function (chunk) {
        sql.query(chunk.toString('ascii'), function (err, sets, fields) {
            if (err) console.log(err);
        });
    });
    rl.on('close', function () {
        console.log("finished");
    });
}

module.exports = initDb;

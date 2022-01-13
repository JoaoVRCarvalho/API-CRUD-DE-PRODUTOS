const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const initDb = require('./config/migration.js');
const sql = require("./config/db.js");
const cors = require('cors')
const fs = require("fs")
const priceFormatter = require("./model/priceValidation.model.js");
const path = require('path');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// Stactic files
app.use(express.static('../front-end'));
app.use(express.static("../front-end/view/produtos"))


// RUN HTML ON WEB SERVER
app.get("/produtos", (req, res) => {
    res.status(200).sendFile("produtos.html", {root:path.join(__dirname, "../front-end/view/produtos/")})
})

// CREATE
app.post("/api/produtos/post", (req, res) => { 
   let postDesc = req.body.nome; 
   let postPrice = priceFormatter(req.body.preco);
   let postQTD = req.body.quantidade;
   sql.insert(`${postDesc}`, `${postPrice}`, `${postQTD}`);
   res.redirect(302, "/produtos")
})

// READ ALL
app.get("/api/produtos", (req, res) => {
    sql.select("*", "tb_produtos").then(value => res.send(value))
})

// READ BY ID
app.get("/produtos/:id", (req, res) => {
    sql.selectWhere("*", "tb_produtos", req.params.id).then(value => res.send(value))
})

// UPDATE
app.post("/api/produtos/update/:id", (req, res) => {
    let postId = req.params.id;
    let postPrice = priceFormatter(req.body.preco);
    let postQTD = req.body.quantidade;
    sql.updateMultiple("tb_produtos", `${postPrice}`, `${postQTD}`, `${postId}`);
    res.redirect(302, "/produtos")
})

// UPDATE QTD
app.post("/api/produtos/updateprice/:id", (req, res) => {
    let postId = req.params.id;
    let postQTD = req.body.quantidade;
    if (postQTD === "0") {
        sql.update("tb_produtos", "QTD_produto", `Esgotado`, `${postId}`)
        res.redirect(302, "/produtos")
    }
    else {
        sql.update("tb_produtos", "QTD_produto", `${postQTD}`, `${postId}`)
        res.redirect(302, "/produtos")
    }
})
// DELETE
app.get("/api/delete/:id", (req, res) => {
    sql.delete("tb_produtos", `${req.params.id}`)
    res.redirect(302, "/produtos")
})

app.listen(8080, console.log("Running"));
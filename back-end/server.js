const express = require("express");
const mysql = require("mysql");
const cors = require('cors');

const app = express()
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
})

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to database");
    }
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` =? AND `password` =?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json("Error")
        }
        if (data.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Failed")
        }
    })
})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login SET ?";
    const data = {
        email: req.body.email,
        password: req.body.password
    }
    db.query(sql, data, (err, result) => {
        if (err) {
            return res.json("Error")
        }
        return res.json("Success")
    })
})

app.listen(8081, () => {
    console.log("listening")
})
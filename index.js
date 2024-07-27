const express = require("express");
require("dotenv").config;

const port = 8080;

const connection = require("./db.config");

const app = express();

app.get('/', (req, res) => {
    res.send("Hii from server");
});

connection() 
app.listen(port, ()=>{
    console.log(`App is running on ${port}`);
}) 
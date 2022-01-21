const express = require('express');
const app = express();
const mysql = require('mysql');
const PORT = 5005;
const { connectionDb } = require('./mysql');
const routes = require('./routes');

connectionDb()

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(routes)

app.listen(PORT, () =>{
    console.log(`Server is listening to port ${PORT}`)
})
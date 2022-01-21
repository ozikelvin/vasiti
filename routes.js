const { Router } = require('express');
const route = Router();
const mysql = require('mysql');
const {  createTable, createProduct, 
    getVarieties, allProduct, updateProduct , deleteData } = require('./controller');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
   
  });

route.get('/', (req, res) =>{

    res.send({message:'Api is in good health....'})
})

  // Db creation
route.get('/createDb', (req, res)=>{

    const sql = 'CREATE DATABASE Vasiti';
    connection.query(sql, (err, result) =>{
        if(err) throw err;
      console.log('Database table created')

    })
})

// create DB table 
route.get('/createTable', createTable);

//create product

route.post('/createProd', createProduct);

// get varieties 

route.get('/varieties', getVarieties );

// Get all products
route.get('/all', allProduct);

//Update products
route.post('/update', updateProduct)

//Delete product

route.delete('/delete/:id', deleteData)


module.exports = route;

const { json } = require('express/lib/response');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database:'Vasiti'
  });

const createTable = (req, res) =>{
  
    let sql = 'CREATE TABLE products(id int AUTO_INCREMENT , product_name VARCHAR(255) , product_description VARCHAR(255) , product_varieties VARCHAR(255) , date_uploaded DATE, date_edited DATE  , in_cart VARCHAR(255), product_image VARCHAR(255) ,  PRIMARY KEY(id) )';

    connection.query(sql , (err, result) =>{
        if(err) throw err;
        res.send(result)
        console.log('Table created successfully')
    })
    
}

const createProduct = async(req, res) =>{
    const {product_name,product_description } = req.body;
    const newProduct = {
         product_name,
         product_description,
         product_varieties:JSON.stringify(req.body.product_varieties),
         date_uploaded: new Date().toISOString(),

    }

    let sql = 'INSERT INTO products SET ?';
     connection.query(sql, newProduct, (err, result)=>{
        if(err) {
            console.log(err)
            throw err
        }

        console.log('product created');
        res.status(200).json({message:'product created', data:result})
    })
}

const updateProduct = (req, res) =>{

    let product_varieties = JSON.stringify(req.body.product_varieties);
    let id = req.body.id;
    let dat = new Date();
    console.log(product_varieties)
    let sql = `UPDATE products SET product_varieties = '${product_varieties}', date_edited = '${dat.toISOString()}'  WHERE id = ${id} `;

    connection.query(sql, (err, result)=>{
        if(err) { 
            console.log(err)
            throw err  
        }
        
        console.log('Updated product info');
        res.status(200).json({message: 'Product updated successfully', data: result})
    })
}

const allProduct = (req, res) =>{

    let sql = 'SELECT * FROM products';
    connection.query(sql, (err, result) =>{
        if(err) {
            console.log(err)
            throw err
        }
        console.log(result);
        res.json({message:'All products', data:result})
    }
    )
}

const deleteData = (req, res) =>{

    //Performing soft delete

    let sql = `UPDATE products SET product_varieties = NULL  WHERE id = ${req.params.id}`
    connection.query(sql, (err, result) =>{
        if(err) {
            console.log(err)
            throw err
        }
        console.log(result);
        res.json({message:'Deleted product', data:result})
    }
    )
}


const getVarieties = (req, res) =>{

    let sql = 'SELECT product_varieties FROM products';
    connection.query(sql, (err, result)=>{
        if(err){
            throw err;
        }
        const resp = result.map(data =>{
            console.log(data)
        })
        console.log('Gotten product varieties'); 
        res.status(200).json({message:"Gotten product varieties", data: result})
    })
}

module.exports = { createTable , createProduct, getVarieties,
allProduct, updateProduct , deleteData
}

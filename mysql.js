const mysql = require('mysql');


const connectionDb = async() =>{
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',

      });

     return  connection.connect((err) =>{
          if(err){
              console.error(err);
              throw err;
          }
          console.log('Mysql connected successfully')
      })

}

module.exports = { connectionDb }
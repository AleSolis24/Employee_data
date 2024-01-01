const mysql = require("mysql2");


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Snoopy24",
  database: "employees" 
}
);


connection.connect( function (err) {
    if (err) throw err;
    console.log('Cannot connect to database.')
});

module.exports = connection
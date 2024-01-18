const mysql = require("mysql2");


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Snoopy24dd",
  database: "employees_db" 
}
);


connection.connect( function (err) {
    if (err) throw err;
    console.log('Cannot connect to database.')
});

module.exports = connection
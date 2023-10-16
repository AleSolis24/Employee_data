const mysql = require("mysql12");

const connection = mysql.creatConnection(
{
    host: "localhost",
    user: "root",
    password: "Snoopy24"
},
console.log ('Connected to SQL database.')
);

connection.connect( function (err) {
    if (err) throw err;
    console.log('Cannot connect to database.')
});
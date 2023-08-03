const mysql = require("mysql2");
const ErrorEntity = require("../error/errorEntity");

var connection = mysql.createConnection({
    host: "localhost",
    database: "url_shorten",
    user: "root",
    password: "password",
});

connection.connect(function(error) {
    if (error) {
        console.error(error);
        throw new ErrorEntity(500, "Error conencting to database.");
    } else {
        console.log("MySQL database connection successful!");
    }
});

module.exports = connection;
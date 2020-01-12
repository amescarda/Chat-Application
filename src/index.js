var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

 app.use(express.json());
 app.use(express.urlencoded({
     extended: true
 }));

 // default route
 app.get('/', function (req, res) {
     return res.send({ error: true, message: 'hello' })
 });

// connection configurations
var sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'chat'
});

// connect to database
sql.connect();


// Retrieve all users
app.get('/api/users', function (req, res) {
    sql.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});


// Retrieve user with id
app.get('/api/user/:id', function (req, res) {

    let user_id = req.params.id;

    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }

    sql.query('SELECT * FROM users WHERE id=?', user_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'users list.' });
    });

});


// Add a new user
app.post('/api/user', function (req, res) {

    let user = req.body.user;

    // if (!user) {
    //     return res.status(400).send({ error:true, message: 'Please provide user' });
    // }

  sql.query("INSERT INTO users SET ?", {user: user}, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
    });
});

// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});

module.exports = app;

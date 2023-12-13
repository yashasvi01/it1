const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000; // Change as needed

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Middleware to parse POST request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle SignIn form submission
app.post('/signin', (req, res) => {
    const { username, password } = req.body;

    // Perform database query to check credentials
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length > 0) {
            // Successful SignIn
            res.send('Welcome ' + username);
        } else {
            res.send('Invalid credentials');
        }
    });
});

// Handle SignUp form submission
app.post('/signup', (req, res) => {
    const { newUsername, newPassword } = req.body;

    // Perform database query to insert new user
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [newUsername, newPassword], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Successful SignUp
        res.sendFile(__dirname + '/index.html');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

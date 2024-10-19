const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

// Set up SQLite database connection
const db = new sqlite3.Database('./info.db', (err) => {
    if (err) {
        console.error('Database connection error:', err.message);
        return;
    }
    console.log('Connected to the SQLite database.');
});

// Route to get all users
app.get('/users', (req, res) => {
    db.all(`SELECT * FROM Users`, [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(rows);
    });
});

app.get('/posts', (req, res) => {
    db.all(`SELECT * FROM Posts`, [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(rows);
    });
});
// TODO get user and posts by id 


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

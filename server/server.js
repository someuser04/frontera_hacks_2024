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

// Route to get all users with their posts
app.get('/usersWithPosts', (req, res) => {
    db.all(`SELECT * FROM User_Posts`, [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(rows);
    });
});

// Route to get all posts
app.get('/posts', (req, res) => {
    db.all(`SELECT * FROM Posts`, [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(rows);
    });
});

// TODO get post by id
app.get('/posts/:id', (req, res) => {
    const id = req.params.id;
    db.get(`SELECT * FROM Posts WHERE id = ?`, [id], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(rows);
    });
});

// TODO get user by id
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    db.get(`SELECT * FROM Users WHERE id = ?`, [id], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(rows);
    });
});

// Registering User
app.post('/register', (req, res) => {
	const { username, password } = req.body;
	db.run("INSERT INTO Users (username, password) VALUES (?, ?)", [username, password], (err) => {
		if (err) {return res.status(400).send("Username already exists")}
		res.status(200).send("User Registered");
	})
})

// Logging User
app.post("/login", (req, res) => {
	const { username, password } = req.body;
	db.get("SELECT * FROM Users WHERE username = ? AND password = ?", [username, password], (err, rows) => {
		if (err || !rows) {
			return res.status(400).send("Invalid!");
		}
		res.status(200).send("Login Successful!")
	})
})

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

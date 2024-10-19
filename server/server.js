const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

app.get('/', async (req, res) => {
    res.send('Hello World');
});

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});
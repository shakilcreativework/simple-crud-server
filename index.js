const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// mongodb+srv://simpleCRUD:<db_password>@cluster0.68fcvxk.mongodb.net/?appName=Cluster0
// simpleCRUD
// ZFJx08eSidzqTK6e

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Simple CRUD server is running...');
});

app.listen(port, () => {
    console.log('Simple CRUD server is running on port', port);
});
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8000;
const UserRouter = require('./Routes/user.js');

const db = require("./config/keys").mongoURI;

const path = require("path");

app.use(cors());
app.use(bodyParser.json());


/*mongoose.connect(db, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})*/

app.use(express.static(path.join(__dirname, "client", "build")))

app.use('/users', UserRouter);

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(PORT, function() {
    console.log(`Server is running on Port: ${PORT}.`);
});



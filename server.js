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


mongoose.connect(db, function (err) {
    if (err) {
        console.log(err);
    }
});
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.use('/users', UserRouter);
//app.use(express.static(path.join("client", "build")))
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(PORT, function() {
    console.log(`Server is running on Port: ${PORT}.`);
});



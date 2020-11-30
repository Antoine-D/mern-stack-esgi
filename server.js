const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 8000;


const UserRouter = require('./Routes/user.js');

app.use(cors());
app.use(bodyParser.json());

//const db = require("config/keys").mongoURI;
const db = "mongodb+srv://admin:Qe1ehZeYjuEnvRWZ@mern-stack.goyit.mongodb.net/mern-users?retryWrites=true&w=majority";
mongoose.connect(db, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.use('/users', UserRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});



const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8000;
const UserRouter = require('./Routes/user.js');

const db = require("./config/keys").mongoURI;

app.use(cors());
app.use(bodyParser.json());


mongoose.connect(db, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.use(express.static('client/'));
app.use('/users', UserRouter);

app.listen(PORT, function() {
    console.log(`Server is running on Port: ${PORT}.`);
});



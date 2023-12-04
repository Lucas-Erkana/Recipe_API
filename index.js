// Import required modules
require('dotenv').config(); // Loads environment variables from a .env file into process.env
const express = require('express'); // Importing Express framework
const bodyParser = require('body-parser'); // Importing body-parser to parse request bodies
const mongoose = require('mongoose'); // Importing Mongoose for MongoDB interactions
const userRoutes = require('./routes/userRoutes'); // Importing routes for user-related operations
const recipeRoutes = require('./routes/recipeRoutes'); // Importing routes for recipe-related operations
const cors = require('cors'); // Importing CORS to enable cross-origin resource sharing
const morgan = require('morgan');

const app = express(); // Creating an instance of Express
const PORT = process.env.PORT || 3000; // Setting the port number from environment variables or defaulting to 3000

// Middleware to parse JSON bodies
app.use(bodyParser.json()); // Using bodyParser to parse JSON formatted request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Allowing bodyParser to parse URL encoded bodies

app.use(cors()); // Enabling CORS for all routes

// Connect to MongoDB
mongoose.set('strictQuery', false); // Configuring Mongoose to relax strict query filters
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL); // Attempting to connect to MongoDB
        console.log(`MongoDB Connected: ${conn.connection.host}`); // Logging successful connection
    } catch (error) {
        console.error(error); // Logging any connection errors
        process.exit(1); // Exiting the process in case of a connection error
    }
};

app.use(morgan('dev')); // 'dev' is a predefined format string


// Use routes for handling paths
app.use('/', userRoutes); // Mounting user routes at the root path
app.use('/', recipeRoutes); // Mounting recipe routes at the root path

// Connect to the database and start the server
connectDB().then(() => {
    app.listen(PORT, () => { // Starting the Express server
        console.log(`Listening on port ${PORT}`); // Logging the port number on which the server is listening
    });
});

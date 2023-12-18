// Importing the required MongoClient from the mongodb package
const { MongoClient } = require("mongodb");

// MongoDB connection URL and port
const url = "mongodb://localhost:27017";

// Defining the connection function
const connection = () => {
    // Using the MongoClient to connect to the MongoDB server
    MongoClient.connect(url)
        .then((connection) => console.log(connection))
        .catch((err) => console.log("Not connected"));
};

// Exporting the connection function for external use
module.exports = connection;

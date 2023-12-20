// Importing the required MongoClient from the mongodb package
const { MongoClient } = require('mongodb');

// Importing the mongoConfig object from the config module
const { mongoConfig } = require('../config');

// Defining a class for MongoDB operations
class MongoDB {
    // Static method to connect to MongoDB
    static connectToMongoDB = () => {
        // Using the MongoClient to establish a connection to the MongoDB server
        MongoClient.connect(mongoConfig.connectionUrl)
            .then((connection) => {
                // If the connection is successful, log a success message and set the 'db' property
                console.log("MongoDB Connected");
                this.db = connection.db(mongoConfig.database);
            })
            .catch((error) => {
                // If there's an error during the connection, log an error message
                console.log(`MongoDB not Connected : ${error}`);
            });
    };
}

// Initializing the 'db' property to null in the MongoDB class
MongoDB.db = null;

// Exporting the MongoDB class for external use
module.exports = MongoDB;


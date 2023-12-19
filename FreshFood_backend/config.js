// Importing the projectConfig from the package.json file
const config = require("./package.json").projectConfig
// Exporting a configuration module for MongoDB
module.exports = {
    // Configuration for MongoDB
    mongoConfig: {
        // MongoDB connection URL (replace with the correct port, should be 27017 by default)
        connectionUrl: "mongodb://localhost:27017",
        
        // Name of the MongoDB database to be used
        database: "database_food",

        // Collections within the database
        collections: {
            // Collection for user data
            USERS: "users"
        }
    },
    serverConfig: {
        ip: config.serverIp,
        port: config.serverPort,
    },
};

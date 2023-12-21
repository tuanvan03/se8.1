const MongoDB = require("./mongodb.service");
const { mongoConfig } = require("../config");

const userRegister = async (user) => {
    try {
        let userObject = {
            username: user?.username,
            email: user?.email,
            password: user?.password
        }
        // doi duyet 
        let savedUser = await MongoDB.db.collection(mongoConfig.collections.USERS).insertOne(userObject);
        if (savedUser?.acknowledged && savedUser?.insertedId) {
            return {
                status: true,
                message: "User registered successfully!!! Cung hi cung hi",
            };
        } else {
            return {
                status: false,
                message: "User registered faild!!! Let's try!!",
            };
        }
    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: "User registered faild!!! Let's try!!!",
            error: error
        };
    }
};

module.exports = { userRegister };
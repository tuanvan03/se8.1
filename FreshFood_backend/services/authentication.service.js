const MongoDB = require("./mongodb.service");

const { mongoConfig, tokenSecret } = require("../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

const userRegister = async (user) => {
    try {
        if (!user?.username || !user?.email || !user?.password)
            return { status: false, message: "Please fill up all the fields" };
        const passwordHash = await bcrypt.hash(user?.password, 10);
        let userObject = {
            username: user?.username,
            email: user?.email,
            password: passwordHash,
        };
        let savedUser = await MongoDB.db
            .collection(mongoConfig.collections.USERS)
            .insertOne(userObject);
        if (savedUser?.acknowledged && savedUser?.insertedId) {
            let token = jwt.sign(
                { username: userObject?.username, email: userObject?.email },
                tokenSecret,
                { expiresIn: "24h" }
            );
            return {
                status: true,
                message: "User registered successfully",
                data: token,
              };
        }   else {
            return {
                status: false,
                message: "User registered failed",

            };
        }
    } catch (error) {
        console.log(error);

        let errorMessage = "User registered failed";
        error?.code === 11000 && error?.keyPattern?.username
            ? (errorMessage = "Username already exist")
            : null;
        error?.code === 11000 && error?.keyPattern?.email
            ? (errorMessage = "Email already exist")
            : null;
        return {
            status: false,
            message: errorMessage,
            error: error?.toString(),

        };
    }
};


const userLogin = async (user) => {
    try {
        if (!user?.username || !user?.password)
            return { status: false, message: "Please fill up all the fields" };
        let userObject = await MongoDB.db
            .collection(mongoConfig.collections.USERS)
            .findOne({ username: user?.username });
        if (userObject) {
            let isPasswordVerfied = await bcrypt.compare(
            user?.password,
            userObject?.password
            );
            if (isPasswordVerfied) {
                let token = jwt.sign(
                    { username: userObject?.username, email: userObject?.email },
                    tokenSecret,
                    { expiresIn: "24h" }
                );
                return {
                    status: true,
                    message: "User login successful",
                    data: token,
                };
            } else {
                return {
                    status: false,
                    message: "Incorrect password",
                };
            }
        } else {
            return {
            status: false,
            message: "No user found",
            };
        }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: "User login failed",
        error: error?.toString(),
      };
    }
};

const checkUserExist = async (query) => {
    let messages = {
      email: "Email đã được dùng !!!",
      username: "Tên người dùng đã tồn tại !!!",
    };
    try {
      let queryType = Object.keys(query)[0];
      let userObject = await MongoDB.db
        .collection(mongoConfig.collections.USERS)
        .findOne(query);
      return !userObject
        ? { status: true, message: `This ${queryType} is not taken` }
        : { status: false, message: messages[queryType] };
    } catch (error) {}
  };

module.exports = {userRegister, userLogin, checkUserExist};



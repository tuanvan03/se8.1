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

  const tokenVerification = async (req, res, next) => {
    console.log(
      `authentication.service | tokenVerification | ${req?.originalUrl}`
    );
    try {
      if (
        req?.originalUrl.includes("/login") ||
        req?.originalUrl.includes("/user-exist") ||
        req?.originalUrl.includes("/register") ||
        req?.originalUrl.includes("/refresh-token")
      )
        return next();
      let token = req?.headers["authorization"];
      if (token && token.startsWith("Bearer ")) {
        token = token.slice(7, token?.length);
        jwt.verify(token, config.tokenSecret, (error, decoded) => {
          if (error) {
            res.status(401).json({
              status: false,
              message: error?.name ? error?.name : "Token hợp lệ!!!",
              error: `Token hợp lệ | ${error?.message}`,
            });
          } else {
            req["username"] = decoded?.username;
            next();
          }
        });
      } else {
        res.status(401).json({
          status: false,
          message: "",
          error: "Token không hợp lệ",
        });
      }
    } catch (error) {
      res.status(401).json({
        status: false,
        message: error?.message ? error?.message : "Lỗi xác thực!!!",
        error: `Lỗi xác thực | ${error?.message}`,
      });
    }
  };

  const tokenRefresh = async (req, res) => {
    console.log(`authentication.service | tokenRefresh | ${req?.originalUrl}`);
    try {
      let token = req?.headers["authorization"];
      if (token && token.startsWith("Bearer ")) {
        token = token.slice(7, token?.length);
        jwt.verify(
          token,
          config.tokenSecret,
          { ignoreExpiration: true },
          async (error, decoded) => {
            if (error) {
              res.status(401).json({
                status: false,
                message: error?.name ? error?.name : "Token không hợp lệ !!!",
                error: `Token không hợp lệ | ${error?.message}`,
              });
            } else {
              if (decoded?.username && decoded?.email) {
                let newToken = jwt.sign(
                  { username: decoded?.username, email: decoded?.email },
                  tokenSecret,
                  { expiresIn: "24h" }
                );
                res.json({
                  status: true,
                  message: "Resfreh token thành công",
                  data: newToken,
                });
              } else {
                res.status(401).json({
                  status: false,
                  message: error?.name ? error?.name : "Token không hợp lệ",
                  error: `Token không hợp lệ | ${error?.message}`,
                });
              }
            }
          }
        );
      } else {
        res.status(401).json({
          status: false,
          message: error?.name ? error?.name : "Token bị thiếu",
          error: `Token bị thiếu | ${error?.message}`,
        });
      }
    } catch (error) {
      res.status(401).json({
        status: false,
        message: error?.name ? error?.name : "Refresh token thất bại",
        error: `Refresh token thất bại | ${error?.message}`,
      });
    }
  };

module.exports = {userRegister, userLogin, checkUserExist, tokenVerification, tokenRefresh};
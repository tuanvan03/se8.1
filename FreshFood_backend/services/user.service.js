const { mongoConfig } = require("../config");
const MongoDB = require("./mongodb.service");

const getUserData = async (username) => {
  try {
    let userObject = await MongoDB.db
      .collection(mongoConfig.collections.USERS)
      .findOne(username);

      console.log(userObject);
    if (userObject) {
      return {
        status: true,
        message: "Tìm thấy người dùng thành công!!!",
        data: userObject,
      };
    } else {
      return {
        status: false,
        message: "Không tìm thấy người dùng!!!",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Tìm kiếm thất bại !!!",
      error: `Tìm kiếm thất bại: ${error?.message}`,
    };
  }
};

module.exports = {getUserData};
const { mongoConfig } = require("../config");
const MongoDB = require("./mongodb.service");

const getAllRestaurant = async () => {
    try {
        let restaurants = await MongoDB.db
        .collection(mongoConfig.collections.RESTAURANTS)
        .find()
        .toArray();

        if (restaurants && restaurants?.length > 0) {
            return {
              status: true,
              message: "Tìm thấy nhà hàng thành công",
              data: restaurants,
            };
          } else {
            return {
              status: false,
              message: "Không tìm thấy nhà hàng",
            };
          }
    } catch (error) {
        return {
            status: false,
            message: "Tìm nhà hàng thất bại",
            error: `Tìm nhà hàng thất bại : ${error?.message}`,
          };
    }
}

module.exports = { getAllRestaurant};
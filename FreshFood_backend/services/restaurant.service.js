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

const getOneRestaurantById = async (restaurantId) => {
  try {
    let restaurant = await MongoDB.db
      .collection(mongoConfig.collections.RESTAURANTS)
      .aggregate([
        {
          $match: {
            id: restaurantId,
          },
        },
        {
          $lookup: {
            from: "foods",
            localField: "id",
            foreignField: "restaurantId",
            as: "foods",
          },
        },
      ])
      .toArray();
    if (restaurant && restaurant?.length > 0) {
      return {
        status: true,
        message: "Tìm nhà hàng thành công",
        data: restaurant[0],
      };
    } else {
      return {
        status: false,
        message: "Không nhà hàng nào được tìm thấy",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Tìm nhà hàng thất bại",
      error: `Tìm nhà hàng thất bại : ${error?.message}`,
    };
  }
};
module.exports = { getAllRestaurant, getOneRestaurantById};
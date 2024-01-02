const { mongoConfig } = require("../config");
const MongoDB = require("./mongodb.service");

const addToCart = async ({ foodId, username }) => {
  try {
    let updatedCart = await MongoDB.db
      .collection(mongoConfig.collections.CARTS)
      .updateOne(
        { foodId, username },
        { $inc: { count: 1 } },
        { upsert: true }
      );
    if (updatedCart?.modifiedCount > 0 || updatedCart?.upsertedCount > 0) {
      let cartResponse = await getCartItems({ username });
      return {
        status: true,
        message: "Mặt hàng được thêm vào giỏ hàng thành công",
        data: cartResponse?.data,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Mặt hàng được thêm vào giỏ hàng thất bại",
    };
  }
};

const removeFromCart = async ({ foodId, username }) => {
  try {
    let cart = await MongoDB.db
      .collection(mongoConfig.collections.CARTS)
      .findOne({ foodId, username, count: 1 });
    if (cart) {
      await MongoDB.db
        .collection(mongoConfig.collections.CARTS)
        .deleteOne({ foodId, username });
      let cartResponse = await getCartItems({ username });
      return {
        status: true,
        message: "Đã xóa mặt hàng khỏi giỏ hàng thành công",
        data: cartResponse?.data,
      };
    }
    let updatedCart = await MongoDB.db
      .collection(mongoConfig.collections.CARTS)
      .updateOne(
        { foodId, username },
        { $inc: { count: -1 } },
        { upsert: true }
      );
    if (updatedCart?.modifiedCount > 0 || updatedCart?.upsertedCount > 0) {
      let cartResponse = await getCartItems({ username });
      return {
        status: true,
        message: "Đã xóa mặt hàng khỏi giỏ hàng thành công",
        data: cartResponse?.data,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Xóa mặt hàng khỏi giỏ hàng thất bại",
    };
  }
};

const getCartItems = async ({ username }) => {
  try {
    let cartItems = await MongoDB.db
      .collection(mongoConfig.collections.CARTS)
      .aggregate([
        {
          $match: {
            username: username,
          },
        },
        {
          $lookup: {
            from: "foods",
            localField: "foodId",
            foreignField: "id",
            as: "food",
          },
        },
        {
          $unwind: {
            path: "$food",
          },
        },
      ])
      .toArray();
    if (cartItems?.length > 0) {
      let itemsTotal = cartItems
        ?.map((cartItem) => cartItem?.food?.price * cartItem?.count)
        ?.reduce((a, b) => parseFloat(a) + parseFloat(b));
      let discount = 0;
      return {
        status: true,
        message: "Các mặt hàng trong giỏ hàng đã được tìm nạp thành công",
        data: {
          cartItems,
          metaData: {
            itemsTotal,
            discount,
            grandTotal: itemsTotal - discount,
          },
        },
      };
    } else {
      return {
        status: false,
        message: "Không tìm thấy mặt hàng trong giỏ hàng",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Không thể tìm nạp các mục trong giỏ hàng",
    };
  }
};

module.exports = { addToCart, removeFromCart, getCartItems };
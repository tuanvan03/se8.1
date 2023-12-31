import {ApiContants} from '../contants';
import axios from 'axios';
import {authHeader} from '../utils/Generator';
import {getToken} from '../Store';

const getRestaurants = async () => {
  console.log(`RestaurantService | getRestaurants`);
  try {
    let resaurantResponse = await axios.get(
      `${ApiContants.BACKEND_API.BASE_URL}${ApiContants.BACKEND_API.RESTAURANT}`,
      {
        headers: authHeader(getToken()),
      },
    );

    if (resaurantResponse?.status === 200) {
      return {
        status: true,
        message: `Đã tìm thấy dữ liệu nhà hàng`,
        data: resaurantResponse?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Không tìm thấy dữ liệu nhà hàng`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message:  `Không tìm thấy dữ liệu nhà hàng`,
    };
  }
};

const getOneRestaurantById = async restaurantId => {
  console.log(`RestaurantsService | getOneRestaurantById`);
  try {
    let restaurantResponse = await axios.get(
      `${ApiContants.BACKEND_API.BASE_URL}${ApiContants.BACKEND_API.RESTAURANT}/${restaurantId}`,
      {
        headers: authHeader(getToken()),
      },
    );
    if (restaurantResponse?.status === 200) {
      return {
        status: true,
        message: `Đã tìm thấy dữ liệu nhà hàng`,
        data: restaurantResponse?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Không tìm thấy dữ liệu nhà hàng`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Không tìm thấy dữ liệu nhà hàng`,
    };
  }
};

export default {getRestaurants, getOneRestaurantById};
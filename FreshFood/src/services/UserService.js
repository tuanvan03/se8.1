import {ApiContants} from '../contants';
import axios from 'axios';
import {authHeader} from '../utils/Generator';
import {getToken} from '../Store';

const getUserData = async () => {
  console.log(`UserService | getUserData`);
  try {
    let userResponse = await axios.get(
      `${ApiContants.BACKEND_API.BASE_URL}${ApiContants.BACKEND_API.USER}/get-user`,
      {
        headers: authHeader(getToken()),
      },
    );

    if (userResponse?.status === 200) {
      return {
        status: true,
        message: `Đã tìm thấy dữ liệu người dùng`,
        data: userResponse?.data,
      };
    } else {
      return {
        status: false,
        message: `Không tìm thấy dữ liệu người dùng`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message
        ? error?.response?.data?.message
        : `Không tìm thấy dữ liệu người dùng`,
    };
  }
};

export default {getUserData};
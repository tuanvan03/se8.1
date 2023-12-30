import axios from "axios";
import { ApiContants } from "../contants";
import {authHeader} from '../utils/Generator';
import {getToken} from '../Store';

const AuthRequest = axios.create({
    baseURL: ApiContants.BACKEND_API.BASE_URL,
  });

const register = async user => {
    if (!user?.username || !user?.email || !user?.password) {
      return {status: false, message: 'Please fill up all fields'};
    }
    try {
      let requestBody = {
        username: user?.username,
        email: user?.email,
        password: user?.password,
      };
      let registerResponse = await AuthRequest.post(
        ApiContants.BACKEND_API.REGISTER,
        requestBody,
      );
      return registerResponse?.data;
    } catch (error) {
      console.log(error);
      return {status: false, message: 'Oops! Something went wrong'};
    }
  };

  const login = async user => {
    if (!user?.username || !user?.password) {
      return {status: false, message: 'Please fill up all fields'};
    }
    try {
      let requestBody = {
        username: user?.username,
        password: user?.password,
      };
      let loginResponse = await AuthRequest.post(
        ApiContants.BACKEND_API.LOGIN,
        requestBody,
      );
      return loginResponse?.data;
    } catch (error) {
      console.log(error);
      return {status: false, message: 'Oops! Something went wrong'};
    }
  };
  
  const checkUserExist = async (type, value) => {
    try {
      let params = {[type]: value};
      let userCheckResponse = await AuthRequest.get(
        ApiContants.BACKEND_API.USER_EXIST,
        {params},
      );
      return userCheckResponse?.data;
    } catch (error) {
      console.log(error);
      return {status: false, message: 'Ầu nâu!!! Săm thing lỗi'};
    }
  };
  const refreshToken = async () => {
    try {
      let tokenResponse = await AuthRequest.post(
        ApiContants.BACKEND_API.REFRESH_TOKEN,
        {headers: authHeader(getToken())},
      );
      if (tokenResponse?.status === 200) {
        return {status: true, data: tokenResponse?.data};
      } else {
        return {status: false};
      }
    } catch (error) {
      console.log(error);
      return {status: false, message: 'Ầu nâu!!! Có lỗi'};
    }
  };
  export default {register, checkUserExist, login, refreshToken};
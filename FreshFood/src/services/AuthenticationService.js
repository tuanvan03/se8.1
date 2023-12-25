import axios from "axios";
import { ApiContants } from "../contants";

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

  export default {register};
import axios from "axios";
import { ErrorType } from "../../type/ErrorType";
import { OauthType } from "../../type/OauthType";

export const AuthService = async (username: string, password: string) => {
    const host = import.meta.env.VITE_HOST_TASK_MANAGER;

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password); 

    return await axios({
        method: 'post',
        url: `${host}/api/auth/`,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data' // Esto asegura que se envíe como form-data
            }
    })
    .then(function (response) {
        return response.data as OauthType;
    })
    .catch((error) => {
        if(axios.isAxiosError(error)){
            throw {message: error.response?.data.toString(), status: error.response?.status.toString()} as ErrorType;
        }else{
            throw {message: "500", status: "Internal server error"}  as ErrorType;
        }
    })
}
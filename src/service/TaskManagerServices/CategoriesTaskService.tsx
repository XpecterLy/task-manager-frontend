import axios from "axios";
import { CategorieTaskType } from "../../type/CategoriesTaskType";
import { ErrorType } from "../../type/ErrorType";

const host = import.meta.env.VITE_HOST_TASK_MANAGER;

export const GetAllCategorieTask = async () => {
    const access_token = sessionStorage.getItem("access_token")
    return await axios({
        method: "get",
        url: `${host}/api/categories/task/all`,
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }).then((response) => {
        return response.data.categoriesTasks as CategorieTaskType[];
    }).catch((error) => {
        if(axios.isAxiosError(error)){
            throw {message: error.response?.data.toString(), status: error.response?.status.toString()} as ErrorType;
        }else{
            throw {message: "500", status: "Internal server error"}  as ErrorType;
        }
    })
}

export const GetCategorieTask = async (id: string) => {
    const access_token = sessionStorage.getItem("access_token")
    return await axios({
        method: "get",
        url: `${host}/api/categories/task?id=${id}`,
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }).then((response) => {
        return response.data as CategorieTaskType;
    }).catch((error) => {
        if(axios.isAxiosError(error)){
            throw {message: error.response?.data.toString(), status: error.response?.status.toString()} as ErrorType;
        }else{
            throw {message: "500", status: "Internal server error"}  as ErrorType;
        }
    })
}
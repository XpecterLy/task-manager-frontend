import axios from "axios";
import { CategoriesTaskListType } from "../../type/CategoriesTaskLisrtType";
import { ErrorType } from "../../type/ErrorType";

const host = import.meta.env.VITE_HOST_TASK_MANAGER;

export const GetAllCategorieTaskList = async () => {
    const access_token = sessionStorage.getItem("access_token")
    return await axios({
        method: "get",
        url: `${host}/api/categories/tasklist/all`,
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }).then((response) => {
        return response.data.taskList as CategoriesTaskListType[];
    }).catch((error) => {
        if(axios.isAxiosError(error)){
            throw {message: error.response?.data.toString(), status: error.response?.status.toString()} as ErrorType;
        }else{
            throw {message: "500", status: "Internal server error"}  as ErrorType;
        }
    })
}
import axios from "axios";
import { TaskType } from "../../type/TaskType";
import { ErrorType } from "../../type/ErrorType";

const host = import.meta.env.VITE_HOST_TASK_MANAGER;

export const GetTask = async (id: string) => {
    const access_token = sessionStorage.getItem("access_token")
    return await axios({
        method: "get",
        url: `${host}/api/task?id=${id}`,
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }).then((response) => {
        return response.data as TaskType;
    }).catch((error) => {
        if(axios.isAxiosError(error)){
            throw {message: error.response?.data.toString(), status: error.response?.status.toString()} as ErrorType;
        }else{
            throw {message: "500", status: "Internal server error"}  as ErrorType;
        }
    })
}

export const CreateTask = async (data: TaskType) => {
    const access_token = sessionStorage.getItem("access_token")
    return await axios({
        method: "post",
        url: `${host}/api/task`,
        headers: {
            Authorization: `Bearer ${access_token}`
        },
        data: data
    }).then((response) => {
        return response.data as TaskType;
    }).catch((error) => {
        if(axios.isAxiosError(error)){
            throw {message: error.response?.data.toString(), status: error.response?.status.toString()} as ErrorType;
        }else{
            throw {message: "500", status: "Internal server error"}  as ErrorType;
        }
    })
}

export const UpdateTask = async (data: TaskType) => {
    const access_token = sessionStorage.getItem("access_token")
    return await axios({
        method: "put",
        url: `${host}/api/task?id=${data.id}`,
        headers: {
            Authorization: `Bearer ${access_token}`
        },
        data: data
    }).then((response) => {
        return response.data as TaskType;
    }).catch((error) => {
        if(axios.isAxiosError(error)){
            throw {message: error.response?.data.toString(), status: error.response?.status.toString()} as ErrorType;
        }else{
            throw {message: "500", status: "Internal server error"}  as ErrorType;
        }
    })
}

export const DeleteTask = async (id: string) => {
    const access_token = sessionStorage.getItem("access_token")
    return await axios({
        method: "delete",
        url: `${host}/api/task?id=${id}`,
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }).then((response) => {
        return response.data as TaskType;
    }).catch((error) => {
        if(axios.isAxiosError(error)){
            throw {message: error.response?.data.toString(), status: error.response?.status.toString()} as ErrorType;
        }else{
            throw {message: "500", status: "Internal server error"}  as ErrorType;
        }
    })
}
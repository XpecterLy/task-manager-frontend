import axios from "axios"
import { ErrorType } from "../../type/ErrorType";
import { TaskListType, TasksListsCreateType, TasksListsType } from "../../type/TaskListType";

const host = import.meta.env.VITE_HOST_TASK_MANAGER;

export const GetAllTaskListService = async () => {
    const access_token = sessionStorage.getItem("access_token")
    return await axios({
        method: "get",
        url: `${host}/api/tasklist/all`,
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }).then((response) => {
        return response.data.task_lists as TasksListsType[];
    }).catch((error) => {
        if(axios.isAxiosError(error)){
            throw {message: error.response?.data.toString(), status: error.response?.status.toString()} as ErrorType;
        }else{
            throw {message: "500", status: "Internal server error"}  as ErrorType;
        }
    })
}

export const GetTaskListService = async (id: string) => {
    const access_token = sessionStorage.getItem("access_token")
    return await axios({
        method: "get",
        url: `${host}/api/tasklist/task?id=${id}`,
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }).then((response) => {
        return response.data as TaskListType;
    }).catch((error) => {
        if(axios.isAxiosError(error)){
            throw {message: error.response?.data.toString(), status: error.response?.status.toString()} as ErrorType;
        }else{
            throw {message: "500", status: "Internal server error"}  as ErrorType;
        }
    })
}

export const DeleteTaskListService = async (id: string) => {
    const access_token = sessionStorage.getItem("access_token")
    return await axios({
        method: "delete",
        url: `${host}/api/tasklist?id=${id}`,
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }).then((response) => {
        return response.data as TaskListType;
    }).catch((error) => {
        if(axios.isAxiosError(error)){
            throw {message: error.response?.data.toString(), status: error.response?.status.toString()} as ErrorType;
        }else{
            throw {message: "500", status: "Internal server error"}  as ErrorType;
        }
    })
}

export const AddTaskListService = async (data: TasksListsCreateType) => {
    const access_token = sessionStorage.getItem("access_token")
    return await axios({
        method: "post",
        url: `${host}/api/tasklist/`,
        headers: {
            Authorization: `Bearer ${access_token}`
        },
        data: data
    }).then((response) => {
        return response.data as TaskListType;
    }).catch((error) => {
        if(axios.isAxiosError(error)){
            throw {message: error.response?.data.toString(), status: error.response?.status.toString()} as ErrorType;
        }else{
            throw {message: "500", status: "Internal server error"}  as ErrorType;
        }
    })
}

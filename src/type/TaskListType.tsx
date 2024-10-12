import { TaskType } from "./TaskType"

export type TasksListsType = {
    id: string,
    name: string,
    daysActive: [string],
    isRecurrent: boolean,
    lastActive: string,
    user_id: string,
    details: string,
    taskListCategory_id: string,
    state: string,
    task: TaskType[]
}

export type TasksListsCreateType = {
    name: string,
    daysActive: string[],
    isRecurrent: boolean,
    details: string,
    taskListCategory_id: string,
}

export type TaskListType = {
    id: string,
    tasks: TaskType[]
}
import { useSearchParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Form from "react-bootstrap/esm/Form";

import { useEffect, useState } from "react";
import { NavBarComponet } from "../../components/NavBar";
import { GetTaskListService } from "../../service/TaskManagerServices/TaskListServices";
import { TaskListType } from "../../type/TaskListType";
import { ButtonCustom, ButtonFloat } from "../../components/Button";
import { GetAllCategorieTask, GetCategorieTask } from "../../service/TaskManagerServices/CategoriesTaskService";
import { ModalComponent } from "../../components/Modal";
import { CategorieTaskType } from "../../type/CategoriesTaskType";
import { TaskType } from "../../type/TaskType";
import { CreateTask, DeleteTask, GetTask, UpdateTask } from "../../service/TaskManagerServices/TaskServices";
import { ErrorType } from "../../type/ErrorType";

export function Task(){
    const [searchParams] = useSearchParams();
    const [taskList, setTaskList] = useState<TaskListType>();
    const [categoriesTask, setCategoriestask] = useState<CategorieTaskType[]>();
    const [showModalError, setShowModalError] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [showModalEdit, setShowModalEdit] = useState(false);

    const taskInitialValues = {
        categorieTask_id: "",
        details: "",
        id: "",
        name: "",
        taskList_id: "",
        user_id: ""
    }as TaskType;
    const [task, setTask] = useState<TaskType>(taskInitialValues);

    // Id task list
    const idTaskList = searchParams.get('id');

    const GetTaskListById = async () => {
        const taskListData = await GetTaskListService(idTaskList || "");
        // Change value to CategorieId to CategorieName
        const updatedTasks = await Promise.all(
            taskListData.tasks.map(async (item) => {
                const categorieTask = await GetCategorieTask(item.categorieTask_id);
                item.categorieTask_id = categorieTask.name;
                return item;
            })
        );
        taskListData.tasks = updatedTasks;
        setTaskList(taskListData);
    };

    // Get task list data by database
    useEffect(() => {
        GetTaskListById();
    }, []);

    // Show or hiden Edit modal
    const HandleModalEditShowChange = (showVal: boolean) => {
        setShowModalEdit(!showVal);
        if(!showModalEdit){setTask(taskInitialValues)};
    };

    // Show or hiden Error modal
    const HandleModalErrorShowChange = (showVal: boolean) => {
        setShowModalError(!showVal);
    };

    // Show or hiden Add modal
    const HandleModalAddShowChange = async (showVal: boolean) => {
        if(showVal != true){
            const categories = await GetAllCategorieTask();
            setTask({ ...task, taskList_id: idTaskList|| "",  categorieTask_id: categories ? categories[0].id : "" })
            setCategoriestask(categories);
        }
        if(showVal){setTask(
            taskInitialValues) 
        };
        setShowModalAdd(!showVal);
    };

    // Update taskCategoriesId for user select
    const HandleSelectCategoriesTaskChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = e.target.selectedIndex; 
        const selectedOptionId = e.target.options[selectedIndex].id; 
        setTask({ ...task, categorieTask_id: selectedOptionId })
    };
    
    // Edit task 
    const HandleShoeModalEditTask = async (id: string) => {
        setTask(await GetTask(id));
        setCategoriestask(await GetAllCategorieTask());
        setShowModalEdit(true);

    };

    const HandleEditTaskValues = async () => {
        try { 
            await UpdateTask(task);
            GetTaskListById();
            HandleModalEditShowChange(showModalEdit);
        } catch (error) {
            setShowModalEdit(false)
            setShowModalError(true)
            if(error && typeof error === 'object'){
                const objetError = error as ErrorType;
                setErrorText(objetError.message);
            }else{
                setErrorText("Unexpected error");
            }
        }
    }
 
    // Delete task
    const HandleDeleteTask = async (id: string) => {
        try {
            await DeleteTask(id);
            GetTaskListById();
        } catch (error) {
            setShowModalEdit(false)
            setShowModalError(true)
            if(error && typeof error === 'object'){
                const objetError = error as ErrorType;
                setErrorText(objetError.message);
            }else{
                setErrorText("Unexpected error");
            }
        }
    };

    const HandleAddTask = async () => {
        try {
            await CreateTask(task);
            HandleModalAddShowChange(showModalAdd);
            await GetTaskListById();
            
        } catch (error) {
            setShowModalEdit(false)
            setShowModalError(true)
            if(error && typeof error === 'object'){
                const objetError = error as ErrorType;
                setErrorText(objetError.message);
            }else{
                setErrorText("Unexpected error");
            }
        }
    }

    return(
        <>
            <NavBarComponet></NavBarComponet>
                <Container>
                    <ButtonFloat style="primary" onSelect={() => HandleModalAddShowChange(showModalAdd)}></ButtonFloat>
                    <Row>
                        <Form.Group className="mb-4">
                            <h4>Lista De Tareas</h4>
                        </Form.Group>
                    </Row>
                    <Row>
                        {taskList ? 
                        (
                            <>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Detalle</th>
                                        <th>Categoria</th>
                                        <th>Editar</th>
                                        <th>Eliminar</th>
                                    </tr>
                                    </thead>
                                <tbody>
                                    {
                                        taskList.tasks.map((item) => {
                                            return(
                                                <>
                                                    <tr key={item.id}>
                                                        <td>{item.name}</td>
                                                        <td>{item.details}</td>
                                                        <td>{item.categorieTask_id}</td>
                                                        <td>
                                                            <ButtonCustom  
                                                                isLoading={false} 
                                                                onSelect={() => HandleShoeModalEditTask(item.id)} 
                                                                children={<i className="bi bi-pen"></i>}>
                                                            </ButtonCustom>
                                                            
                                                        </td>
                                                        <td>
                                                            <ButtonCustom  
                                                                variant="danger"
                                                                isLoading={false} 
                                                                onSelect={() => HandleDeleteTask(item.id)} 
                                                                children={<i className="bi bi-trash"></i>}>
                                                            </ButtonCustom>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                            </>
                        ): "No hay tareas en la lista."}
                    </Row>
                    
                    {/* Modal edit task value */}
                    <ModalComponent 
                        onShowModalChange={() => HandleModalEditShowChange(showModalEdit)} 
                        showVal={showModalEdit} 
                        title="Editar Tarea"
                        onSelect={HandleEditTaskValues}
                    >
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Nombre de tarea" value={task.name} onChange={(e) => setTask({ ...task, name: e.target.value })}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="details"> 
                                <Form.Label>Detalles</Form.Label>
                                <Form.Control type="text" placeholder="Detalles de la tarea" value={task.details} onChange={(e) => setTask({ ...task, details: e.target.value })}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Select onChange={(e) => HandleSelectCategoriesTaskChange(e)} value={task.categorieTask_id}> 
                                    {categoriesTask && categoriesTask.map((item) => {
                                        return (
                                            <option 
                                                id={item.id} 
                                                value={item.id} 
                                                key={item.id} 
                                            >
                                                {item.name}
                                            </option>
                                        )
                                    })}
                            </Form.Select>
                        </Form.Group>
                    </ModalComponent>

                    {/* Modal error */}
                    <ModalComponent 
                        onSelect={() => HandleModalErrorShowChange(showModalError)}
                        onShowModalChange={() => HandleModalErrorShowChange(showModalError)}
                        showVal={showModalError}
                        title="Error"
                    >
                        {errorText}
                    </ModalComponent>

                    {/* Modal agregar */}
                    <ModalComponent 
                        onSelect={() => HandleAddTask()}
                        onShowModalChange={() => HandleModalAddShowChange(showModalAdd)}
                        showVal={showModalAdd}
                        title="Agregar Tarea"
                    >
                         <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="Nombre de tarea" value={task.name} onChange={(e) => setTask({ ...task, name: e.target.value })}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="details"> 
                            <Form.Label>Detalles</Form.Label>
                            <Form.Control type="text" placeholder="Detalles de la tarea" value={task.details} onChange={(e) => setTask({ ...task, details: e.target.value })}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Select onChange={(e) => HandleSelectCategoriesTaskChange(e)}> 
                                {categoriesTask && categoriesTask.map((item) => {
                                    return (
                                        <option 
                                            id={item.id} 
                                            value={item.id} 
                                            key={item.id} 
                                        >
                                            {item.name}
                                        </option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>
                    </ModalComponent>
                </Container>
        </>
    )
}

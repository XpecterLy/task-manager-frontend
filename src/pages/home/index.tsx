import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { NavBarComponet } from "../../components/NavBar";
import { AddTaskListService, DeleteTaskListService, GetAllTaskListService } from "../../service/TaskManagerServices/TaskListServices";
import { CardComponent } from "../../components/Card";
import { TasksListsCreateType, TasksListsType } from "../../type/TaskListType";
import { ListComponent } from "../../components/List";
import { ButtonCustom, ButtonFloat } from "../../components/Button";
import Form from 'react-bootstrap/Form';
import { Col, Container, FormLabel, Row } from "react-bootstrap";
import { ModalComponent } from "../../components/Modal";
import { ErrorType } from "../../type/ErrorType";
import { GetAllCategorieTaskList } from "../../service/TaskManagerServices/CategoriesTaskListService";
import { CategoriesTaskListType } from "../../type/CategoriesTaskLisrtType";
// import { ButtonCustom } from "../../components/Button";

export function Home(){
    const navigate = useNavigate();
    const [tasks, setTask] = useState<TasksListsType[]>();
    const [categoriesTask, setCategoriestask] = useState<CategoriesTaskListType[]>();
    const taskListEmty = {
        name: "",
        details: "",
        isRecurrent: false,
        taskListCategory_id: "",
        daysActive: []
    } as TasksListsCreateType;
    const [taskList, setTaskLIst] = useState<TasksListsCreateType>(taskListEmty);
    const [showModalError, setShowModalError] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [errorText, setErrorText] = useState("");

    // Get all task list
    const GetAllTasks = async () => {
        setTask(await GetAllTaskListService())
    }

    // Get all task list by user
    useEffect(() => {
        GetAllTasks();
    }, [])

    // Show or hiden Error modal
    const HandleModalErrorShowChange = (showVal: boolean) => {
        setShowModalError(!showVal);
    };  
      // Show or hiden Add modal
    const HandleModalAddShowChange = async (showVal: boolean) => {
        if(!showVal){
            const categories = await GetAllCategorieTaskList();
            setCategoriestask(categories);
            setTaskLIst({...taskList, taskListCategory_id: categories ? categories[0].id : ""})
        }else{
            setTaskLIst(taskListEmty);
        }
        setShowModalAdd(!showVal);
    };

    // Edit task list
    const HandleEditTaskList = (id: string) => {
        navigate(`/task?id=${id}`);
    }

    // Delete task List
    const HandleDeleteTaskList = async (id: string) => {
        try {
            await DeleteTaskListService(id)
            await GetAllTasks();
        } catch (error) {
            setShowModalError(true);
            if(error && typeof error === 'object'){
                const objetError = error as ErrorType;
                setErrorText(objetError.message)
            }else{
                setErrorText("Unexpected error");
            }
        }
    }

    // Update taskCategoriesId for user select
    const HandleSelectCategoriesTaskListChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = e.target.selectedIndex; 
        const selectedOptionId = e.target.options[selectedIndex].id; 
        setTaskLIst({ ...taskList, taskListCategory_id: selectedOptionId })
    };
    
    // Add day to dayList
    const HandleAddDayToTaskList = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id;
        if(taskList.daysActive.includes(id)){
            setTaskLIst((prevTaskList) => ({
                ...prevTaskList,
                daysActive: prevTaskList.daysActive.filter(day => day !== id)
            }));
        }else{
            setTaskLIst({...taskList, daysActive: [...taskList.daysActive, id]})
        }
    }

    // Create task list
    const HandleAddTaskList = async () => {
        try {
            await AddTaskListService(taskList);
            await GetAllTasks();
            await HandleModalAddShowChange(showModalAdd);
        } catch (error) {
            setShowModalAdd(false)
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
                <div className="container">
                    <div className="row" key="1">
                        {tasks ? tasks.map((item) => {
                            const taskNames = item.task.map(taskItem => taskItem.name);
                            
                            return (
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
                                        <CardComponent title={item.name} id={item.id}>
                                            <Form.Group className="mb-3" controlId="">
                                                {item.details}
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="">
                                                <ListComponent data={taskNames}></ListComponent>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="">
                                                <Row>
                                                <Col>
                                                    <ButtonCustom isLoading={false} text="Editar" onSelect={() => HandleEditTaskList(item.id)} variant="outline-primary"></ButtonCustom>
                                                </Col>
                                                <Col>
                                                    <ButtonCustom  
                                                        variant="danger"
                                                        isLoading={false} 
                                                        onSelect={() => HandleDeleteTaskList(item.id)} 
                                                        children={<i className="bi bi-trash"></i>}>
                                                    </ButtonCustom>
                                                </Col>
                                                </Row>
                                            </Form.Group>
                                        </CardComponent>
                                    </div>
                            )
                        }) : "No hay lista de tareas."}
                    </div>
                </div>

                <ButtonFloat style="primary" onSelect={() => HandleModalAddShowChange(showModalAdd)}></ButtonFloat>
            </Container>

            {/* Modal Add task list*/}
            <ModalComponent 
                onSelect={() => HandleAddTaskList()}
                onShowModalChange={() => HandleModalAddShowChange(showModalAdd)}
                showVal={showModalAdd}
                title="Agregar Task List"
            >
                <Container>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" placeholder="Nombre de la lista de tareas" onChange={(e) => setTaskLIst({ ...taskList, name: e.target.value })}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Detalles</Form.Label>
                        <Form.Control type="text" placeholder="Detalles de la lista de tareas" onChange={(e) => setTaskLIst({ ...taskList, details: e.target.value })}/>
                    </Form.Group>   
                    <Form.Group className="mb-3">
                        <Form.Label>Recurrencia</Form.Label>
                        <Form.Check 
                            type="checkbox"
                            id="1"
                            label="Tarea recurrente"
                            onChange={(e) => {setTaskLIst({...taskList, isRecurrent: e.target.checked})}}
                        />
                        {/* Items */}
                        <Form.Group className="mb-3">
                            <Row>
                                <FormLabel>Dias:</FormLabel>
                                <Col>
                                    <Form.Check
                                        type="checkbox"
                                        id="Sunday"
                                        label="Domingo" 
                                        onChange={HandleAddDayToTaskList}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check 
                                        type="checkbox"
                                        id="Monday"
                                        label="Lunes" 
                                        onChange={HandleAddDayToTaskList}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check 
                                        type="checkbox"
                                        id="Tuesday"
                                        label="Martes" 
                                        onChange={HandleAddDayToTaskList}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check 
                                        type="checkbox"
                                        id="Wednesday"
                                        label="Miercoles" 
                                        onChange={HandleAddDayToTaskList}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check 
                                        type="checkbox"
                                        id="Thursday"
                                        label="Jueves" 
                                        onChange={HandleAddDayToTaskList}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check 
                                        type="checkbox"
                                        id="Friday"
                                        label="Viernes" 
                                        onChange={HandleAddDayToTaskList}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check 
                                        type="checkbox"
                                        id="Saturday"
                                        label="Sabado" 
                                        onChange={HandleAddDayToTaskList}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>

                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Categoria</Form.Label>
                            <Form.Select aria-label="" onChange={(e) => HandleSelectCategoriesTaskListChange(e)} >
                                {categoriesTask ? categoriesTask.map((item) => {
                                    return (
                                        <option key={item.id} id={item.id}>{item.name}</option>
                                    )
                                }) : (<></>)}
                            </Form.Select>
                    </Form.Group>
                </Container>
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
        </>
    )
}
import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

import { ButtonSubmitCustom } from '../../components/Button';
import { useState, useEffect  } from 'react';
import { AuthService } from '../../service/TaskManagerServices/OauthService';
import { ErrorType } from '../../type/ErrorType';
import { ModalComponent } from '../../components/Modal'

export function Login(){
    // Load
    const [isLoading, setIsLoading] = useState(false);
    // Modal config
    const [showModal, setShowModal] = useState(false);
    // Inputs
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    // Error inputs
    const [erroUsername, setErroUsername] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    // Error api
    const [errorType, setErrorType] = useState<ErrorType>({status: "", message: ""})

    const navigate = useNavigate();

    // Manager error message to usernameInput
    useEffect(() => {
        if (usernameInput && usernameInput.length < 4 || usernameInput.length > 20) {
            setErroUsername("El nombre de usuario debe tener entre 4 y 20 caracteres");
        } else {
            setErroUsername("");
        }
    }, [usernameInput])

    // Manager error message to passoword
    useEffect(() => {
        if (passwordInput && passwordInput.length < 4 || passwordInput.length > 20) {
            setErrorPassword("La contraseña debe tener entre 4 y 20 caracteres");
        } else {
            setErrorPassword("");
        }
    }, [passwordInput])

    // Login
    const handleLogIn = async () => {
        setIsLoading(true)
        try {
            const res = await AuthService(usernameInput, passwordInput);
            
            sessionStorage.setItem('access_token', res.access_token)
            sessionStorage.setItem('refresh_token', res.refresh_token)
            navigate('/home');
        } catch (error) {
            setShowModal(true)
            setIsLoading(false)
            if(error && typeof error === 'object'){
                setErrorType(error as ErrorType);
            }else{
                setErrorType({status: "500", message: "Unexpected error"} as ErrorType);
            }
        }
    }

    const handleModalShowChange = (showVal: boolean) => {
        setShowModal(showVal)
    }

    return(
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Card style={{ width: '32rem' }}  >
                    <Card.Body>
                        <Card.Title>Inicio de sesion</Card.Title>
                        <Card.Text>
                            Para iniciar sesion por favor agregue su usuario y su contraseña.
                        </Card.Text>

                       <Form>
                        <Form.Group  className="mb-3" controlId="group-username">
                            <Form.Control
                                required
                                type="text"
                                placeholder='usuario'
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsernameInput(e.target.value)}
                            />
                            <Form.Label className='text-danger'>{erroUsername}</Form.Label>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="group-password">
                                <Form.Control
                                    required
                                    type="password"
                                    aria-describedby="passwordHelpBlock"
                                    placeholder='contraseña'
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordInput(e.target.value)}
                                />
                                {/* <Form.Control.Feedback type="invalid">
                                    Please choose a username.
                                </Form.Control.Feedback> */}
                                <Form.Label className='text-danger'>{errorPassword}</Form.Label>
                            </Form.Group>

                            <ButtonSubmitCustom 
                                isLoading={isLoading}
                                text='Iniciar sesion'
                                variant='primary'
                                onSelect={handleLogIn}
                            >
                            </ButtonSubmitCustom>
                       </Form>

                    </Card.Body>
                </Card>
            </div>

            {showModal && <ModalComponent onShowModalChange={handleModalShowChange} onSelect={() => handleModalShowChange} showVal={showModal} title='Error'>{errorType.message}</ModalComponent>}
        </>
    )
}
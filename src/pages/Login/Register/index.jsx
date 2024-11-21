import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { requestHook } from '../../../hooks/request.hook';
import styled from './styles.module.sass'

export default function Register(props){
    const [fullname, setFullname] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [birth, setBirth] = useState("")
    const { handleRequest } = requestHook()

    async function handleSave(){
        const user = { fullname, password, email, birth }
        console.log(user)
        const response = await handleRequest('/user/register', 'POST', user);
        console.log(response)
        props.hideModal();
    }

    return (
        <Modal show={props.open} onHide={props.hideModal}>
            <Modal.Header closeButton>
                <Modal.Title className={styled.formTitle}>Registre-se</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Nome completo</Form.Label>
                    <Form.Control className={styled.input} value={fullname} type="text" placeholder="Insira aqui" onChange={(e) => setFullname(e.target.value)}/>
                </Form>
                <Form>
                    <Form.Label>Senha</Form.Label>
                    <Form.Control className={styled.input} value={password} type="password" placeholder="Insira aqui" onChange={(e) => setPassword(e.target.value)}/>
                </Form>
                <Form>
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control className={styled.input} value={email} type="email" placeholder="nome@gmail.com" onChange={(e) => setEmail(e.target.value)}/>
                </Form>
                <Form>
                    <Form.Label>Data de nascimento</Form.Label>
                    <Form.Control className={styled.input} value={birth} type="text" placeholder="10/10/1010" onChange={(e) => setBirth(e.target.value)}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.hideModal}>
                    Close
                </Button>
                <Button variant="primary" type='submit' onClick={() => handleSave()}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
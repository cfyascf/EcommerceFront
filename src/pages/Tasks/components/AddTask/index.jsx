import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { requestHook } from '../../../../hooks/request.hook';
import { useParams } from 'react-router-dom';

export default function AddTask(props){
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [idChecked, setIdChecked] = useState()
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("")
    const { groupId } = useParams()
    const { handleRequest } = requestHook()

    useEffect(() => {
        handleGetUsers()
    }, [props.open])

    async function handleGetUsers(){
        try {
            const response = await handleRequest(`/user/getAll`, 'GET');
            setUsers(response.data.users);
        } catch (error) {
            console.log(error)
        }
    }

    async function handleSave(e){
        e.preventDefault()

        const task = { title, desc, user_name: selectedUser, group_id: groupId }
        console.log(task, "AAAAAAAAAAAAAAAA")
        await handleRequest('/task/create', 'POST', task)

        props.hideModal()
        window.location.reload()
    }

    return (
        <Modal show={props.open} onHide={props.hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Add Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Task name</Form.Label>
                        <Form.Control value={title} type="text" placeholder="Name" onChange={(e) => setTitle(e.target.value)} maxLength={50}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control value={desc} type="text" placeholder="Description" onChange={(e) => setDesc(e.target.value)} maxLength={100}/>
                    </Form.Group>
                    <Form.Label>Users</Form.Label>
                    <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
                        {users.map(user => (
                            <Form.Check
                                key={user.id}
                                type="radio"
                                name={'user'}
                                label={user.fullname}
                                onClick={() => {
                                        setSelectedUser(user.fullname);
                                    }
                                }
                            
                            />
                        ))}
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.hideModal}>
                    Close
                </Button>
                <Button variant="primary" type='submit' onClick={(e) => handleSave(e)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
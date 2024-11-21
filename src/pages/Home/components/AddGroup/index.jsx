import { useContext, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { requestHook } from '../../../../hooks/request.hook';
import { UserContext } from '../../../../contexts/user.context';

export default function AddGroup(props){
    const [name, setName] = useState("");
    const { id } = useContext(UserContext);
    const { handleRequest } = requestHook();
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

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

    function handleUserSelection(userId) {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    }

    async function handleSave(){
        const group = { name: name, admin_id: id }
        const response = await handleRequest('/group/create', 'POST', group);
        selectedUsers.map(async (user) => {
            let invite = { "user_id": user, "group_id": response.data.group.group_id, "curr_user_id": id };
            const response2 = await handleRequest('/group/invite', 'POST', invite);
        });

        props.hideModal();
        window.location.reload()
    }

    return (
        <Modal show={props.open} onHide={props.hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Add Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Group name</Form.Label>
                    <Form.Control value={name} type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
                    <Form.Label>Users</Form.Label>
                    <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
                        {users.map(user => (
                            <Form.Check
                                key={user.id}
                                type="checkbox"
                                label={user.fullname}
                                checked={selectedUsers.includes(user.id)}
                                onChange={() => handleUserSelection(user.id)}
                            />
                        ))}
                    </div>
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
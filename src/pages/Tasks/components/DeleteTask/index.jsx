import { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { requestHook } from '../../../../hooks/request.hook';

import { Error } from '../../../../components/Error';
import { UserContext } from '../../../../contexts/user.context';

export default function DeleteTask(props){
    const { handleRequest } = requestHook()
    const [error, setError] = useState(false)
    const { id } = useContext(UserContext)

    async function handleDelete(){
        try{
            await handleRequest('/task/delete', 'POST', { task_id: props.id, user_id: id });
            setError(false)
            props.hideModal();
            window.location.reload()

        } catch(err) {
            setError(true)
        }
    }

    return (
        <Modal show={props.open} onHide={props.hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Do you want to delete this task?
                <Error hasError={error} message={"Only the group admin has permission to delete tasks."}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.hideModal}>
                    Close
                </Button>
                <Button variant="primary" type='submit' onClick={() => handleDelete()}>
                    Delete task
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
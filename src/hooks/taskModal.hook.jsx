import { useState } from "react";

export const taskModalHook = () => {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [currTask, setCurrTask] = useState(0)

    const handleAddOpen = () => setIsAddOpen(true);
    const handleAddClose = () => setIsAddOpen(false);
    const handleDeleteOpen = (currId) => {
        setIsDeleteOpen(true);
        setCurrTask(currId);
    }
    const handleDeleteClose = () => setIsDeleteOpen(false);

    const handleUpdateOpen = (currId) => {
        setIsUpdateOpen(true);
        setCurrTask(currId);
    }
    const handleUpdateClose = () => setIsUpdateOpen(false);

    return { isAddOpen, handleAddOpen, handleAddClose, 
        isDeleteOpen, handleDeleteOpen, handleDeleteClose,
        isUpdateOpen, handleUpdateOpen, handleUpdateClose,
        currTask
    }
}
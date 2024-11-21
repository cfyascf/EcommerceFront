import { useEffect, useState } from "react"
import { Navbar } from "../../components/Navbar"
import { groupsHook } from "../../hooks/groups.hook"
import { Task } from "./components/Task"
import styled from './styles.module.sass'
import { requestHook } from "../../hooks/request.hook"
import { useParams } from "react-router-dom"
import AddTask from "./components/AddTask"
import DeleteTask from "./components/DeleteTask"
import { taskModalHook } from "../../hooks/taskModal.hook"
import UpdateTask from "./components/UpdateTask"
import { Page } from "../../components/Page"
import { filterHook } from "../../hooks/filter.hook"
import { Filter } from "./components/Filter"
import { Options } from "../../components/Options"
import { Grid } from "../../components/Grid"
import { NoData } from "../../components/NoData"


export const Tasks = () => {
    const { tasks, fillTasks } = groupsHook()
    const { isAddOpen, handleAddOpen, handleAddClose,
        isDeleteOpen, handleDeleteOpen, handleDeleteClose,
        isUpdateOpen, handleUpdateOpen, handleUpdateClose,
        currTask
    } = taskModalHook()
    const { filterType, setFilterType, filterShowing, setFilterShowing } = filterHook()
    const { groupId } = useParams()
    const { handleRequest } = requestHook()
    const [hasTasks, setHasTasks] = useState(false)

    useEffect(() => {
        handleHasTasks()
        updateTasks()
    }, [filterType, tasks.length])

    const handleHasTasks = () => {
        if(tasks.length == 0)
            setHasTasks(false)
        else
            setHasTasks(true)
    }

    const updateTasks = async () => {
        const response = await handleRequest(`/task/group?id=${groupId}&filter=${filterType}`, 'GET')
        fillTasks(response.data.group_tasks)
    }

    return <>
        <Navbar />
        <Page>
            <Grid>
                <NoData isShowing={hasTasks}/>
                {
                    tasks.map(t => {
                        return (
                            <Task
                                key={t.task.task_id}
                                title={t.task.title}
                                responsible={t.user.fullname}
                                description={t.task.desc}
                                checkedButton={t.task.status_id}
                                deleteModal={handleDeleteOpen}
                                updateModal={handleUpdateOpen}
                                id={t.task.task_id}
                            />
                        )
                    })
                }
            </Grid>
            <Options>
                <button className={styled.addBtn} onClick={handleAddOpen}>
                    <span class="material-symbols-outlined">add</span>
                </button>
                <Filter filterShowing={filterShowing} setFilterShowing={setFilterShowing} setFilterType={setFilterType}/>
            </Options>
        </Page>
        <AddTask open={isAddOpen} hideModal={handleAddClose}/>
        <DeleteTask open={isDeleteOpen} hideModal={handleDeleteClose} id={currTask}/>
        <UpdateTask open={isUpdateOpen} hideModal={handleUpdateClose} id={currTask}/>
    </>
}
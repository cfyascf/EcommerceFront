import { useState } from "react"

export const groupsHook = () => {
    const [groups, setGroups] = useState([])
    const [tasks, setTasks] = useState([])

    const fillGroups = (groups) => {
        setGroups(groups)
    }

    const fillTasks = (tasks) => {
        setTasks(tasks)
    }

    return { groups, fillGroups, tasks, fillTasks }
}
import { Navbar } from "../../components/Navbar"
import { requestHook } from "../../hooks/request.hook"
import { useContext, useEffect, useState } from "react"
import styled from './styles.module.sass'
import { groupsHook } from "../../hooks/groups.hook"
import { GroupContext } from "../../contexts/group.context"
import { useNavigate } from "react-router-dom"
import AddGroup from "./components/AddGroup"
import { UserContext } from "../../contexts/user.context"
import { groupModalHook } from "../../hooks/groupModal.hook"
import { Page } from "../../components/Page"
import { Grid } from "../../components/Grid"
import { Options } from "../../components/Options"
import { NoData } from "../../components/NoData"

export const Home = () => {
    const { handleRequest } = requestHook()
    const { groups, fillGroups } = groupsHook()
    const { isOpen, handleOpen, handleClose } = groupModalHook()
    const { id } = useContext(UserContext)
    const { setGroupId, setGroupName } = useContext(GroupContext)
    const [hasGroups, setHasGroups] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        handleHasGroups()
        updateGroups(id)
        console.log(id)
        console.log(hasGroups)
        console.log(groups.length)
    }, [id, groups.length])

    const updateGroups = async (id) => {
        const response = await handleRequest(`/group/get/user?id=${id}`, 'GET')
        fillGroups(response.data.user_groups)
    }

    const handleClick = (groupId, groupName) => (e) => {
        setGroupId(groupId)
        setGroupName(groupName)
        navigate(`/group/${groupId}`)
    }

    const handleHasGroups = () => {
        if(groups.length == 0)
            setHasGroups(false)
        else
            setHasGroups(true)
    }

    return <>
        <Navbar />
        <Page>
            <Grid>
                <NoData isShowing={hasGroups}/>
                {
                    groups.map(g => {
                        return (
                            <div key={g.group.group_id} className={styled.group} onClick={handleClick(g.group.group_id, g.group.name)}>
                                <p className={styled.title}>{g.group.name}</p>
                                <p className={styled.responsible}>De {g.user.fullname}</p>
                            </div>
                        )
                    })
                }
            </Grid>
            <Options>
                <button className={styled.addBtn} onClick={handleOpen}>
                    <span class="material-symbols-outlined">add</span>
                </button>
            </Options>
        </Page>
        <AddGroup open={isOpen} hideModal={handleClose} />
    </>
}

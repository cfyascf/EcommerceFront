import { createContext, useState } from 'react'

const GroupContext = createContext()

const GroupProvider = ({ children }) => {
    const [groupName, setGroupName] = useState('')
    const [groupId, setGroupId] = useState(null)

    return (
        <GroupContext.Provider value={{
            groupName, setGroupName,
            groupId, setGroupId
        }}>
        { children }
        </GroupContext.Provider>
    )
}

export { GroupContext, GroupProvider }
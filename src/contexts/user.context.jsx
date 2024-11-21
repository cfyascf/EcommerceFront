import { createContext, useEffect, useState } from 'react'

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [fullname, setFullname] = useState('')
    const [id, setId] = useState(null)

    useEffect(() => {
        setId(sessionStorage.getItem("@USERID"))
    }, [])

    return (
        <UserContext.Provider value={{
            fullname, setFullname,
            id, setId
        }}>
        { children }
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }
import { useState } from "react"

export const loginHook = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const handleRegisterOpen = () => setIsRegisterOpen(true);
    const handleRegisterClose = () => setIsRegisterOpen(false);

    const fillEmail = (text) => {
        setEmail(text)
    }

    const fillPassword = (text) => {
        setPassword(text)
    }

    const showError = () => {
        setError(true)
    }

    return { email, fillEmail, password, fillPassword, error, showError, isRegisterOpen, handleRegisterOpen, handleRegisterClose }
}
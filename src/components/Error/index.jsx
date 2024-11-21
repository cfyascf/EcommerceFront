import styled from './styles.module.sass'

export const Error = ({ hasError, message }) => {
    return (
        <div className={hasError ? styled.error : styled.error_hidden}>
            {message}
        </div>
    )
}
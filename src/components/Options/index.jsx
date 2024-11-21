import styled from './styles.module.sass'

export const Options = ({ children }) => {
    return (
        <div className={styled.options}>
            { children }
        </div>
    )
}
import styled from './styles.module.sass'

export const Grid = ({ children }) => {
    return (
        <div className={styled.grid}>
            { children }
        </div>
    )
}
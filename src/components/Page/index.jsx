import styled from './styles.module.sass'

export const Page = ({ children }) => {
    return <>
        <div className={styled.page}>
            { children }
        </div>
    </>
}
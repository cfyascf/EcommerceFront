import styled from './styles.module.sass'

export const NoData = ({ isShowing }) => {
    return (
        <p className={isShowing ? styled.message_hidden : styled.message}>No data to show, please add some.</p>
    )
}
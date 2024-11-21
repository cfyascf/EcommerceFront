import { filterHook } from "../../../../hooks/filter.hook"
import styled from './styles.module.sass'

export const Filter = ({ filterShowing, setFilterShowing, setFilterType }) => {
    return <>
        <button className={styled.filterBtn} onClick={() => setFilterShowing(!filterShowing)}>
            <span class="material-symbols-outlined">sort</span>
        </button>
        <div className={filterShowing ? styled.filter : styled.filter_hidden}>
            <p className={styled.option} onClick={(e) => setFilterType('Sem filtro')}>Sem filtro</p>
            <p className={styled.option} onClick={(e) => setFilterType('A fazer')}>A fazer</p>
            <p className={styled.option} onClick={(e) => setFilterType('Em andamento')}>Em andamento</p>
            <p className={styled.option} onClick={(e) => setFilterType('Finalizado')}>Finalizado</p>
        </div>
    </>
}
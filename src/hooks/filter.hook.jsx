import { useState } from "react"

export const filterHook = () => {
    const [filterShowing, setFilterShowing] = useState(false)
    const [filterType, setFilterType] = useState('Sem filtro')

    return { filterShowing, setFilterShowing, filterType, setFilterType }
}
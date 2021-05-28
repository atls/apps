import { useContext } from 'react'

import { Context }    from './data-registry.context'

export const useDataRegistry = () => useContext(Context)

import { useContext } from 'react'

import { Context }    from './proto-registry.context'

export const useClient = () => useContext(Context).client

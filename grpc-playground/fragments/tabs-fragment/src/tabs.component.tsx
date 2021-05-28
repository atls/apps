import React           from 'react'
import { useEffect }   from 'react'
import { useState }    from 'react'
import { useCallback } from 'react'
import { FC }          from 'react'
import { useNavigate } from 'react-router-dom'
import { Box }         from '@atls-ui-proto/layout'
import { Layout }      from '@atls-ui-proto/layout'

import { Tab }         from './tab.component'

export interface TabsProps {
  service?: string
  method?: string
}

export const Tabs: FC<TabsProps> = ({ service, method }) => {
  const [tabs, setTabs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setTabs((prev) => {
      if (prev.find((tab) => tab.service === service && tab.method === method)) {
        return prev.map((tab) => {
          if (tab.service === service && tab.method === method) {
            return {
              ...tab,
              active: true,
            }
          }

          return {
            ...tab,
            active: false,
          }
        })
      }

      return [
        {
          service,
          method,
          active: true,
        },
        ...prev.map((tab) => ({ ...tab, active: false })),
      ]
    })
  }, [service, method, setTabs])

  const onClose = useCallback(
    (svc, mtd) => {
      setTabs((prev) => {
        const filtered = prev.filter((tab) => !(tab.service === svc && tab.method === mtd))

        // TODO: move to effect
        if (!filtered.find((tab) => tab.active) && filtered[0]) {
          navigate(`/${filtered[0].service}/${filtered[0].method}`)
        }

        return filtered
      })
    },
    [setTabs, navigate]
  )

  return (
    <Box mt={36} width='100%' borderBottom='1px solid black' pl={16}>
      {tabs.map((tab) => (
        <Layout key={`${tab.service}.${tab.method}`}>
          <Tab {...tab} onClose={onClose} />
        </Layout>
      ))}
    </Box>
  )
}

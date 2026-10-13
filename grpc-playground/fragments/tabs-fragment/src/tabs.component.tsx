import type { TabProps } from './tab.component'

import { Box }           from '@atls-ui-parts/layout'
import { Layout }        from '@atls-ui-parts/layout'
import { useEffect }     from 'react'
import { useState }      from 'react'
import { useCallback }   from 'react'
import { useNavigate }   from 'react-router-dom'
import React             from 'react'

import { Tab }           from './tab.component'

export interface TabsProps {
  service?: string
  method?: string
}

export const Tabs = ({ service, method }: TabsProps) => {
  const [tabs, setTabs] = useState<Array<Omit<TabProps, 'onClose'>>>([])
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
    <Box width='100%' style={{ marginTop: 36, borderBottom: '1px solid black', paddingLeft: 16 }}>
      {tabs.map((tab) => (
        <Layout key={`${tab.service}.${tab.method}`}>
          <Tab {...tab} onClose={onClose} />
        </Layout>
      ))}
    </Box>
  )
}

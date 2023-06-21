import { Column }                from '@atls-ui-parts/layout'
import { Row }                   from '@atls-ui-parts/layout'
import { Box }                   from '@atls-ui-parts/layout'
import { Layout }                from '@atls-ui-parts/layout'

import React                     from 'react'
import { HashRouter }            from 'react-router-dom'
import { useMatch }              from 'react-router-dom'

import { DataRegistryProvider }  from '@grpc-playground/data-registry'
import { Editor }                from '@grpc-playground/editor-fragment'
import { ProtoRegistryProvider } from '@grpc-playground/proto-registry'
import { Sidebar }               from '@grpc-playground/sidebar-fragment'
import { Tabs }                  from '@grpc-playground/tabs-fragment'

import { LoadingState }          from './loading-state.component'

const EditorContainer = () => {
  const { params } = useMatch('/:service/:method') || {}

  return <Editor service={params?.service} method={params?.method} />
}

const TabsContainer = () => {
  const { params } = useMatch('/:service/:method') || {}

  return <Tabs service={params?.service} method={params?.method} />
}

export const IndexPage = () => (
  <ProtoRegistryProvider>
    <DataRegistryProvider>
      <HashRouter>
        <LoadingState>
          <Row height='100%'>
            <Layout flexBasis='200px'>
              <Sidebar />
            </Layout>
            <Layout flexBasis={1}>
              <Box background='black' width={1} />
            </Layout>
            <Layout flexGrow={1}>
              <Column width='100%' height='100%'>
                <Layout>
                  <TabsContainer />
                </Layout>
                <Layout flexGrow={1}>
                  <EditorContainer />
                </Layout>
              </Column>
            </Layout>
          </Row>
        </LoadingState>
      </HashRouter>
    </DataRegistryProvider>
  </ProtoRegistryProvider>
)

import React, { useCallback }          from 'react'

import { useDataRegistry }             from '@grpc-playground/data-registry'
import { useServiceMethodRequestType } from '@grpc-playground/proto-registry'

import { Form }                        from './form'
import { TypeFields }                  from './fields'

export const FormRequest = ({ service, method }) => {
  const messageType = useServiceMethodRequestType(service, method)
  const dataRegistry = useDataRegistry()

  const onChange = useCallback(
    (data) => {
      dataRegistry.setServiceMethodData(service, method, data)
    },
    [service, method, dataRegistry]
  )

  if (!messageType) {
    return null
  }

  return (
    <Form data={dataRegistry.getServiceMethodData(service, method)} onChange={onChange}>
      <TypeFields fields={messageType.fieldsArray} />
    </Form>
  )
}

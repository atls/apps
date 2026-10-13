import type { Field }      from 'protobufjs'

import React               from 'react'

import { NUMBER_TYPES }    from './constants'
import { INTEGER64_TYPES } from './constants'
import { TEXT_TYPES }      from './constants'
import { BOOLEAN_TYPES }   from './constants'
import { BYTES_TYPES }     from './constants'
import { InputField }      from './input.field'

interface ScalarFieldProps {
  field: Field
  path: Array<string>
}

export const ScalarField = ({ field, path }: ScalarFieldProps) => {
  if (TEXT_TYPES.includes(field.type)) {
    return <InputField name={field.name} path={path} />
  }

  if (BOOLEAN_TYPES.includes(field.type)) {
    return <InputField type='checkbox' name={field.name} path={path} />
  }

  if (BYTES_TYPES.includes(field.type)) {
    return <InputField name={field.name} path={path} />
  }

  if (INTEGER64_TYPES.includes(field.type)) {
    return <InputField type='text' name={field.name} path={path} />
  }

  if (NUMBER_TYPES.includes(field.type)) {
    return <InputField type='number' name={field.name} path={path} />
  }

  return null
}

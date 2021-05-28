import React             from 'react'

import { NUMBER_TYPES }  from './constants'
import { TEXT_TYPES }    from './constants'
import { BOOLEAN_TYPES } from './constants'
import { BYTES_TYPES }   from './constants'
import { InputField }    from './input.field'

export const ScalarField = ({ field, path }) => {
  if (TEXT_TYPES.includes(field.type)) {
    return <InputField name={field.name} path={path} />
  }

  if (BOOLEAN_TYPES.includes(field.type)) {
    return <InputField type='checkbox' name={field.name} path={path} />
  }

  if (BYTES_TYPES.includes(field.type)) {
    return <InputField name={field.name} path={path} />
  }

  if (NUMBER_TYPES.includes(field.type)) {
    return <InputField type='number' name={field.name} path={path} />
  }

  return null
}

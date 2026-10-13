/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-no-useless-fragment */

import React             from 'react'
import type { Field }    from 'protobufjs'

import { Type }          from 'protobufjs'
import { Enum }          from 'protobufjs'
import { MapField }      from 'protobufjs'

import { SCALAR_TYPES }  from './constants'
import { EnumField }     from './enum.field'
import { GroupField }    from './group.field'
import { RepeatedField } from './repeated.field'
import { ScalarField }   from './scalar.field'

export interface TypeFieldProps {
  field: Field
  path: Array<string>
}

const RepeatedTypeField = ({ field, path }: TypeFieldProps) => (
  <RepeatedField name={field.name} path={path}>
    {(childPath) =>
      field.resolvedType instanceof Type ? (
        <TypeFields
          key={childPath.join('.')}
          path={childPath}
          fields={field.resolvedType.fieldsArray}
        />
      ) : (
        <TypeField key={childPath.join('.')} field={field} path={childPath} />
      )
    }
  </RepeatedField>
)

export interface TypeFieldsProps {
  fields: Array<Field>
  path?: Array<string>
}

export const TypeFields = ({ fields = [], path = [] }: TypeFieldsProps) => {
  const nodes = fields.reduce<Array<React.ReactElement>>((result, field) => {
    field.resolve()

    if (field.parent !== field.resolvedType) {
      const fieldPath = [...path, field.name]
      const key = fieldPath.join('.')

      if (field.repeated) {
        result.push(<RepeatedTypeField key={key} field={field} path={fieldPath} />)
      } else {
        result.push(<TypeField key={key} field={field} path={fieldPath} />)
      }
    }

    return result
  }, [])

  return <>{nodes}</>
}

const TypeField = ({ field, path }: TypeFieldProps) => {
  const key = path.join('.')

  if (field instanceof MapField) {
    return <div style={{ padding: '16px 0px' }}>Not implemented</div>
  }

  if (field.resolvedType instanceof Type) {
    return (
      <GroupField key={key} name={field.name} path={path}>
        <TypeFields fields={field.resolvedType.fieldsArray} path={path} />
      </GroupField>
    )
  }

  if (field.resolvedType instanceof Enum) {
    return <EnumField key={key} field={field.resolvedType} path={path} />
  }

  if (SCALAR_TYPES.includes(field.type)) {
    return <ScalarField key={key} field={field} path={path} />
  }

  return <TypeField key={key} field={field.resolve()} path={path} />
}

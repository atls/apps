/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-no-useless-fragment */

import React                 from 'react'
import { Field }             from 'protobufjs'
import { Type }              from 'protobufjs'
import { Enum }              from 'protobufjs'
import { MapField }          from 'protobufjs'
import { PropsWithChildren } from 'react'

import { SCALAR_TYPES }      from './constants'
import { EnumField }         from './enum.field'
import { GroupField }        from './group.field'
import { RepeatedField }     from './repeated.field'
import { ScalarField }       from './scalar.field'

const RepeatedTypeField = ({ field, path }) => (
  <RepeatedField name={field.name} path={path}>
    {(childPath) =>
      field.resolvedType ? (
        <TypeFields
          path={childPath}
          key={childPath.join('.')}
          fields={field.resolvedType?.fieldsArray}
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
  const nodes = fields.reduce((result: any[], field) => {
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

export interface TypeFieldProps {
  field: Field
  path?: Array<string>
}

const TypeField = ({ field, path = [] }: PropsWithChildren<TypeFieldProps>) => {
  const key = path.join('.')

  if (field instanceof MapField) {
    return <div style={{ padding: '16px 0px' }}>Not implemented</div>
  }

  if (field.resolvedType instanceof Type) {
    return (
      <GroupField key={key} name={field.name} path={path}>
        <TypeFields fields={field.resolvedType?.fieldsArray} path={path} />
      </GroupField>
    )
  }

  if (field.resolvedType instanceof Enum) {
    // @ts-ignore
    return <EnumField key={key} field={field.resolvedType} path={path} />
  }

  if (SCALAR_TYPES.includes(field.type)) {
    return <ScalarField key={key} field={field} path={path} />
  }

  return <TypeField key={key} field={field.resolve()} path={path} />
}

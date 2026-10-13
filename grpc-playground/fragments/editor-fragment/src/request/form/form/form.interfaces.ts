export type FormData = Record<string, unknown>

export interface FormProps {
  onChange: (data: FormData) => void
  data?: FormData
}

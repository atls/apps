export interface FormData {
  [key: string]: FormData | any
}

export interface FormProps {
  onChange: (data: FormData) => void
  data?: FormData
}

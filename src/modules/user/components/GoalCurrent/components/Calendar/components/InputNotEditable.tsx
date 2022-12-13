import { TextField, TextFieldProps } from '@mui/material'

function InputNotEditable(props: TextFieldProps) {
  const { inputProps } = props

  return <TextField {...props} size="small" defaultValue={inputProps?.value} inputProps={{ readOnly: true }} />
}

export default InputNotEditable

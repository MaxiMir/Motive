import { TextField, TextFieldProps } from '@mui/material'

function InputNotEditable({ inputProps, ...props }: TextFieldProps) {
  return (
    <TextField
      {...props}
      type="text"
      size="small"
      defaultValue={inputProps?.value}
      key={inputProps?.value}
    />
  )
}

export default InputNotEditable

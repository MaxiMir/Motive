import { TextField, TextFieldProps } from '@mui/material'

function InputNotEditable({ inputProps, ...props }: TextFieldProps) {
  return (
    <TextField
      {...props}
      size="small"
      type="text"
      defaultValue={inputProps?.value}
      key={inputProps?.value}
    />
  )
}

export default InputNotEditable

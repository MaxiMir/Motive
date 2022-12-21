import { TextField, TextFieldProps } from '@mui/material'

function InputNotEditable({ inputProps, ...props }: TextFieldProps) {
  return (
    <TextField
      {...props}
      type="text"
      size="small"
      defaultValue={inputProps?.value}
      inputProps={{ readOnly: true }}
      key={inputProps?.value}
    />
  )
}

export default InputNotEditable

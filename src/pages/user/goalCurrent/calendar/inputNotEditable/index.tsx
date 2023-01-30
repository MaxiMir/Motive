import { TextField, TextFieldProps } from '@mui/material'

export function InputNotEditable({ inputProps, ...props }: TextFieldProps) {
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

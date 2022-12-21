import { TextField, TextFieldProps } from '@mui/material'
import AppIcon from '@ui/AppIcon'

function InputNotEditable({ inputProps, ...props }: TextFieldProps) {
  return (
    <TextField
      {...props}
      type="text"
      size="small"
      defaultValue={inputProps?.value}
      InputProps={{
        readOnly: true,
        endAdornment: <AppIcon name="calendar_month" color="yellow" />,
      }}
      key={inputProps?.value}
    />
  )
}

export default InputNotEditable

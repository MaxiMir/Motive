import { Box } from '@mui/material'
import { TextFieldProps as MuiTextFieldPropsType } from '@mui/material/TextField/TextField'

function Input({ inputRef, inputProps, InputProps }: MuiTextFieldPropsType) {
  return (
    <Box display="flex" alignItems="center">
      <input ref={inputRef} {...inputProps} style={{ opacity: 0, width: 0 }} />
      {InputProps?.endAdornment}
    </Box>
  )
}

export default Input

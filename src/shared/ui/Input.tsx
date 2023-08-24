import { TextField, TextFieldProps } from 'formik-mui'

type InputProps = Omit<TextFieldProps, 'variant' | 'size' | 'fullWidth' | 'className'>

function Input(props: InputProps) {
  return <TextField size="small" variant="outlined" autoComplete="off" fullWidth {...props} />
}

export default Input

import { TextField, TextFieldProps } from 'formik-mui'

type InputProps = Omit<TextFieldProps, 'variant' | 'size' | 'fullWidth' | 'className'>

function Input(props: InputProps) {
  return <TextField size="small" variant="outlined" fullWidth {...props} />
}

export default Input

import { TextField, TextFieldProps } from 'formik-mui'

type AppInputProps = Omit<TextFieldProps, 'variant' | 'size' | 'fullWidth' | 'className'>

function AppInput(props: AppInputProps) {
  return <TextField variant="outlined" size="small" fullWidth {...props} />
}

export default AppInput

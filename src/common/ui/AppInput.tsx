import { TextField, TextFieldProps } from 'formik-mui'

type AppInputProps = Omit<TextFieldProps, 'variant' | 'size' | 'fullWidth' | 'className'>

function AppInput(props: AppInputProps) {
  return <TextField variant="outlined" size="small" spellCheck="false" fullWidth {...props} />
}

export default AppInput

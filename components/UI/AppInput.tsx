import { TextField, TextFieldProps } from 'formik-material-ui'

type AppInputProps = Omit<TextFieldProps, 'variant' | 'size' | 'fullWidth' | 'className'>

export default function AppInput(props: AppInputProps) {
  return <TextField variant="outlined" size="small" spellCheck="false" fullWidth {...props} />
}

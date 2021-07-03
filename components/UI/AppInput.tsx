import { TextField, TextFieldProps } from 'formik-material-ui'

type AppInputProps = Omit<TextFieldProps, 'fullWidth' | 'variant' | 'size' | 'error'>

export default function AppInput(props: AppInputProps): JSX.Element {
  return <TextField variant="outlined" size="small" fullWidth {...props} />
}

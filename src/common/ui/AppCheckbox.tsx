import { Checkbox, FormControlLabel } from '@mui/material'
import { FormControlLabelProps } from '@mui/material/FormControlLabel/FormControlLabel'

export type AppCheckboxProps = Omit<FormControlLabelProps, 'control' | 'label'> & {
  label: JSX.Element | string
}

export default function AppCheckbox({ label, ...props }: AppCheckboxProps) {
  return <FormControlLabel label={label} control={<Checkbox />} sx={{ marginRight: 0 }} {...props} />
}

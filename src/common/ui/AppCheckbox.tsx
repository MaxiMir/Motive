import { Checkbox, FormControlLabel } from '@mui/material'
import { FormControlLabelProps } from '@mui/material/FormControlLabel/FormControlLabel'

interface AppCheckboxProps extends Omit<FormControlLabelProps, 'control' | 'label'> {
  label: JSX.Element | string
}

function AppCheckbox({ label, ...props }: AppCheckboxProps) {
  return <FormControlLabel label={label} control={<Checkbox />} sx={{ marginRight: 0 }} {...props} />
}

export default AppCheckbox

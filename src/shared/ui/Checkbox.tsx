import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material'
import { FormControlLabelProps } from '@mui/material/FormControlLabel/FormControlLabel'

interface CheckboxProps extends Omit<FormControlLabelProps, 'control' | 'label'> {
  label: JSX.Element | string
}

function Checkbox({ label, ...props }: CheckboxProps) {
  return (
    <FormControlLabel label={label} control={<MuiCheckbox />} sx={{ marginRight: 0 }} {...props} />
  )
}

export default Checkbox

import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material'
import { FormControlLabelProps } from '@mui/material/FormControlLabel'
import { ReactNode } from 'react'

interface CheckboxProps extends Omit<FormControlLabelProps, 'control' | 'label'> {
  label: ReactNode | string
}

function Checkbox({ label, ...props }: CheckboxProps) {
  return (
    <FormControlLabel label={label} control={<MuiCheckbox />} sx={{ marginRight: 0 }} {...props} />
  )
}

export default Checkbox

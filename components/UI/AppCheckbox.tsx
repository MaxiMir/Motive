import { Checkbox, FormControlLabel } from '@material-ui/core'
import { FormControlLabelProps } from '@material-ui/core/FormControlLabel/FormControlLabel'

type AppCheckboxProps = Omit<FormControlLabelProps, 'control' | 'label'> & {
  label: string
}

export default function AppCheckbox({ label, ...controlProps }: AppCheckboxProps): JSX.Element {
  return (
    <FormControlLabel
      label={label}
      control={<Checkbox inputProps={{ 'aria-label': label }} />}
      style={{ textDecoration: !controlProps.checked ? undefined : 'line-through' }}
      {...controlProps}
    />
  )
}

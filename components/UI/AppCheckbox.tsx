import { Checkbox, FormControlLabel, makeStyles } from '@material-ui/core'
import { FormControlLabelProps } from '@material-ui/core/FormControlLabel/FormControlLabel'

type AppCheckboxProps = Omit<FormControlLabelProps, 'control' | 'label'> & {
  label: JSX.Element | string
}

export default function AppCheckbox({ label, ...controlProps }: AppCheckboxProps): JSX.Element {
  const classes = useStyles()

  return (
    <FormControlLabel
      label={label}
      control={<Checkbox />}
      style={{ textDecoration: !controlProps.checked ? undefined : 'line-through' }}
      className={classes.checkbox}
      {...controlProps}
    />
  )
}

const useStyles = makeStyles({
  checkbox: {
    marginRight: 0,
  },
})

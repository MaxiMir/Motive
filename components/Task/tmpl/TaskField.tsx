import { ChangeEvent } from 'react'
import dynamic from 'next/dynamic'
import { Field } from 'formik'
import { createStyles, FormControlLabel, Switch, makeStyles, IconButton } from '@material-ui/core'
import AppBox from 'components/UI/AppBox'
import AppInput from 'components/UI/AppInput'
import AppIcon from 'components/UI/AppIcon'

const KeyboardTimePicker = dynamic(() =>
  import('formik-material-ui-pickers').then(
    (m) => m.KeyboardTimePicker,
    () => null as never,
  ),
)

export interface TaskFieldProps {
  tmpl: 'field'
  index: number
  date?: Date
  taskCount: number
  onToggleDate: (isChecked: boolean) => void
  onRemove: () => void
}

export default function TaskField({ index, date, taskCount, onToggleDate, onRemove }: TaskFieldProps): JSX.Element {
  const classes = useStyles()

  const onSwitchClick = (_: ChangeEvent<HTMLInputElement>, isChecked: boolean) => {
    onToggleDate(isChecked)
  }

  return (
    <>
      <AppBox justifyContent="space-between" spacing={1}>
        <Field
          name={`tasks.${index}.name`}
          label="Task *"
          color="secondary"
          placeholder="What should be done"
          multiline
          rows={3}
          autoFocus={!!index && index === taskCount - 1}
          component={AppInput}
        />
        <IconButton
          disableFocusRipple
          aria-label="remove task"
          disabled={taskCount === 1}
          onClick={onRemove}
          className={classes.iconCloseBtn}
        >
          <AppIcon name="close" />
        </IconButton>
      </AppBox>
      <AppBox height={48} alignItems="center" pl={1} spacing={1}>
        <FormControlLabel control={<Switch size="small" onChange={onSwitchClick} />} label="remind me" />
        {date && (
          <Field
            name={`tasks.${index}.date`}
            ampm={false}
            className={classes.timepicker}
            keyboardIcon={<AppIcon name="query_builder" />}
            component={KeyboardTimePicker}
          />
        )}
      </AppBox>
    </>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    number: {
      color: theme.text.silent,
    },
    timepicker: {
      width: 100,
    },
    iconCloseBtn: {
      alignSelf: 'flex-start;',
      marginTop: 16,
      color: theme.text.silent,
    },
  }),
)

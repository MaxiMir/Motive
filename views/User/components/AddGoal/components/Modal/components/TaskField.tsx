import React, { ChangeEvent } from 'react'
import dynamic from 'next/dynamic'
import { Field } from 'formik'
import { createStyles, FormControlLabel, IconButton, Switch } from '@material-ui/core'
import AppBox from 'components/UI/AppBox'
import AppInput from 'components/UI/AppInput'
import AppIcon from 'components/UI/AppIcon'
import { makeStyles } from '@material-ui/core/styles'

const KeyboardTimePicker = dynamic(() =>
  import('formik-material-ui-pickers').then(
    (m) => m.KeyboardTimePicker,
    () => null as never,
  ),
)

interface TaskFieldProps {
  index: number
  date?: Date
  taskCount: number
  onToggleDate: (isChecked: boolean) => void
  onRemove: () => void
}

export default function TaskField({ index, date, taskCount, onRemove, onToggleDate }: TaskFieldProps): JSX.Element {
  const classes = useStyles()

  const onSwitchClick = (_: ChangeEvent<HTMLInputElement>, isChecked: boolean) => onToggleDate(isChecked)

  return (
    <>
      <AppBox alignItems="center" spacing={1}>
        <Field
          name={`tasks.${index}.name`}
          label="Task *"
          color="secondary"
          placeholder="What should be done"
          multiline
          rows={3}
          component={AppInput}
          autoFocus={!!index && index === taskCount - 1}
        />
        <IconButton
          disableFocusRipple
          aria-label="remove task"
          disabled={taskCount === 1}
          onClick={onRemove}
          className={classes.iconCloseBtn}
        >
          <AppIcon>close</AppIcon>
        </IconButton>
      </AppBox>
      <AppBox height={48} alignItems="center" pl={1} spacing={1}>
        <FormControlLabel control={<Switch size="small" onChange={onSwitchClick} />} label="remind me" />
        {date && (
          <Field
            name={`tasks.${index}.date`}
            ampm={false}
            className={classes.timepicker}
            keyboardIcon={<span className="material-icons">query_builder</span>}
            component={KeyboardTimePicker}
          />
        )}
      </AppBox>
    </>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    timepicker: {
      width: 100,
    },
    iconCloseBtn: {
      color: theme.text.silent,
    },
  }),
)

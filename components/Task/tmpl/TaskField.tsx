import { ChangeEvent } from 'react'
import dynamic from 'next/dynamic'
import { Field } from 'formik'
import { createStyles, FormControlLabel, Switch, makeStyles, Tooltip } from '@material-ui/core'
import AppBox from 'components/UI/AppBox'
import AppInput from 'components/UI/AppInput'
import AppIcon from 'components/UI/AppIcon'
import AppIconButton from 'components/UI/AppIconButton'

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
        <AppBox alignSelf="flex-start" mt={2}>
          <AppIconButton name="close" aria-label="Remove task" disabled={taskCount === 1} onClick={onRemove} />
        </AppBox>
      </AppBox>
      <AppBox alignItems="center" spacing={1} pl={1} height={48}>
        {/* TODO ADD  */}
        <Tooltip title="soon">
          <FormControlLabel label="remind me" disabled control={<Switch size="small" onChange={onSwitchClick} />} />
        </Tooltip>
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
  }),
)

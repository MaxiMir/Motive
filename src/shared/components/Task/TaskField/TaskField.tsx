import { ChangeEvent } from 'react'
import { Field } from 'formik'
import { IconButton, Switch, FormControlLabel, Stack } from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers'
import AppInput from '@ui/AppInput'
import AppIcon from '@ui/AppIcon'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'

interface TaskFieldProps {
  index: number
  date: string
  remind?: Date
  taskCount: number
  setFieldValue: (field: string, value?: string) => void
  onRemove: () => void
}

function TaskField({ index, date, remind, taskCount, setFieldValue, onRemove }: TaskFieldProps) {
  const messages = useMessages()
  const autoFocus = !!index && index === taskCount - 1

  const onSwitchClick = (_: ChangeEvent<HTMLInputElement>, isChecked: boolean) => {
    setFieldValue(`tasks.${index}.date`, isChecked ? date : undefined)
  }

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
        <Field
          name={`tasks.${index}.name`}
          label={messages.label}
          placeholder={messages.placeholder}
          autoFocus={autoFocus}
          component={AppInput}
        />
        <IconButton
          aria-label={messages.closeText}
          disableFocusRipple
          disabled={taskCount === 1}
          sx={{ color: 'zen.silent' }}
          onClick={onRemove}
        >
          <AppIcon name="close" />
        </IconButton>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1} pl={1} height={48}>
        {/* TODO ADD  */}
        <TooltipArrow title={messages.soonText}>
          <FormControlLabel
            label={messages.remindText}
            disabled
            control={<Switch size="small" onChange={onSwitchClick} />}
          />
        </TooltipArrow>
        {remind && (
          <Field
            name={`tasks.${index}.date`}
            ampm={false}
            keyboardIcon={<AppIcon name="query_builder" />}
            sx={{ width: 100 }}
            component={TimePicker}
          />
        )}
      </Stack>
    </Stack>
  )
}

export default TaskField

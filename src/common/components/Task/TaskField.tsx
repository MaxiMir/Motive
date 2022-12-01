import { ChangeEvent } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'formik'
import { Box, IconButton, Switch, Tooltip, FormControlLabel } from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers'
import AppInput from '@ui/AppInput'
import AppIcon from '@ui/AppIcon'

interface TaskFieldProps {
  index: number
  date: string
  remind?: Date
  taskCount: number
  setFieldValue: (field: string, value?: string) => void
  onRemove: () => void
}

function TaskField({ index, date, remind, taskCount, setFieldValue, onRemove }: TaskFieldProps) {
  const { formatMessage } = useIntl()
  const label = formatMessage({ id: 'component.task-field.label' })
  const placeholder = formatMessage({ id: 'component.task-field.placeholder' })
  const closeText = formatMessage({ id: 'component.task-field.close' })
  const remindText = formatMessage({ id: 'component.task-field.remind' })
  const soonText = formatMessage({ id: 'common.soon' })
  const autoFocus = !!index && index === taskCount - 1

  const onSwitchClick = (_: ChangeEvent<HTMLInputElement>, isChecked: boolean) => {
    setFieldValue(`tasks.${index}.date`, isChecked ? date : undefined)
  }

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" justifyContent="space-between" gap={1}>
        <Field
          name={`tasks.${index}.name`}
          label={label}
          placeholder={placeholder}
          autoFocus={autoFocus}
          component={AppInput}
        />
        <Box display="flex" alignSelf="flex-start">
          <IconButton
            disableFocusRipple
            aria-label={closeText}
            disabled={taskCount === 1}
            sx={{ color: 'zen.silent' }}
            onClick={onRemove}
          >
            <AppIcon name="close" />
          </IconButton>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" gap={1} pl={1} height={48}>
        {/* TODO ADD  */}
        <Tooltip title={soonText}>
          <span>
            <FormControlLabel label={remindText} disabled control={<Switch size="small" onChange={onSwitchClick} />} />
          </span>
        </Tooltip>
        {remind && (
          <Field
            name={`tasks.${index}.date`}
            ampm={false}
            keyboardIcon={<AppIcon name="query_builder" />}
            sx={{ width: 100 }}
            component={TimePicker}
          />
        )}
      </Box>
    </Box>
  )
}

export default TaskField

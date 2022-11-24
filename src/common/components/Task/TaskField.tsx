import { ChangeEvent } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'formik'
import { Box, Switch, Tooltip, FormControlLabel } from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers'
import AppInput from '@ui/AppInput'
import AppIcon from '@ui/AppIcon'
import AppIconButton from '@ui/AppIconButton'

interface TaskFieldProps {
  index: number
  date?: Date
  taskCount: number
  onToggleDate: (isChecked: boolean) => void
  onRemove: () => void
}

export default function TaskField({ index, date, taskCount, onToggleDate, onRemove }: TaskFieldProps) {
  const { formatMessage } = useIntl()
  const label = formatMessage({ id: 'component.task-field.label' })
  const placeholder = formatMessage({ id: 'component.task-field.placeholder' })
  const closeText = formatMessage({ id: 'component.task-field.close' })
  const remindText = formatMessage({ id: 'component.task-field.remind' })
  const soonText = formatMessage({ id: 'common.soon' })

  const onSwitchClick = (_: ChangeEvent<HTMLInputElement>, isChecked: boolean) => {
    onToggleDate(isChecked)
  }

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" justifyContent="space-between" gap={1}>
        <Field
          name={`tasks.${index}.name`}
          label={label}
          placeholder={placeholder}
          autoFocus={!!index && index === taskCount - 1}
          component={AppInput}
        />
        <Box display="flex" alignSelf="flex-start">
          <AppIconButton
            name="close"
            aria-label={closeText}
            disabled={taskCount === 1}
            sx={{ color: 'zen.silent' }}
            onClick={onRemove}
          />
        </Box>
      </Box>
      <Box display="flex" alignItems="center" gap={1} pl={1} height={48}>
        {/* TODO ADD  */}
        <Tooltip title={soonText}>
          <span>
            <FormControlLabel label={remindText} disabled control={<Switch size="small" onChange={onSwitchClick} />} />
          </span>
        </Tooltip>
        {date && (
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

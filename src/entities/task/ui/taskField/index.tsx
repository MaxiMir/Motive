import { IconButton, Stack, Switch, FormControlLabel } from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers'
import { Field } from 'formik'
import { ChangeEvent } from 'react'
import { useIntl } from 'react-intl'
import Icon from 'shared/ui/Icon'
import Input from 'shared/ui/Input'
import TooltipArrow from 'shared/ui/TooltipArrow'

interface TaskFieldProps {
  index: number
  date: string
  remind?: Date
  taskCount: number
  setFieldValue: (field: string, value?: string) => void
  onRemove: () => void
}

export function TaskField({
  index,
  date,
  remind,
  taskCount,
  setFieldValue,
  onRemove,
}: TaskFieldProps) {
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
    <Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={1}>
        <Field
          name={`tasks.${index}.name`}
          label={label}
          placeholder={placeholder}
          autoFocus={autoFocus}
          required
          component={Input}
        />
        <IconButton
          aria-label={closeText}
          disableFocusRipple
          disabled={taskCount === 1}
          sx={{ color: 'zen.silent' }}
          onClick={onRemove}
        >
          <Icon name="close" />
        </IconButton>
      </Stack>
      <Stack direction="row" alignItems="center" gap={1} pl={1} height={48}>
        {/* TODO ADD  */}
        <TooltipArrow title={soonText}>
          <FormControlLabel
            label={remindText}
            disabled
            control={<Switch size="small" onChange={onSwitchClick} />}
          />
        </TooltipArrow>
        {remind && (
          <Field
            name={`tasks.${index}.date`}
            ampm={false}
            keyboardIcon={<Icon name="query_builder" />}
            sx={{ width: 100 }}
            component={TimePicker}
          />
        )}
      </Stack>
    </Stack>
  )
}

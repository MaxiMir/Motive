import { ChangeEvent } from 'react'
import { Field } from 'formik'
import { Box, Switch, Tooltip, FormControlLabel } from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers'
import { Locale } from 'hooks/useLocale'
import AppInput from 'components/UI/AppInput'
import AppIcon from 'components/UI/AppIcon'
import AppIconButton from 'components/UI/AppIconButton'
import i18n from './i18n'

export interface TaskFieldProps {
  index: number
  date?: Date
  taskCount: number
  locale: Locale
  onToggleDate: (isChecked: boolean) => void
  onRemove: () => void
}

export default function TaskField({
  index,
  date,
  taskCount,
  locale,
  onToggleDate,
  onRemove,
}: TaskFieldProps): JSX.Element {
  const { label, placeholder, close, remind, tooltip } = i18n[locale]

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
            aria-label={close}
            disabled={taskCount === 1}
            sx={{ color: 'zen.silent' }}
            onClick={onRemove}
          />
        </Box>
      </Box>
      <Box display="flex" alignItems="center" gap={1} pl={1} height={48}>
        {/* TODO ADD  */}
        <Tooltip title={tooltip}>
          <FormControlLabel label={remind} disabled control={<Switch size="small" onChange={onSwitchClick} />} />
        </Tooltip>
        {date && (
          <Field
            name={`tasks.${index}.date`}
            ampm={false}
            keyboardIcon={<AppIcon name="query_builder" />}
            component={TimePicker}
            sx={{ width: 100 }}
          />
        )}
      </Box>
    </Box>
  )
}

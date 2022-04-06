import { ChangeEvent } from 'react'
import dynamic from 'next/dynamic'
import { Field } from 'formik'
import { FormControlLabel, Switch, Tooltip, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { Locale } from 'hooks/useLocale'
import AppBox from 'components/UI/AppBox'
import AppInput from 'components/UI/AppInput'
import AppIcon from 'components/UI/AppIcon'
import AppIconButton from 'components/UI/AppIconButton'
import i18n from './i18n'

const TimePicker = dynamic(() => import('@mui/lab/TimePicker'))

export interface TaskFieldProps {
  tmpl: 'field'
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
  const classes = useStyles()
  const { label, placeholder, close, remind, tooltip } = i18n[locale]

  const onSwitchClick = (_: ChangeEvent<HTMLInputElement>, isChecked: boolean) => {
    onToggleDate(isChecked)
  }

  return (
    <>
      <AppBox justifyContent="space-between" gap={1}>
        <Field
          name={`tasks.${index}.name`}
          label={label}
          color="secondary"
          placeholder={placeholder}
          multiline
          rows={3}
          autoFocus={!!index && index === taskCount - 1}
          component={AppInput}
        />
        <AppBox alignSelf="flex-start" mt={2}>
          <AppIconButton name="close" aria-label={close} disabled={taskCount === 1} onClick={onRemove} />
        </AppBox>
      </AppBox>
      <AppBox alignItems="center" gap={1} pl={1} height={48}>
        {/* TODO ADD  */}
        <Tooltip title={tooltip}>
          <FormControlLabel label={remind} disabled control={<Switch size="small" onChange={onSwitchClick} />} />
        </Tooltip>
        {date && (
          <Field
            name={`tasks.${index}.date`}
            ampm={false}
            className={classes.timepicker}
            keyboardIcon={<AppIcon name="query_builder" />}
            component={TimePicker}
          />
        )}
      </AppBox>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    number: {
      color: theme.text.silent,
    },
    timepicker: {
      width: 100,
    },
  }),
)

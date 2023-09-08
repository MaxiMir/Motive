import {
  SelectChangeEvent,
  Switch,
  FormControlLabel,
  IconButton,
  Stack,
  MenuItem,
  Box,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material'
import { styled } from '@mui/system'
import { TimePicker } from '@mui/x-date-pickers'
import { Field } from 'formik'
import { ChangeEvent, useId } from 'react'
import { useIntl } from 'react-intl'
import { CreateTaskDto } from 'shared/api'
import Icon from 'shared/ui/Icon'
import Input from 'shared/ui/Input'
import PriorityIcon from 'shared/ui/PriorityIcon'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { usePriorityList } from './lib'

interface TaskFieldProps {
  task: CreateTaskDto
  date: string
  index: number
  taskCount: number
  setFieldValue: (field: string, value?: string) => void
  onRemove: () => void
}

export function TaskField({
  task,
  date,
  index,
  taskCount,
  setFieldValue,
  onRemove,
}: TaskFieldProps) {
  const { formatMessage } = useIntl()
  const priorityLabelId = useId()
  const priorityList = usePriorityList()
  const label = formatMessage({ id: 'common.task' })
  const placeholder = formatMessage({ id: 'component.task-field.placeholder' })
  const labelDescription = formatMessage({ id: 'common.description' })
  const placeholderDescription = formatMessage({ id: 'common.task-description' })
  const closeText = formatMessage({ id: 'component.task-field.close' })
  const remindText = formatMessage({ id: 'component.task-field.remind' })
  const nopeText = formatMessage({ id: 'common.nope' })
  const soonText = formatMessage({ id: 'common.soon' })
  const autoFocus = !!index && index === taskCount - 1

  const onSwitchClick = (_: ChangeEvent<HTMLInputElement>, isChecked: boolean) => {
    setFieldValue(`tasks.${index}.date`, isChecked ? date : undefined)
  }

  const onChangePriority = (e: SelectChangeEvent) => {
    setFieldValue(`tasks.${index}.priority`, e.target.value)
  }

  return (
    <Stack gap={1}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
        <Stack gap={1} flex={1}>
          <Field
            name={`tasks.${index}.name`}
            label={label}
            placeholder={placeholder}
            autoFocus={autoFocus}
            required
            component={Input}
          />
          <Field
            name={`tasks.${index}.description`}
            label={labelDescription}
            placeholder={placeholderDescription}
            multiline
            component={Input}
          />
          <StyledFormControl fullWidth>
            <InputLabel id={priorityLabelId}>{priorityList.label}</InputLabel>
            <Select
              name="priority"
              value={task.priority || undefined}
              label={priorityList.label}
              size="small"
              labelId={priorityLabelId}
              onChange={onChangePriority}
            >
              <MenuItem>{nopeText}</MenuItem>
              {priorityList.list.map(({ name, value }) => (
                <MenuItem value={value} key={name}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <PriorityIcon priority={value} />
                    {name}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        </Stack>
        <IconButton
          aria-label={closeText}
          disableFocusRipple
          disabled={taskCount === 1}
          sx={{ color: 'zen.silent' }}
          onClick={onRemove}
        >
          <Icon name="delete" />
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
        {task.date && (
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

const StyledFormControl = styled(FormControl)({
  '& [data-shrink=false]': {
    top: -7,
  },
})

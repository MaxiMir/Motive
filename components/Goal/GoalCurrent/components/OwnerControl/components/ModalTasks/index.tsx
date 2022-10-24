import { ChangeEvent } from 'react'
import { useIntl } from 'react-intl'
import { FieldArray, Form, FormikProvider } from 'formik'
import {
  Accordion,
  AccordionDetails,
  FormControlLabel,
  Radio,
  RadioGroup,
  Tooltip,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  Typography,
} from '@mui/material'
import { GoalDto } from 'dto'
import { getToday, getTomorrow } from 'helpers/date'
import AppIcon from 'components/ui/AppIcon'
import AppHeader from 'components/ui/AppHeader'
import { PaulIcon } from 'components/ui/icons'
import AppModal from 'components/ui/AppModal'
import ActionSubmit from 'components/Action/ActionSubmit'
import ActionCancel from 'components/Action/ActionCancel'
import TaskField from 'components/Task/TaskField'
import OldPittRules from 'components/OldPitt/OldPittRules'
import useForm from './hook'

export interface ModalTasksProps {
  goal: GoalDto
  onClose: () => void
}

export default function ModalTasks({ goal, onClose }: ModalTasksProps) {
  const { formatMessage } = useIntl()
  const form = useForm(goal, onClose)
  const { isSubmitting, values, setFieldValue, handleSubmit } = form
  const todayValue = getToday().toISOString()
  const tomorrowValue = getTomorrow().toISOString()
  const todayDisabled = todayValue === goal.day.date
  const titleText = formatMessage({ id: 'page.user.modal-tasks.title' })
  const subtitleText = formatMessage({ id: 'page.user.modal-tasks.subtitle' })
  const addTaskText = formatMessage({ id: 'common.task-add' })
  const buttonText = formatMessage({ id: 'common.create' })
  const loadingText = formatMessage({ id: 'page.user.modal-tasks.loading' })
  const doItText = formatMessage({ id: 'page.user.modal-tasks.do-it' })
  const doItLabelledby = formatMessage({ id: 'page.user.modal-tasks.do-it-labelledby' })
  const todayText = formatMessage({ id: 'common.today' })
  const tomorrowText = formatMessage({ id: 'common.tomorrow' })
  const pittText = formatMessage({ id: 'page.user.modal-tasks.pitt' })
  const pittAria = formatMessage({ id: 'page.user.modal-tasks.pitt-aria' })
  const tooltipText = todayDisabled && formatMessage({ id: 'page.user.modal-tasks.tooltip' })

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldValue('date', e.target.value)
  }

  return (
    <AppModal
      title={
        <>
          {titleText}{' '}
          <Box component="span" sx={{ color: 'zen.sand' }}>
            {subtitleText}
          </Box>
        </>
      }
      maxWidth="xs"
      actions={[
        <ActionCancel onClick={onClose} />,
        <ActionSubmit
          isLoading={isSubmitting}
          name={buttonText}
          nameLoading={loadingText}
          emoji="task"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <Box display="flex" flexDirection="column" gap={3}>
        <FormikProvider value={form}>
          <Form autoComplete="off">
            <Box display="flex" flexDirection="column" gap={3}>
              <Box>
                <FieldArray name="tasks">
                  {({ push, remove }) => (
                    <>
                      {values.tasks.map((task, index) => (
                        <TaskField
                          index={index}
                          taskCount={values.tasks.length}
                          date={task.date}
                          key={`tasks.${index}`}
                          onRemove={() => remove(index)}
                          onToggleDate={(isChecked) =>
                            setFieldValue(`tasks.${index}.date`, isChecked ? values.date : undefined)
                          }
                        />
                      ))}
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ alignSelf: 'baseline', textTransform: 'none' }}
                        onClick={() => push({ name: '', date: undefined })}
                      >
                        {addTaskText}
                      </Button>
                    </>
                  )}
                </FieldArray>
              </Box>
              <FormControl variant="standard">
                <AppHeader name="clock" variant="h6" component="label">
                  {doItText}
                </AppHeader>
                <RadioGroup
                  name="date"
                  value={values.date}
                  aria-labelledby={doItLabelledby}
                  row
                  onChange={onChangeDate}
                >
                  <Tooltip title={tooltipText} arrow followCursor>
                    <span>
                      <FormControlLabel
                        label={todayText}
                        value={todayValue}
                        disabled={todayDisabled}
                        control={<Radio />}
                      />
                    </span>
                  </Tooltip>
                  <FormControlLabel label={tomorrowText} value={tomorrowValue} control={<Radio />} />
                </RadioGroup>
              </FormControl>
            </Box>
          </Form>
        </FormikProvider>
        <Accordion>
          <AccordionSummary expandIcon={<AppIcon name="expand_more" />} aria-controls={pittAria} id="old-pitt-note">
            <Box display="flex" alignItems="center" gap={1}>
              <PaulIcon />
              <Typography variant="h6" component="h3">
                {pittText}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <OldPittRules />
          </AccordionDetails>
        </Accordion>
      </Box>
    </AppModal>
  )
}

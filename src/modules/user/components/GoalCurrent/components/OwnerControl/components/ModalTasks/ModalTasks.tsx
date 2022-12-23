import { ChangeEvent } from 'react'
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
import { getMidnightISO, getTomorrowISO } from '@lib/date'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks/useGoalContext'
import AppIcon from '@ui/AppIcon'
import AppHeader from '@ui/AppHeader'
import { PaulIcon } from '@ui/icons'
import AppModal from '@ui/AppModal/AppModal'
import ActionSubmit from '@components/Action/ActionSubmit'
import ActionCancel from '@components/Action/ActionCancel/ActionCancel'
import TaskField from '@components/Task/TaskField/TaskField'
import OldPittRules from '@components/OldPitt/OldPittRules/OldPittRules'
import { useMessages } from './hooks/useMessages'
import { useForm } from './hooks/useForm'

interface ModalTasksProps {
  onClose: () => void
}

function ModalTasks({ onClose }: ModalTasksProps) {
  const messages = useMessages()
  const { day } = useGoalContext()
  const form = useForm(onClose)
  const { isSubmitting, values, setFieldValue, handleSubmit } = form
  const todayValue = getMidnightISO()
  const tomorrowValue = getTomorrowISO()
  const todayDisabled = todayValue === day.date
  const tooltipTitle = todayDisabled && messages.tooltipText

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldValue('date', e.target.value)
  }

  return (
    <AppModal
      title={
        <>
          {messages.titleText}{' '}
          <Box component="span" sx={{ color: 'zen.sand' }}>
            {messages.subtitleText}
          </Box>
        </>
      }
      maxWidth="xs"
      actions={[
        <ActionCancel onClick={onClose} />,
        <ActionSubmit
          disabled={isSubmitting}
          text={messages.buttonText}
          loadingText={messages.loadingText}
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
                      {values.tasks.map(({ id, date }, index) => (
                        <TaskField
                          taskCount={values.tasks.length}
                          date={values.date}
                          remind={date}
                          index={index}
                          key={id}
                          setFieldValue={setFieldValue}
                          onRemove={() => remove(index)}
                        />
                      ))}
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ alignSelf: 'baseline', textTransform: 'none' }}
                        onClick={() => push({ id: crypto.randomUUID(), name: '', date: undefined })}
                      >
                        {messages.addTaskText}
                      </Button>
                    </>
                  )}
                </FieldArray>
              </Box>
              <FormControl variant="standard">
                <AppHeader name="clock" variant="h6" component="label">
                  {messages.doItText}
                </AppHeader>
                <RadioGroup
                  name="date"
                  value={values.date}
                  aria-labelledby={messages.doItLabelledby}
                  row
                  onChange={onChangeDate}
                >
                  <Tooltip title={tooltipTitle} arrow followCursor>
                    <span>
                      <FormControlLabel
                        label={messages.todayText}
                        value={todayValue}
                        disabled={todayDisabled}
                        control={<Radio />}
                      />
                    </span>
                  </Tooltip>
                  <FormControlLabel label={messages.tomorrowText} value={tomorrowValue} control={<Radio />} />
                </RadioGroup>
              </FormControl>
            </Box>
          </Form>
        </FormikProvider>
        <Accordion>
          <AccordionSummary
            expandIcon={<AppIcon name="expand_more" />}
            aria-controls={messages.pittAria}
            id="old-pitt-note"
          >
            <Box display="flex" alignItems="center" gap={1}>
              <PaulIcon />
              <Typography variant="h6" component="h3">
                {messages.pittText}
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

export default ModalTasks

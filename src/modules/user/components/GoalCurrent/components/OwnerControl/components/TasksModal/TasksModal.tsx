import { ChangeEvent } from 'react'
import { FieldArray, Form, FormikProvider } from 'formik'
import {
  Accordion,
  AccordionDetails,
  FormControlLabel,
  Radio,
  RadioGroup,
  AccordionSummary,
  Box,
  Stack,
  Button,
  FormControl,
  Typography,
} from '@mui/material'
import { getMidnightISO, getTomorrowISO } from '@lib/date'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks/useGoalContext'
import AppIcon from '@ui/AppIcon'
import EmojiHeader from '@ui/EmojiHeader'
import Paul from '@ui/icons/Paul'
import AppModal from '@ui/AppModal'
import ActionSubmit from '@components/Action/ActionSubmit'
import ActionCancel from '@components/Action/ActionCancel/ActionCancel'
import TaskField from '@components/Task/TaskField/TaskField'
import OldPittRules from '@components/OldPitt/OldPittRules/OldPittRules'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'
import { useForm } from './hooks/useForm'

interface TasksModalProps {
  onClose: () => void
}

function TasksModal({ onClose }: TasksModalProps) {
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
        <ActionCancel key="cancel" onClick={onClose} />,
        <ActionSubmit
          disabled={isSubmitting}
          text={messages.buttonText}
          loadingText={messages.loadingText}
          emoji="task"
          key="submit"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <Stack spacing={3}>
        <FormikProvider value={form}>
          <Form>
            <Stack spacing={3}>
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
                        size="small"
                        variant="outlined"
                        sx={{ alignSelf: 'baseline' }}
                        startIcon={<AppIcon name="add" />}
                        onClick={() => push({ id: crypto.randomUUID(), name: '', date: undefined })}
                      >
                        {messages.addTaskText}
                      </Button>
                    </>
                  )}
                </FieldArray>
              </Box>
              <FormControl variant="standard">
                <EmojiHeader name="clock" variant="h6" component="label">
                  {messages.doItText}
                </EmojiHeader>
                <RadioGroup
                  name="date"
                  value={values.date}
                  aria-labelledby={messages.doItLabelledby}
                  row
                  onChange={onChangeDate}
                >
                  <TooltipArrow title={tooltipTitle}>
                    <FormControlLabel
                      label={messages.todayText}
                      value={todayValue}
                      disabled={todayDisabled}
                      control={<Radio />}
                    />
                  </TooltipArrow>
                  <FormControlLabel
                    label={messages.tomorrowText}
                    value={tomorrowValue}
                    control={<Radio />}
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
          </Form>
        </FormikProvider>
        <Accordion>
          <AccordionSummary expandIcon={<AppIcon name="expand_more" />} id="old-pitt-note">
            <Box display="flex" alignItems="center" gap={1}>
              <Paul />
              <Typography variant="h6" component="h3">
                {messages.pittText}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <OldPittRules />
          </AccordionDetails>
        </Accordion>
      </Stack>
    </AppModal>
  )
}

export default TasksModal

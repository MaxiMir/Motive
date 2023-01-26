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
import { FieldArray, Form, FormikProvider } from 'formik'
import { ChangeEvent } from 'react'
import { useGoalContext } from '@entities/goal'
import { TaskField } from '@entities/task'
import { getMidnightISO, getTomorrowISO } from '@shared/lib/utils'
import CancelButton from '@shared/ui/CancelButton'
import EmojiHeader from '@shared/ui/EmojiHeader'
import Icon from '@shared/ui/Icon'
import { Paul } from '@shared/ui/icons'
import Modal from '@shared/ui/Modal'
import { OldPittRules } from '@shared/ui/oldPittRules'
import { TooltipArrow } from '@shared/ui/styled'
import SubmitButton from '@shared/ui/SubmitButton'
import { useForm } from './hooks/useForm'
import { useMessages } from './hooks/useMessages'

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
    <Modal
      title={
        <>
          {messages.titleText}{' '}
          <Box component="span" color="zen.sand">
            {messages.subtitleText}
          </Box>
        </>
      }
      maxWidth="xs"
      actions={[
        <CancelButton key="cancel" onClick={onClose} />,
        <SubmitButton
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
                      startIcon={<Icon name="add" />}
                      onClick={() => push({ id: crypto.randomUUID(), name: '', date: undefined })}
                    >
                      {messages.addTaskText}
                    </Button>
                  </>
                )}
              </FieldArray>
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
          <AccordionSummary expandIcon={<Icon name="expand_more" />} id="old-pitt-note">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Paul />
              <Typography variant="h6" component="h3">
                {messages.pittText}
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <OldPittRules />
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Modal>
  )
}

export default TasksModal

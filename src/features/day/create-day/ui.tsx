import {
  Accordion,
  AccordionDetails,
  FormControlLabel,
  Radio,
  RadioGroup,
  AccordionSummary,
  Stack,
  Button,
  FormControl,
  Typography,
} from '@mui/material'
import { FieldArray, Form, FormikProvider } from 'formik'
import { ChangeEvent } from 'react'
import { useIntl } from 'react-intl'
import { PittRules } from 'entities/characteristic'
import { TaskField } from 'entities/task'
import { getMidnightISO, getTomorrowISO } from 'shared/lib/utils'
import CancelButton from 'shared/ui/CancelButton'
import Icon from 'shared/ui/Icon'
import { Paul } from 'shared/ui/icons'
import Modal from 'shared/ui/Modal'
import SubmitButton from 'shared/ui/SubmitButton'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { useCreateDay } from './model'

interface CreateDayModalProps {
  goalId: number
  dayDate: string
  onClose: () => void
}

function CreateDayModal({ goalId, dayDate, onClose }: CreateDayModalProps) {
  const { formatMessage } = useIntl()
  const form = useCreateDay(goalId, onClose)
  const { isSubmitting, values, setFieldValue, handleSubmit } = form
  const todayValue = getMidnightISO()
  const tomorrowValue = getTomorrowISO()
  const todayDisabled = todayValue === dayDate
  const title = formatMessage({ id: 'page.user.modal-tasks.title' })
  const addTaskText = formatMessage({ id: 'common.task-add' })
  const buttonText = formatMessage({ id: 'common.create' })
  const loadingText = formatMessage({ id: 'common.creating' })
  const doItText = formatMessage({ id: 'page.user.modal-tasks.do-it' })
  const doItLabelledby = formatMessage({ id: 'page.user.modal-tasks.do-it-labelledby' })
  const todayText = formatMessage({ id: 'common.today' })
  const tomorrowText = formatMessage({ id: 'common.tomorrow' })
  const pittText = formatMessage({ id: 'page.user.modal-tasks.pitt' })
  const tooltipTitle = todayDisabled && formatMessage({ id: 'page.user.modal-tasks.tooltip' })

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldValue('date', e.target.value)
  }

  return (
    <Modal
      title={title}
      maxWidth="xs"
      actions={[
        <CancelButton key="cancel" onClick={onClose} />,
        <SubmitButton
          disabled={isSubmitting}
          text={buttonText}
          loadingText={loadingText}
          emoji="📌"
          key="submit"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <Stack gap={3}>
        <FormikProvider value={form}>
          <Form>
            <Stack gap={3}>
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
                      {addTaskText}
                    </Button>
                  </>
                )}
              </FieldArray>
              <FormControl variant="standard">
                <Typography variant="h6" component="label">
                  🕰 {doItText}
                </Typography>
                <RadioGroup
                  name="date"
                  value={values.date}
                  aria-labelledby={doItLabelledby}
                  row
                  onChange={onChangeDate}
                >
                  <TooltipArrow title={tooltipTitle}>
                    <FormControlLabel
                      label={todayText}
                      value={todayValue}
                      disabled={todayDisabled}
                      control={<Radio />}
                    />
                  </TooltipArrow>
                  <FormControlLabel
                    label={tomorrowText}
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
            <Stack direction="row" alignItems="center" gap={1}>
              <Paul />
              <Typography variant="h6" component="h3">
                {pittText}
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <PittRules />
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Modal>
  )
}

export default CreateDayModal

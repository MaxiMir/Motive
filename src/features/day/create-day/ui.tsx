import { Stack, Button, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { FieldArray, Form, FormikProvider } from 'formik'
import { useIntl } from 'react-intl'
import { PittRules } from 'entities/characteristic'
import { useDeviceContext } from 'entities/device'
import { TaskField } from 'entities/task'
import { CalendarDto } from 'shared/api'
import { FRONTEND_ID } from 'shared/config'
import Accordion from 'shared/ui/accordion'
import CancelButton from 'shared/ui/cancel-button'
import Icon from 'shared/ui/icon'
import { Pitt } from 'shared/ui/icons'
import Modal from 'shared/ui/modal'
import SubmitButton from 'shared/ui/submit-button'
import { getInitialDate } from './lib'
import { useCreateDayForm } from './model'

interface CreateDayModalProps {
  goalId: number
  calendar: CalendarDto
  onClose: () => void
}

function CreateDayModal({ goalId, calendar, onClose }: CreateDayModalProps) {
  const { formatMessage } = useIntl()
  const { isMobile } = useDeviceContext()
  const initialDate = getInitialDate(calendar)
  const form = useCreateDayForm(goalId, initialDate, onClose)
  const { isSubmitting, values, setFieldValue, handleSubmit } = form
  const title = formatMessage({ id: 'page.user.modal-tasks.title' })
  const addTaskText = formatMessage({ id: 'common.task-add' })
  const buttonText = formatMessage({ id: 'common.create' })
  const loadingText = formatMessage({ id: 'common.creating' })
  const dateLabel = formatMessage({ id: 'common.date' })
  const pittText = formatMessage({ id: 'page.user.modal-tasks.pitt' })
  const tasksHeader = formatMessage({ id: 'common.days-tasks' })

  const onChangeDate = (date: Date | null) => {
    if (!date) return

    setFieldValue('date', date)
  }

  return (
    <Modal
      title={title}
      fullScreen={isMobile}
      actions={[
        <CancelButton key="cancel" onClick={onClose} />,
        <SubmitButton
          text={buttonText}
          loadingText={loadingText}
          isLoading={isSubmitting}
          key="submit"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <Stack height="100%" justifyContent="space-between" gap={3}>
        <FormikProvider value={form}>
          <Form>
            <Stack gap={2}>
              <DatePicker
                label={dateLabel}
                value={values.date}
                disablePast
                views={['day']}
                renderInput={(inputProps) => (
                  <TextField size="small" {...inputProps} variant="outlined" />
                )}
                shouldDisableDate={(value) => initialDate === value.toISOString()}
                onChange={onChangeDate}
              />
              <Typography variant="h6" component="p">
                <Icon name="assignment" color="error.light" /> {tasksHeader}
              </Typography>
              <FieldArray name="tasks">
                {({ push, remove }) => (
                  <>
                    {values.tasks.map((task, index) => (
                      <TaskField
                        task={task}
                        date={values.date}
                        index={index}
                        taskCount={values.tasks.length}
                        key={task[FRONTEND_ID]}
                        setFieldValue={setFieldValue}
                        onRemove={() => remove(index)}
                      />
                    ))}
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ alignSelf: 'baseline' }}
                      startIcon={<Icon name="add" />}
                      onClick={() => {
                        push({ [FRONTEND_ID]: crypto.randomUUID(), name: '', date: undefined })
                      }}
                    >
                      {addTaskText}
                    </Button>
                  </>
                )}
              </FieldArray>
            </Stack>
          </Form>
        </FormikProvider>
        <Accordion
          iconStart={<Icon name="crisis_alert" color="error.main" />}
          summary={pittText}
          iconEnd={<Pitt />}
          details={<PittRules />}
        />
      </Stack>
    </Modal>
  )
}

export default CreateDayModal

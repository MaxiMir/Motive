import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Button,
  FormControl,
  FormLabel,
} from '@mui/material'
import { FieldArray, Form, FormikProvider } from 'formik'
import { ChangeEvent, useId } from 'react'
import { useIntl } from 'react-intl'
import { PittRules } from 'entities/characteristic'
import { useDetectMobile } from 'entities/device'
import { TaskField } from 'entities/task'
import { FRONTEND_ID } from 'shared/config'
import { getMidnightISO, getTomorrowISO } from 'shared/lib/utils'
import Accordion from 'shared/ui/Accordion'
import CancelButton from 'shared/ui/CancelButton'
import Icon from 'shared/ui/Icon'
import { Pitt } from 'shared/ui/icons'
import Modal from 'shared/ui/Modal'
import SubmitButton from 'shared/ui/SubmitButton'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { useCreateDayForm } from './model'

interface CreateDayModalProps {
  goalId: number
  dayDate: string
  onClose: () => void
}

function CreateDayModal({ goalId, dayDate, onClose }: CreateDayModalProps) {
  const { formatMessage } = useIntl()
  const labelId = useId()
  const mobile = useDetectMobile()
  const form = useCreateDayForm(goalId, onClose)
  const { isSubmitting, values, setFieldValue, handleSubmit } = form
  const todayValue = getMidnightISO()
  const tomorrowValue = getTomorrowISO()
  const todayDisabled = todayValue === dayDate
  const title = formatMessage({ id: 'page.user.modal-tasks.title' })
  const addTaskText = formatMessage({ id: 'common.task-add' })
  const buttonText = formatMessage({ id: 'common.create' })
  const loadingText = formatMessage({ id: 'common.creating' })
  const doItText = formatMessage({ id: 'page.user.modal-tasks.do-it' })
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
      fullScreen={mobile}
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
            <Stack gap={3}>
              <FieldArray name="tasks">
                {({ push, remove }) => (
                  <>
                    {values.tasks.map((task, index) => (
                      <TaskField
                        taskCount={values.tasks.length}
                        date={values.date}
                        remind={task.date}
                        index={index}
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
              <FormControl variant="standard">
                <FormLabel id={labelId}>{doItText}</FormLabel>
                <RadioGroup
                  name="date"
                  value={values.date}
                  aria-labelledby={labelId}
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

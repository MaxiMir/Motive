import { Box, Stack, Typography, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { Form, FormikProvider } from 'formik'
import { ChangeEvent } from 'react'
import { useIntl } from 'react-intl'
import { GoalDto } from 'shared/api'
import Accordion from 'shared/ui/Accordion'
import CancelButton from 'shared/ui/CancelButton'
import Icon from 'shared/ui/Icon'
import Modal from 'shared/ui/Modal'
import SubmitButton from 'shared/ui/SubmitButton'
import { useCreateMemberForm } from './model'

interface CreateMemberModalProps {
  goal: GoalDto
  onClose: () => void
}

function CreateMemberModal({ goal, onClose }: CreateMemberModalProps) {
  const { id, day, calendar, owner } = goal
  const { formatMessage } = useIntl()
  const beginningDay = calendar[0].id
  const disableBeginning = beginningDay === day.id
  const form = useCreateMemberForm(id, beginningDay, onClose)
  const { isSubmitting, values, setFieldValue, handleSubmit } = form
  const title = formatMessage({ id: 'page.user.modal-join.title' })
  const buttonText = formatMessage({ id: 'common.join' })
  const loadingText = formatMessage({ id: 'common.joining' })
  const beginLabel = formatMessage({ id: 'page.user.modal-join.begin-label' })
  const dayLabel = formatMessage({ id: 'page.user.modal-join.day-label' })
  const accordionHeader = formatMessage({ id: 'page.user.modal-join.accordion-header' })
  const accordingRate = formatMessage({ id: 'page.user.modal-join.according-rate' })
  const accordingSupport = formatMessage({ id: 'page.user.modal-join.according-support' })
  const accordingNeeded = formatMessage({ id: 'page.user.modal-join.according-needed' })
  const accordingQuestions = formatMessage({ id: 'page.user.modal-join.according-questions' })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldValue('dayId', e.currentTarget.value)
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
          emoji="📬"
          key="submit"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <Stack gap={1}>
        <FormikProvider value={form}>
          <Form>
            <RadioGroup name="dayId" value={values.dayId?.toString()} onChange={onChange}>
              <FormControlLabel
                value={disableBeginning ? 'none' : beginningDay.toString()}
                label={
                  <Stack direction="row" gap={1}>
                    {beginLabel} 🗻
                  </Stack>
                }
                disabled={isSubmitting || disableBeginning}
                control={<Radio />}
              />
              <FormControlLabel
                value={day.id.toString()}
                label={
                  <Stack direction="row" gap={1}>
                    {dayLabel} 🌋
                  </Stack>
                }
                disabled={isSubmitting}
                control={<Radio />}
              />
            </RadioGroup>
          </Form>
        </FormikProvider>
        <Accordion
          id="tips"
          header={accordionHeader}
          icon={<Icon name="diversity_2" color="primary.dark" />}
          details={
            <Box color="zen.silent">
              <Typography>&#9679; {accordingRate}.</Typography>
              <Typography>
                &#9679; {accordingSupport}{' '}
                <Box component="span" color="support.main">
                  {owner.name}
                </Box>
                {accordingNeeded}.
              </Typography>
              <Typography>&#9679; {accordingQuestions} 💬.</Typography>
            </Box>
          }
        />
      </Stack>
    </Modal>
  )
}

export default CreateMemberModal

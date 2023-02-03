import { Box, Stack, Typography, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { Form, FormikProvider } from 'formik'
import { ChangeEvent } from 'react'
import { CalendarDto } from 'shared/api'
import Accordion from 'shared/ui/Accordion'
import CancelButton from 'shared/ui/CancelButton'
import Modal from 'shared/ui/Modal'
import SubmitButton from 'shared/ui/SubmitButton'
import { useMessages } from './lib'
import { useCreateMemberForm } from './model'

interface CreateMemberModalProps {
  goalId: number
  dayId: number
  calendar: CalendarDto[]
  ownerName: string
  onClose: () => void
}

function CreateMemberModal({
  goalId,
  dayId,
  calendar,
  ownerName,
  onClose,
}: CreateMemberModalProps) {
  const messages = useMessages()
  const beginningDay = calendar[0].id
  const disableBeginning = beginningDay === dayId
  const form = useCreateMemberForm(goalId, beginningDay)
  const { isSubmitting, values, setFieldValue, handleSubmit } = form

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldValue('dayId', e.currentTarget.value)
  }

  return (
    <Modal
      title={
        <>
          {messages.title}{' '}
          <Box component="span" color="zen.sand">
            {messages.subtitle}
          </Box>
          ?
        </>
      }
      maxWidth="xs"
      actions={[
        <CancelButton key="cancel" onClick={onClose} />,
        <SubmitButton
          disabled={isSubmitting}
          text={messages.buttonText}
          loadingText={messages.loadingText}
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
                    {messages.beginLabel} 🗻
                  </Stack>
                }
                disabled={isSubmitting || disableBeginning}
                control={<Radio />}
              />
              <FormControlLabel
                value={dayId.toString()}
                label={
                  <Stack direction="row" gap={1}>
                    {messages.dayLabel} 🌋
                  </Stack>
                }
                disabled={isSubmitting}
                control={<Radio />}
              />
            </RadioGroup>
          </Form>
        </FormikProvider>
        <Accordion
          emoji="🪢"
          header={messages.accordionHeader}
          id="tips"
          details={
            <Box color="zen.silent">
              <Typography>&#9679; {messages.accordingMotivation}.</Typography>
              <Typography>&#9679; {messages.accordingCreative}.</Typography>
              <Typography>
                &#9679; {messages.accordingSupport}{' '}
                <Box component="span" color="support.main">
                  {ownerName}
                </Box>
                {', '}
                {messages.accordingNeeded}.
              </Typography>
              <Typography>&#9679; {messages.accordingQuestions} 💬.</Typography>
            </Box>
          }
        />
      </Stack>
    </Modal>
  )
}

export default CreateMemberModal

import { ChangeEvent } from 'react'
import { Form, FormikProvider } from 'formik'
import { Box, Stack, Typography, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { useGoalContext } from '@pages/user/components/GoalCurrent/hooks/useGoalContext'
import Modal from '@ui/Modal'
import Emoji from '@ui/Emoji'
import Accordion from '@ui/Accordion'
import DecorEmoji from '@ui/DecorEmoji'
import SubmitButton from '@ui/SubmitButton'
import CancelButton from '@ui/CancelButton'
import { useMessages } from './hooks/useMessages'
import { useForm } from './hooks/useForm'

interface JoinModalProps {
  onClose: () => void
}

function JoinModal({ onClose }: JoinModalProps) {
  const messages = useMessages()
  const { id, calendar, day, owner } = useGoalContext()
  const beginningDay = calendar[0].id
  const thisDay = day.id
  const disableBeginning = beginningDay === thisDay
  const form = useForm(id, beginningDay)
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
          emoji="join"
          key="submit"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <Stack spacing={1}>
        <FormikProvider value={form}>
          <Form>
            <RadioGroup name="dayId" value={values.dayId?.toString()} onChange={onChange}>
              <FormControlLabel
                value={disableBeginning ? 'none' : beginningDay.toString()}
                label={
                  <Stack direction="row" spacing={1}>
                    {messages.beginLabel} <Emoji name="serenity" onlyEmoji />
                  </Stack>
                }
                disabled={isSubmitting || disableBeginning}
                control={<Radio />}
              />
              <FormControlLabel
                value={thisDay.toString()}
                label={
                  <Stack direction="row" spacing={1}>
                    {messages.dayLabel} <Emoji name="blast" onlyEmoji />
                  </Stack>
                }
                disabled={isSubmitting}
                control={<Radio />}
              />
            </RadioGroup>
          </Form>
        </FormikProvider>
        <Accordion
          name="knot"
          header={messages.accordionHeader}
          id="tips"
          details={
            <Box color="zen.silent">
              <Typography>&#9679; {messages.accordingMotivation}.</Typography>
              <Typography>&#9679; {messages.accordingCreative}.</Typography>
              <Typography>
                &#9679; {messages.accordingSupport}{' '}
                <Box component="span" color="support.main">
                  {owner.name}
                </Box>
                {', '}
                {messages.accordingNeeded}.
              </Typography>
              <Typography>
                &#9679; {messages.accordingQuestions} <DecorEmoji name="discussion" />.
              </Typography>
            </Box>
          }
        />
      </Stack>
    </Modal>
  )
}

export default JoinModal

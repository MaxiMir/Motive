import { ChangeEvent } from 'react'
import { Form, FormikProvider } from 'formik'
import { Box, Stack, Typography, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks/useGoalContext'
import AppModal from '@ui/AppModal'
import AppEmoji from '@ui/AppEmoji'
import AppAccordion from '@ui/AppAccordion'
import AppDecorEmoji from '@ui/AppDecorEmoji'
import ActionSubmit from '@components/Action/ActionSubmit'
import ActionCancel from '@components/Action/ActionCancel/ActionCancel'
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
    <AppModal
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
        <ActionCancel key="cancel" onClick={onClose} />,
        <ActionSubmit
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
      <FormikProvider value={form}>
        <Form>
          <RadioGroup name="dayId" value={values.dayId?.toString()} onChange={onChange}>
            <FormControlLabel
              value={disableBeginning ? 'none' : beginningDay.toString()}
              label={
                <Stack direction="row" spacing={1}>
                  {messages.beginLabel} <AppEmoji name="serenity" onlyEmoji />
                </Stack>
              }
              disabled={isSubmitting || disableBeginning}
              control={<Radio />}
            />
            <FormControlLabel
              value={thisDay.toString()}
              label={
                <Stack direction="row" spacing={1}>
                  {messages.dayLabel} <AppEmoji name="blast" onlyEmoji />
                </Stack>
              }
              disabled={isSubmitting}
              control={<Radio />}
            />
          </RadioGroup>
          <Box>
            <AppAccordion
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
                    &#9679; {messages.accordingQuestions} <AppDecorEmoji name="discussion" />.
                  </Typography>
                </Box>
              }
            />
          </Box>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

export default JoinModal

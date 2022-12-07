import { ChangeEvent } from 'react'
import { Form, FormikProvider } from 'formik'
import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { useGoalContext } from '@features/user/components/GoalCurrent/hooks'
import ActionSubmit from '@components/Action/ActionSubmit'
import ActionCancel from '@components/Action/ActionCancel/ActionCancel'
import AppModal from '@ui/AppModal/AppModal'
import AppEmoji from '@ui/AppEmoji'
import AppAccordion from '@ui/AppAccordion'
import AppDecorEmoji from '@ui/AppDecorEmoji'
import { useForm, useMessages } from './hooks'

interface ModalJoinProps {
  onClose: () => void
}

function ModalJoin({ onClose }: ModalJoinProps) {
  const { id, calendar, day, owner } = useGoalContext()
  const messages = useMessages()
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
          <Box component="span" sx={{ color: 'zen.sand' }}>
            {messages.subtitle}
          </Box>
          ?
        </>
      }
      maxWidth="xs"
      actions={[
        <ActionCancel onClick={onClose} />,
        <ActionSubmit
          disabled={isSubmitting}
          text={messages.buttonText}
          loadingText={messages.loadingText}
          emoji="join"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form autoComplete="off">
          <RadioGroup name="dayId" value={values.dayId?.toString()} onChange={onChange}>
            <FormControlLabel
              value={disableBeginning ? 'none' : beginningDay.toString()}
              label={
                <Box display="flex" gap={1}>
                  {messages.beginLabel} <AppEmoji name="serenity" onlyEmoji />
                </Box>
              }
              disabled={isSubmitting || disableBeginning}
              control={<Radio />}
            />
            <FormControlLabel
              value={thisDay.toString()}
              label={
                <Box display="flex" gap={1}>
                  {messages.dayLabel} <AppEmoji name="blast" onlyEmoji />
                </Box>
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
              ariaControls={messages.ariaControls}
              details={
                <Box sx={{ color: 'zen.silent' }}>
                  <Typography>&#9679; {messages.accordingMotivation}.</Typography>
                  <Typography>&#9679; {messages.accordingCreative}.</Typography>
                  <Typography>
                    &#9679; {messages.accordingSupport}{' '}
                    <Box component="span" sx={{ color: 'support.main' }}>
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

export default ModalJoin

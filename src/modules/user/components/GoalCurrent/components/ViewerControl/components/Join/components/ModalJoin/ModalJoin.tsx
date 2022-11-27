import { ChangeEvent } from 'react'
import { Form, FormikProvider } from 'formik'
import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import { GoalDto } from '@dto'
import ActionSubmit from '@components/Action/ActionSubmit'
import ActionCancel from '@components/Action/ActionCancel'
import AppModal from '@ui/AppModal'
import AppEmoji from '@ui/AppEmoji'
import AppAccordion from '@ui/AppAccordion'
import AppDecorEmoji from '@ui/AppDecorEmoji'
import useForm from './hook'

interface ModalJoinProps {
  goal: GoalDto
  onClose: () => void
}

export default function ModalJoin({ goal, onClose }: ModalJoinProps) {
  const { formatMessage } = useIntl()
  const { id, calendar, day } = goal
  const beginningDay = calendar[0].id
  const thisDay = day.id
  const disableBeginning = beginningDay === thisDay
  const form = useForm(id, beginningDay)
  const { isSubmitting, values, setFieldValue, handleSubmit } = form
  const title = formatMessage({ id: 'page.user.modal-join.title' })
  const subtitle = formatMessage({ id: 'page.user.modal-join.subtitle' })
  const buttonText = formatMessage({ id: 'common.join' })
  const loadingText = formatMessage({ id: 'common.joining' })
  const beginLabel = formatMessage({ id: 'page.user.modal-join.begin-label' })
  const dayLabel = formatMessage({ id: 'page.user.modal-join.day-label' })
  const accordionHeader = formatMessage({ id: 'page.user.modal-join.accordion-header' })
  const ariaControls = formatMessage({ id: 'page.user.modal-join.aria' })
  const accordingMotivation = formatMessage({ id: 'page.user.modal-join.according-motivation' })
  const accordingCreative = formatMessage({ id: 'page.user.modal-join.according-creative' })
  const accordingSupport = formatMessage({ id: 'page.user.modal-join.according-support' })
  const accordingNeeded = formatMessage({ id: 'page.user.modal-join.according-needed' })
  const accordingQuestions = formatMessage({ id: 'page.user.modal-join.according-questions' })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldValue('dayId', e.currentTarget.value)
  }

  return (
    <AppModal
      title={
        <>
          {title}{' '}
          <Box component="span" sx={{ color: 'zen.sand' }}>
            {subtitle}
          </Box>
          ?
        </>
      }
      maxWidth="xs"
      actions={[
        <ActionCancel onClick={onClose} />,
        <ActionSubmit
          disabled={isSubmitting}
          text={buttonText}
          loadingText={loadingText}
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
                  {beginLabel} <AppEmoji name="serenity" onlyEmoji />
                </Box>
              }
              disabled={isSubmitting || disableBeginning}
              control={<Radio />}
            />
            <FormControlLabel
              value={thisDay.toString()}
              label={
                <Box display="flex" gap={1}>
                  {dayLabel} <AppEmoji name="blast" onlyEmoji />
                </Box>
              }
              disabled={isSubmitting}
              control={<Radio />}
            />
          </RadioGroup>
          <Box>
            <AppAccordion
              name="knot"
              header={accordionHeader}
              id="tips"
              ariaControls={ariaControls}
              details={
                <Box sx={{ color: 'zen.silent' }}>
                  <Typography>&#9679; {accordingMotivation}.</Typography>
                  <Typography>&#9679; {accordingCreative}.</Typography>
                  <Typography>
                    &#9679; {accordingSupport}{' '}
                    <Box component="span" sx={{ color: 'support.main' }}>
                      {goal.owner.name}
                    </Box>
                    {', '}
                    {accordingNeeded}.
                  </Typography>
                  <Typography>
                    &#9679; {accordingQuestions} <AppDecorEmoji name="discussion" />.
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

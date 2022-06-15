import { ChangeEvent } from 'react'
import { Form, FormikProvider } from 'formik'
import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { GoalDto } from 'dto'
import useLocale from 'hooks/useLocale'
import ActionSubmit from 'components/Action/ActionSubmit'
import ActionClose from 'components/Action/ActionClose'
import AppModal from 'components/UI/AppModal'
import AppEmoji from 'components/UI/AppEmoji'
import AppAccordion from 'components/UI/AppAccordion'
import AppDecorEmoji from 'components/UI/AppDecorEmoji'
import useForm from './hook'
import i18n from './i18n'

export interface ModalJoinProps {
  goal: GoalDto
  onClose: () => void
}

export default function ModalJoin({ goal, onClose }: ModalJoinProps) {
  const { locale } = useLocale()
  const { id, calendar, day } = goal
  const beginningDay = calendar[0].id
  const thisDay = day.id
  const disableBeginning = beginningDay === thisDay
  const form = useForm(id, beginningDay)
  const { isSubmitting, values, setFieldValue, handleSubmit } = form
  const {
    title,
    subtitle,
    button,
    buttonLoading,
    beginLabel,
    dayLabel,
    accordionHeader,
    ariaControls,
    accordionDetails,
  } = i18n[locale]

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
        <ActionClose onClick={onClose} />,
        <ActionSubmit
          isLoading={isSubmitting}
          name={button}
          nameLoading={buttonLoading}
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
                  <Typography>
                    {accordionDetails[0]} <AppDecorEmoji name="motivation" /> {accordionDetails[1]}.
                  </Typography>
                  <Typography>
                    {accordionDetails[2]} <AppDecorEmoji name="creativity" /> {accordionDetails[3]}.
                  </Typography>
                  <Typography>
                    {accordionDetails[4]}{' '}
                    <Box component="span" sx={{ color: 'support.main' }}>
                      {goal.owner.name}
                    </Box>{' '}
                    {accordionDetails[5]}.
                  </Typography>
                  <Typography>
                    {accordionDetails[6]} <AppDecorEmoji name="discussion" />.
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

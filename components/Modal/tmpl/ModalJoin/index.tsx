import { ChangeEvent } from 'react'
import { Form, FormikProvider } from 'formik'
import { Box, FormControlLabel, Radio, RadioGroup, Typography, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { GoalDto } from 'dto'
import useLocale from 'hooks/useLocale'
import Action from 'components/Action'
import AppModal from 'components/UI/AppModal'
import AppEmoji from 'components/UI/AppEmoji'
import AppAccordion from 'components/UI/AppAccordion'
import AppDecorEmoji from 'components/UI/AppDecorEmoji'
import useForm from './hook'
import i18n from './i18n'

export interface ModalJoinProps {
  tmpl: 'join'
  goal: GoalDto
  onClose: () => void
}

export default function ModalJoin({ goal, onClose }: ModalJoinProps): JSX.Element {
  const classes = useStyles()
  const { locale } = useLocale()
  const { id, calendar, day } = goal
  const beginningDay = calendar[0].id
  const thisDay = day.id
  const disableBeginning = beginningDay === thisDay
  const form = useForm(id, beginningDay)
  const { isSubmitting, values, setFieldValue, handleSubmit } = form
  const { title, subtitle, button, buttonLoading, beginLabel, dayLabel, accordionHeader, ariaControls, details } =
    i18n[locale]

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldValue('dayId', e.currentTarget.value)
  }

  return (
    <AppModal
      title={
        <>
          {title} <span className={classes.start}>{subtitle}</span>?
        </>
      }
      maxWidth="xs"
      actions={[
        <Action tmpl="close" onClick={onClose} />,
        <Action
          tmpl="submit"
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
              control={<Radio />}
              disabled={isSubmitting || disableBeginning}
              label={
                <Box display="flex" gap={1}>
                  {beginLabel} <AppEmoji name="serenity" onlyEmoji />
                </Box>
              }
            />
            <FormControlLabel
              value={thisDay.toString()}
              control={<Radio />}
              disabled={isSubmitting}
              label={
                <Box display="flex" gap={1}>
                  {dayLabel} <AppEmoji name="blast" onlyEmoji />
                </Box>
              }
            />
          </RadioGroup>
          <div>
            <AppAccordion
              name="knot"
              header={accordionHeader}
              id="tips"
              ariaControls={ariaControls}
              details={
                <div className={classes.hint}>
                  <Typography>
                    {details[0]} <AppDecorEmoji name="motivation" /> {details[1]}.
                  </Typography>
                  <Typography>
                    {details[2]} <AppDecorEmoji name="creativity" /> {details[3]}.
                  </Typography>
                  <Typography>
                    {details[4]} <span className={classes.owner}>{goal.owner.name}</span> {details[5]}.
                  </Typography>
                  <Typography>
                    {details[6]} <AppDecorEmoji name="discussion" />.
                  </Typography>
                </div>
              }
            />
          </div>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    start: {
      color: theme.palette.zen.sand,
    },
    owner: {
      color: theme.palette.support.main,
    },
    hint: {
      color: theme.palette.zen.silent,
    },
  }),
)

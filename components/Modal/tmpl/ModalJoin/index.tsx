import { ChangeEvent } from 'react'
import { Form, FormikProvider } from 'formik'
import { FormControlLabel, Radio, RadioGroup, Typography, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { GoalDto } from 'dto'
import Action from 'components/Action'
import AppModal from 'components/UI/AppModal'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'
import AppAccordion from 'components/UI/AppAccordion'
import AppDecorEmoji from 'components/UI/AppDecorEmoji'
import useForm from './hook'

export interface ModalJoinProps {
  tmpl: 'join'
  goal: GoalDto
  onClose: () => void
}

export default function ModalJoin({ goal, onClose }: ModalJoinProps): JSX.Element {
  const classes = useStyles()
  const { id, calendar, day } = goal
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
          Where do we <span className={classes.start}>start</span> from?
        </>
      }
      maxWidth="xs"
      actions={[
        <Action tmpl="close" onClick={onClose} />,
        <Action
          tmpl="submit"
          isLoading={isSubmitting}
          name="Join"
          nameLoading="Joining"
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
                <AppBox gap={1}>
                  The beginning <AppEmoji name="serenity" onlyEmoji />
                </AppBox>
              }
            />
            <FormControlLabel
              value={thisDay.toString()}
              control={<Radio />}
              disabled={isSubmitting}
              label={
                <AppBox gap={1}>
                  This day <AppEmoji name="blast" onlyEmoji />
                </AppBox>
              }
            />
          </RadioGroup>
          <div>
            <AppAccordion
              name="knot"
              header="Membership"
              id="tips"
              ariaControls="about-membership"
              details={
                <div className={classes.hint}>
                  <Typography>
                    Click <AppDecorEmoji name="motivation" /> for days that are motivating.
                  </Typography>
                  <Typography>
                    Click <AppDecorEmoji name="creativity" /> for days with creative tasks.
                  </Typography>
                  <Typography>
                    Support <span className={classes.owner}>{goal.owner.name}</span> when needed.
                  </Typography>
                  <Typography>
                    Ask questions in the discussion <AppDecorEmoji name="discussion" />.
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
      color: theme.text.sand,
    },
    owner: {
      color: theme.characteristic.support.main,
    },
    hint: {
      color: theme.text.silent,
    },
  }),
)

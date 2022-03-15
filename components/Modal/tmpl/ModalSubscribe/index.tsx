import { ChangeEvent } from 'react'
import { Form, FormikProvider } from 'formik'
import { createStyles, FormControlLabel, makeStyles, Radio, RadioGroup } from '@material-ui/core'
import { GoalDto } from 'dto'
import Action from 'components/Action'
import AppModal from 'components/UI/AppModal'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'
import AppAccordion from 'components/UI/AppAccordion'
import AppTypography from 'components/UI/AppTypography'
import AppDecorEmoji from 'components/UI/AppDecorEmoji'
import useForm from './hook'

export interface ModalSubscribeProps {
  tmpl: 'subscribe'
  goal: GoalDto
  onClose: () => void
}

export default function ModalSubscribe({ goal, onClose }: ModalSubscribeProps): JSX.Element {
  const classes = useStyles()
  const { calendar, day } = goal
  const beginningDay = calendar[0].id
  const thisDay = day.id
  const oneDayGoal = calendar.length === 1
  const form = useForm(goal)
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
          emoji="subscribe"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form autoComplete="off">
          <RadioGroup name="dayId" value={values.dayId.toString()} onChange={onChange}>
            <FormControlLabel
              value={oneDayGoal ? 'none' : beginningDay.toString()}
              control={<Radio />}
              disabled={isSubmitting || oneDayGoal}
              label={
                <AppBox spacing={1}>
                  The beginning <AppEmoji name="serenity" onlyEmoji />
                </AppBox>
              }
            />
            <FormControlLabel
              value={thisDay.toString()}
              control={<Radio />}
              disabled={isSubmitting}
              label={
                <AppBox spacing={1}>
                  This day <AppEmoji name="blast" onlyEmoji />
                </AppBox>
              }
            />
          </RadioGroup>
          <div>
            <AppAccordion
              name="knot"
              header="About Membership"
              id="tips"
              ariaControls="a-couple-of-important-words"
              details={
                <div className={classes.hint}>
                  <AppTypography>
                    Put <AppDecorEmoji name="motivation" /> days that are motivating.
                  </AppTypography>
                  <AppTypography>
                    Put <AppDecorEmoji name="creativity" /> days with creative tasks.
                  </AppTypography>
                  <AppTypography>
                    Supportive <span className={classes.owner}>{goal.owner.name}</span> when needed.
                  </AppTypography>
                  <AppTypography>
                    Ask questions in the discussion <AppDecorEmoji name="discussion" />.
                  </AppTypography>
                </div>
              }
            />
          </div>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    start: {
      color: theme.text.sand,
    },
    owner: {
      color: theme.palette.info.main,
    },
    hint: {
      color: theme.text.silent,
    },
  }),
)

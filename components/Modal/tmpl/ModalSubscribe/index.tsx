import { ChangeEvent } from 'react'
import { Form, FormikProvider } from 'formik'
import { createStyles, FormControlLabel, makeStyles, Radio, RadioGroup } from '@material-ui/core'
import { GoalDto } from 'dto'
import ModalAction from 'components/ModalAction'
import AppModal from 'components/UI/AppModal'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'
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
  const { isLoading, formik } = useForm(goal)
  const { values, setFieldValue, handleSubmit } = formik

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldValue('start', e.currentTarget.value)
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
        <ModalAction tmpl="close" onClick={onClose} />,
        <ModalAction
          tmpl="submit"
          isLoading={isLoading}
          name="Join"
          nameLoading="Joining"
          emoji="subscribe"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={formik}>
        <Form autoComplete="off">
          <RadioGroup name="start" value={values.start.toString()} onChange={onChange}>
            <FormControlLabel
              value={oneDayGoal ? 'none' : beginningDay.toString()}
              control={<Radio />}
              disabled={isLoading || oneDayGoal}
              label={
                <AppBox spacing={1}>
                  The beginning <AppEmoji name="serenity" onlyEmoji />
                </AppBox>
              }
            />
            <FormControlLabel
              value={thisDay.toString()}
              control={<Radio />}
              disabled={isLoading}
              label={
                <AppBox spacing={1}>
                  This day <AppEmoji name="blast" onlyEmoji />
                </AppBox>
              }
            />
          </RadioGroup>
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
  }),
)

import { Field, Form, FormikProvider } from 'formik'
import { Typography, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { GoalDto, UserBaseDto } from 'dto'
import Action from 'components/Action'
import AppModal from 'components/UI/AppModal'
import AppBox from 'components/UI/AppBox'
import AppFadeIcon from 'components/UI/AppFadeIcon'
import AppInput from 'components/UI/AppInput'
import AppAccordion from 'components/UI/AppAccordion'
import AppDecorEmoji from 'components/UI/AppDecorEmoji'
import useForm from './hook'

export interface ModalSupportProps {
  tmpl: 'support'
  goal: GoalDto
  owner: UserBaseDto
  onClose: () => void
}

export default function ModalSupport({ goal, owner, onClose }: ModalSupportProps): JSX.Element {
  const classes = useStyles()
  const form = useForm(goal, onClose)
  const { isSubmitting, handleSubmit } = form

  return (
    <AppModal
      title={
        <>
          Support <span className={classes.owner}>{owner.name}</span>
        </>
      }
      maxWidth="xs"
      actions={[
        <Action tmpl="close" onClick={onClose} />,
        <Action
          tmpl="submit"
          isLoading={isSubmitting}
          name="Support"
          nameLoading="Adding"
          emoji="support"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form autoComplete="off">
          <AppBox flexDirection="column" alignItems="center" gap={3}>
            <AppFadeIcon name="support" />
            <Field name="text" label="Your message" color="secondary" multiline rows={3} component={AppInput} />
            <div className={classes.accordionWrap}>
              <AppAccordion
                name="helmet"
                header="Support"
                id="support"
                ariaControls="about-support-content"
                details={
                  <div className={classes.hint}>
                    <Typography>
                      Support is very important for achieving goals.
                      <AppDecorEmoji name="goal" />.
                    </Typography>
                    <Typography>
                      Especially at times when you want to give up
                      <AppDecorEmoji name="tired" />.
                    </Typography>
                    <Typography>Therefore support others:</Typography>
                    <Typography>&#9679; with advice;</Typography>
                    <Typography>&#9679; with words of encouragement.</Typography>
                  </div>
                }
              />
            </div>
          </AppBox>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      alignSelf: 'baseline',
      textTransform: 'none',
    },
    accordionWrap: {
      width: '100%',
    },
    owner: {
      color: theme.text.sand,
    },
    hint: {
      color: theme.text.silent,
    },
  }),
)

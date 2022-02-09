import { Field, Form, FormikProvider } from 'formik'
import { createStyles, makeStyles } from '@material-ui/core'
import { GoalDto, UserBaseDto } from 'dto'
import ModalAction from 'components/ModalAction'
import AppModal from 'components/UI/AppModal'
import AppBox from 'components/UI/AppBox'
import AppFadeIcon from 'components/UI/AppFadeIcon'
import AppInput from 'components/UI/AppInput'
import AppTypography from 'components/UI/AppTypography'
import AppAccordion from 'components/UI/AppAccordion'
import AppEmoji from 'components/UI/AppEmoji'
import useForm from './hook'

export interface ModalSupportProps {
  tmpl: 'support'
  goal: GoalDto
  owner: UserBaseDto
  onClose: () => void
}

export default function ModalSupport({ goal, owner, onClose }: ModalSupportProps): JSX.Element {
  const classes = useStyles()
  const { isLoading, formik } = useForm(goal, onClose)
  const { handleSubmit } = formik

  return (
    <AppModal
      title={
        <>
          Support <span className={classes.owner}>{owner.name}</span>
        </>
      }
      maxWidth="xs"
      actions={[
        <ModalAction tmpl="close" onClick={onClose} />,
        <ModalAction
          tmpl="submit"
          isLoading={isLoading}
          name="Support"
          nameLoading="Adding"
          emoji="support"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={formik}>
        <Form autoComplete="off">
          <AppBox flexDirection="column" alignItems="center" spacing={3}>
            <AppFadeIcon name="support" />
            <Field name="text" label="Your message" color="secondary" multiline rows={3} component={AppInput} />
            <div className={classes.accordionWrap}>
              <AppAccordion
                name="feedback"
                header="About Support"
                id="support"
                ariaControls="about-support-content"
                details={
                  <div className={classes.hint}>
                    <AppTypography>
                      Support is very important for achieving goals <AppEmoji name="goal" onlyEmoji />.
                    </AppTypography>
                    <AppTypography>
                      Especially at times when you want to give up <AppEmoji name="tired" onlyEmoji />.
                    </AppTypography>
                    <AppTypography>Therefore support others:</AppTypography>
                    <AppTypography>&#9679; with advice;</AppTypography>
                    <AppTypography>&#9679; with words of encouragement.</AppTypography>
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

const useStyles = makeStyles((theme) =>
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

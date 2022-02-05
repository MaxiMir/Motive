import { Field, Form, FormikProvider } from 'formik'
import { createStyles, makeStyles } from '@material-ui/core'
import { UserBaseDto } from 'dto'
import ModalAction from 'components/ModalAction'
import AppModal from 'components/UI/AppModal'
import AppBox from 'components/UI/AppBox'
import AppFadeIcon from 'components/UI/AppFadeIcon'
import AppInput from 'components/UI/AppInput'
import AppTypography from 'components/UI/AppTypography'
import AppAccordion from 'components/UI/AppAccordion'
import useForm from './hook'

export interface ModalSupportProps {
  tmpl: 'support'
  owner: UserBaseDto
  onClose: () => void
}

export default function ModalSupport({ owner, onClose }: ModalSupportProps): JSX.Element {
  const classes = useStyles()
  const { isLoading, formik } = useForm(onClose)
  const { handleSubmit } = formik

  return (
    <AppModal
      title={
        <>
          Support for <span className={classes.owner}>{owner.name}</span>
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
            <Field name="support" label="Your message" color="secondary" multiline rows={3} component={AppInput} />
            <AppAccordion
              name="pencil"
              header="About Support"
              id="support"
              ariaControls="about-support-content"
              details={
                <div>
                  <AppTypography className={classes.hint}>
                    We recommend to divide large goals into stages.
                  </AppTypography>
                  <AppTypography className={classes.hint}>Add each stage in the field above.</AppTypography>
                </div>
              }
            />
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
    owner: {
      color: theme.text.sand,
    },
    hint: {
      color: theme.text.silent,
    },
  }),
)

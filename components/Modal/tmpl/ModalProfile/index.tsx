import { Field, Form, FormikProvider } from 'formik'
import { createStyles, makeStyles } from '@material-ui/core'
import { UserBaseDto } from 'dto'
import Action from 'components/Action'
import Photo from 'components/Photo'
import AppModal from 'components/UI/AppModal'
import AppInput from 'components/UI/AppInput'
import AppBox from 'components/UI/AppBox'
import useForm from './hook'

export interface ModalProfileProps {
  tmpl: 'profile'
  user: UserBaseDto
  onClose: () => void
}

export default function ModalProfile({ user, onClose }: ModalProfileProps): JSX.Element {
  const classes = useStyles()
  const form = useForm(user, onClose)
  const { isSubmitting, values, setFieldValue, handleSubmit } = form

  const setAvatar = (files: File[]) => setFieldValue('avatar', files[0])

  const clearAvatar = () => setFieldValue('avatar', null)

  return (
    <AppModal
      title={
        <>
          Edit <span className={classes.profile}>profile</span>
        </>
      }
      maxWidth="xs"
      actions={[
        <Action tmpl="close" onClick={onClose} />,
        <Action
          tmpl="submit"
          isLoading={isSubmitting}
          name="Save"
          nameLoading="Saving"
          emoji="followers"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form autoComplete="off">
          <AppBox flexDirection="column" spacing={3}>
            <Field name="name" label="Name" color="secondary" component={AppInput} />
            <Field name="nickname" label="Nickname" color="secondary" component={AppInput} />
            {!values.avatar ? (
              <Photo tmpl="input" disabled={isSubmitting} onSelect={setAvatar} />
            ) : (
              <Photo tmpl="button" image={values.avatar} disabled={isSubmitting} onClick={clearAvatar} />
            )}
          </AppBox>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    profile: {
      color: theme.text.sand,
    },
  }),
)

import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Field, Form, FormikProvider } from 'formik'
import { Grid, Box } from '@mui/material'
import { UserBaseDto } from '@dto'
import ActionSubmit from '@components/Action/ActionSubmit'
import ActionCancel from '@components/Action/ActionCancel'
import PhotoInput from '@components/Photo/PhotoInput'
import PhotoButton from '@components/Photo/PhotoButton'
import AppModal from '@ui/AppModal'
import AppInput from '@ui/AppInput'
import useForm from './hook'

const Alert = dynamic(() => import('@mui/material/Alert'))

export interface ModalProfileProps {
  user: UserBaseDto
  onClose: () => void
}

export default function ModalProfile({ user, onClose }: ModalProfileProps) {
  const { formatMessage } = useIntl()
  const form = useForm(user, onClose)
  const { isSubmitting, values, touched, errors, setFieldValue, handleSubmit } = form
  const title = formatMessage({ id: 'page.user.modal-profile.title' })
  const profile = formatMessage({ id: 'page.user.modal-profile.profile' })
  const nameLabel = formatMessage({ id: 'page.user.modal-profile.name' })
  const nicknameLabel = formatMessage({ id: 'page.user.modal-profile.nickname' })
  const buttonText = formatMessage({ id: 'common.save' })
  const buttonLoading = formatMessage({ id: 'common.saving' })

  const setAvatar = (files: File[]) => setFieldValue('avatar', files[0])

  const clearAvatar = () => setFieldValue('avatar', null)

  return (
    <AppModal
      title={
        <>
          {title}{' '}
          <Box component="span" sx={{ color: 'zen.sand' }}>
            {profile}
          </Box>
        </>
      }
      maxWidth="xs"
      actions={[
        <ActionCancel onClick={onClose} />,
        <ActionSubmit
          isLoading={isSubmitting}
          text={buttonText}
          loadingText={buttonLoading}
          emoji="followers"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form autoComplete="off">
          <Box display="flex" flexDirection="column" gap={3}>
            <Field name="name" label={nameLabel} color="primary" component={AppInput} />
            <Field name="nickname" label={nicknameLabel} color="primary" component={AppInput} />
            <Grid container gap={2}>
              <Grid item xs={4}>
                {!values.avatar ? (
                  <PhotoInput disabled={isSubmitting} onSelect={setAvatar} />
                ) : (
                  <PhotoButton image={values.avatar} disabled={isSubmitting} onClick={clearAvatar} />
                )}
              </Grid>
            </Grid>
            {touched.avatar && errors.avatar && (
              <Alert severity="error" variant="outlined" sx={{ width: '100%' }}>
                {errors.avatar}
              </Alert>
            )}
          </Box>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

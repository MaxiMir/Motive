import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Field, Form, FormikProvider } from 'formik'
import { Box, InputAdornment } from '@mui/material'
import { UserBaseDto } from '@dto'
import ActionSubmit from '@components/Action/ActionSubmit'
import ActionCancel from '@components/Action/ActionCancel'
import PhotoInput from '@components/Photo/PhotoInput'
import PhotoButton from '@components/Photo/PhotoButton'
import AppModal from '@ui/AppModal'
import AppInput from '@ui/AppInput'
import useForm from './hooks/useForm'

const Alert = dynamic(() => import('@mui/material/Alert'))

interface ModalProfileProps {
  user: UserBaseDto
  onClose: () => void
}

function ModalProfile({ user, onClose }: ModalProfileProps) {
  const { formatMessage } = useIntl()
  const form = useForm(user, onClose)
  const { isSubmitting, values, touched, errors, setFieldValue, handleSubmit } = form
  const title = formatMessage({ id: 'page.user.modal-profile.title' })
  const profile = formatMessage({ id: 'page.user.modal-profile.profile' })
  const nameLabel = formatMessage({ id: 'page.user.modal-profile.name' })
  const nicknameLabel = formatMessage({ id: 'common.nickname' })
  const mottoLabel = formatMessage({ id: 'common.motto' })
  const locationLabel = formatMessage({ id: 'common.location' })
  const bioLabel = formatMessage({ id: 'common.bio' })
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
          disabled={isSubmitting}
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
            <Box display="flex" justifyContent="center">
              {!values.avatar ? (
                <PhotoInput disabled={isSubmitting} onSelect={setAvatar} />
              ) : (
                <Box width="33%">
                  <PhotoButton image={values.avatar} disabled={isSubmitting} onClick={clearAvatar} />
                </Box>
              )}
            </Box>
            {touched.avatar && errors.avatar && (
              <Alert severity="error" variant="outlined" sx={{ width: '100%' }}>
                {errors.avatar}
              </Alert>
            )}
            <Field name="name" label={nameLabel} color="primary" component={AppInput} />
            <Field
              name="nickname"
              label={nicknameLabel}
              color="primary"
              InputProps={{
                startAdornment: <InputAdornment position="start">https://2bebetter.pro/</InputAdornment>,
              }}
              component={AppInput}
            />
            <Field name="motto" label={mottoLabel} color="primary" component={AppInput} />
            <Field name="location" label={locationLabel} color="primary" component={AppInput} />
            <Field name="bio" multiline label={bioLabel} color="primary" component={AppInput} />
          </Box>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

export default ModalProfile

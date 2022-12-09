import dynamic from 'next/dynamic'
import { Field, Form, FormikProvider } from 'formik'
import { Box, InputAdornment } from '@mui/material'
import AppModal from '@ui/AppModal/AppModal'
import AppInput from '@ui/AppInput'
import ActionSubmit from '@components/Action/ActionSubmit'
import ActionCancel from '@components/Action/ActionCancel/ActionCancel'
import PhotoInput from '@components/Photo/PhotoInput'
import PhotoButton from '@components/Photo/PhotoButton'
import { useForm, useMessages } from './hooks'

const Alert = dynamic(() => import('@mui/material/Alert'))

interface ModalProfileProps {
  onClose: () => void
}

function ModalProfile({ onClose }: ModalProfileProps) {
  const messages = useMessages()
  const form = useForm(onClose)
  const { isSubmitting, values, touched, errors, setFieldValue, handleSubmit } = form

  const setAvatar = (files: File[]) => setFieldValue('avatar', files[0])

  const clearAvatar = () => setFieldValue('avatar', null)

  return (
    <AppModal
      title={
        <>
          {messages.title}{' '}
          <Box component="span" sx={{ color: 'zen.sand' }}>
            {messages.profile}
          </Box>
        </>
      }
      maxWidth="xs"
      actions={[
        <ActionCancel onClick={onClose} />,
        <ActionSubmit
          disabled={isSubmitting}
          text={messages.buttonText}
          loadingText={messages.buttonLoading}
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
            <Field name="name" label={messages.nameLabel} color="primary" component={AppInput} />
            <Field
              name="nickname"
              label={messages.nicknameLabel}
              color="primary"
              InputProps={{
                startAdornment: <InputAdornment position="start">https://2bebetter.pro/</InputAdornment>,
              }}
              component={AppInput}
            />
            <Field name="motto" label={messages.mottoLabel} color="primary" component={AppInput} />
            <Field name="location" label={messages.locationLabel} color="primary" component={AppInput} />
            <Field name="bio" multiline label={messages.bioLabel} color="primary" component={AppInput} />
          </Box>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

export default ModalProfile

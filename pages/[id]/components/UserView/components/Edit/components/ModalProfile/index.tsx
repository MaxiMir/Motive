import dynamic from 'next/dynamic'
import { Field, Form, FormikProvider } from 'formik'
import { Grid, Box } from '@mui/material'
import { UserBaseDto } from 'dto'
import { Locale } from 'hooks/useLocale'
import ActionSubmit from 'components/Action/ActionSubmit'
import ActionCancel from 'components/Action/ActionCancel'
import PhotoInput from 'components/Photo/PhotoInput'
import PhotoButton from 'components/Photo/PhotoButton'
import AppModal from 'components/ui/AppModal'
import AppInput from 'components/ui/AppInput'
import useForm from './hook'
import i18n from './i18n'

const Alert = dynamic(() => import('@mui/material/Alert'))

export interface ModalProfileProps {
  user: UserBaseDto
  locale: Locale
  onClose: () => void
}

export default function ModalProfile({ user, locale, onClose }: ModalProfileProps) {
  const form = useForm(user, locale, onClose)
  const { isSubmitting, values, touched, errors, setFieldValue, handleSubmit } = form
  const { action, profile, name, nickname, button, buttonLoading } = i18n[locale]

  const setAvatar = (files: File[]) => setFieldValue('avatar', files[0])

  const clearAvatar = () => setFieldValue('avatar', null)

  return (
    <AppModal
      title={
        <>
          {action}{' '}
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
          name={button}
          nameLoading={buttonLoading}
          emoji="followers"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form autoComplete="off">
          <Box display="flex" flexDirection="column" gap={3}>
            <Field name="name" label={name} color="primary" component={AppInput} />
            <Field name="nickname" label={nickname} color="primary" component={AppInput} />
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

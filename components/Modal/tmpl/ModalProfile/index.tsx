import dynamic from 'next/dynamic'
import { Field, Form, FormikProvider } from 'formik'
import { Grid, Box, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { UserBaseDto } from 'dto'
import { Locale } from 'hooks/useLocale'
import Action from 'components/Action'
import Photo from 'components/Photo'
import AppModal from 'components/UI/AppModal'
import AppInput from 'components/UI/AppInput'
import useForm from './hook'
import i18n from './i18n'

const Alert = dynamic(() => import('@mui/material/Alert'))

export interface ModalProfileProps {
  tmpl: 'profile'
  user: UserBaseDto
  locale: Locale
  onClose: () => void
}

export default function ModalProfile({ user, locale, onClose }: ModalProfileProps): JSX.Element {
  const classes = useStyles()
  const form = useForm(user, locale, onClose)
  const { action, profile, name, nickname, button, buttonLoading } = i18n[locale]
  const { isSubmitting, values, touched, errors, setFieldValue, handleSubmit } = form

  const setAvatar = (files: File[]) => setFieldValue('avatar', files[0])

  const clearAvatar = () => setFieldValue('avatar', null)

  return (
    <AppModal
      title={
        <>
          {action} <span className={classes.profile}>{profile}</span>
        </>
      }
      maxWidth="xs"
      actions={[
        <Action tmpl="close" onClick={onClose} />,
        <Action
          tmpl="submit"
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
                  <Photo tmpl="input" disabled={isSubmitting} onSelect={setAvatar} />
                ) : (
                  <Photo tmpl="button" image={values.avatar} disabled={isSubmitting} onClick={clearAvatar} />
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    profile: {
      color: theme.palette.zen.sand,
    },
  }),
)

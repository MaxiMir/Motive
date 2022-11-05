import { Field, FieldArray, Form, FormikProvider } from 'formik'
import { useIntl } from 'react-intl'
import { Grid, Box, Typography } from '@mui/material'
import { GoalDto } from '@dto'
import useSelectPhoto from '@hooks/useSelectPhoto'
import ActionSubmit from '@components/Action/ActionSubmit'
import ActionCancel from '@components/Action/ActionCancel'
import AppModal from '@ui/AppModal'
import AppInput from '@ui/AppInput'
import AppHeader from '@ui/AppHeader'
import AppShakeIcon from '@ui/AppShakeIcon'
import PhotoInput from '@components/Photo/PhotoInput'
import PhotoButton from '@components/Photo/PhotoButton'
import VideoPreview from '@components/Video/VideoPreview'
import VideoInput from '@components/Video/VideoInput'
import useForm from './hook'

export interface ModalFeedbackProps {
  goal: GoalDto
  onClose: () => void
}

export default function ModalFeedback({ goal, onClose }: ModalFeedbackProps) {
  const { formatMessage } = useIntl()
  const form = useForm(goal, onClose)
  const { isSubmitting, values, setFieldValue, handleSubmit } = form
  const title = formatMessage({ id: 'page.user.modal-feedback.title' })
  const label = formatMessage({ id: 'page.user.modal-feedback.label' })
  const subtitle = formatMessage({ id: 'page.user.modal-feedback.subtitle' })
  const photoTitle = formatMessage({ id: 'page.user.modal-feedback.photo-title' })
  const videoTitle = formatMessage({ id: 'page.user.modal-feedback.video-title' })
  const buttonText = formatMessage({ id: 'page.user.modal-feedback.button' })
  const loadingText = formatMessage({ id: 'page.user.modal-feedback.loading' })

  const onSelectPhoto = useSelectPhoto(form)

  const onSelectVideo = (file: File) => setFieldValue('video', file)

  return (
    <AppModal
      title={title}
      maxWidth="xs"
      actions={[
        <ActionCancel onClick={onClose} />,
        <ActionSubmit
          isLoading={isSubmitting}
          text={buttonText}
          loadingText={loadingText}
          emoji="feedback"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form autoComplete="off">
          <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
              <AppShakeIcon name="congratulations" />
              <Typography variant="subtitle1" sx={{ color: 'support.main' }}>
                {subtitle}
              </Typography>
            </Box>
            <Field name="text" label={label} color="warning" multiline rows={3} component={AppInput} />
            {!!values.photos.length && (
              <Box display="flex" flexDirection="column" gap={2} width="100%">
                <AppHeader name="photo" variant="h6" component="h2" color="primary">
                  {photoTitle}
                </AppHeader>
                <FieldArray name="photos">
                  {({ remove }) => (
                    <Grid container spacing={2}>
                      {values.photos.map((file, index) => (
                        <Grid item xs={4} key={index}>
                          <PhotoButton image={file} disabled={isSubmitting} onClick={() => remove(index)} />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </FieldArray>
              </Box>
            )}
            {values.video && (
              <Box display="flex" flexDirection="column" gap={2} width="100%">
                <AppHeader name="video" variant="h6" component="h2" color="primary">
                  {videoTitle}
                </AppHeader>
                <VideoPreview
                  video={values.video}
                  disabled={isSubmitting}
                  onRemove={() => setFieldValue('video', null)}
                />
              </Box>
            )}
            <Box display="flex" gap={2} width="100%">
              <PhotoInput multiple disabled={isSubmitting} onSelect={onSelectPhoto} />
              <VideoInput disabled onSelect={onSelectVideo} />
            </Box>
          </Box>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

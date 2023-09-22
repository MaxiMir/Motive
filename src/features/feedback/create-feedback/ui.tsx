import { Grid, Typography, Stack } from '@mui/material'
import { Field, FieldArray, Form, FormikProvider } from 'formik'
import { useIntl } from 'react-intl'
import { usePhotoLimit } from 'entities/confirmation'
import { useDeviceContext } from 'entities/device'
import CancelButton from 'shared/ui/CancelButton'
import Input from 'shared/ui/Input'
import Modal from 'shared/ui/Modal'
import PhotoButton from 'shared/ui/photoButton'
import PhotoInput from 'shared/ui/PhotoInput'
import ShakeTypography from 'shared/ui/ShakeTypography'
import SubmitButton from 'shared/ui/SubmitButton'
import VideoInput from 'shared/ui/videoInput'
import VideoPreview from 'shared/ui/VideoPreview'
import { useCreateFeedbackForm } from './model'

interface AddingModalProps {
  goalId: number
  dayId: number
  onClose: () => void
}

function CreateFeedback({ goalId, dayId, onClose }: AddingModalProps) {
  const { formatMessage } = useIntl()
  const { isSafari } = useDeviceContext()
  const form = useCreateFeedbackForm(goalId, dayId, onClose)
  const { isSubmitting, values, setFieldValue, submitForm } = form
  const title = formatMessage({ id: 'page.user.modal-feedback.title' })
  const label = formatMessage({ id: 'page.user.modal-feedback.label' })
  const subtitle = formatMessage({ id: 'page.user.modal-feedback.subtitle' })
  const photoTitle = formatMessage({ id: 'page.user.modal-feedback.photo-title' })
  const videoTitle = formatMessage({ id: 'page.user.modal-feedback.video-title' })
  const buttonText = formatMessage({ id: 'page.user.modal-feedback.button' })
  const loadingText = formatMessage({ id: 'page.user.modal-feedback.loading' })

  const onSelectPhoto = usePhotoLimit(form)

  const onSelectVideo = (file: File) => setFieldValue('video', file)

  return (
    <Modal
      title={title}
      fullScreen={isSafari}
      actions={[
        <CancelButton key="cancel" onClick={onClose} />,
        <SubmitButton
          text={buttonText}
          loadingText={loadingText}
          isLoading={isSubmitting}
          key="submit"
          onClick={submitForm}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form>
          <Stack alignItems="center" gap={3}>
            <Stack alignItems="center" gap={1}>
              <ShakeTypography>🎉</ShakeTypography>
              <Typography variant="subtitle1" color="support.main">
                {subtitle}
              </Typography>
            </Stack>
            <Field name="text" label={label} color="warning" multiline rows={3} component={Input} />
            {!!values.photos.length && (
              <Stack gap={2} width="100%">
                <Typography variant="h6" component="p" color="primary">
                  📸 {photoTitle}
                </Typography>
                <FieldArray name="photos">
                  {({ remove }) => (
                    <Grid container spacing={2}>
                      {values.photos.map((file, index) => (
                        <Grid item xs={4} key={file.name}>
                          <PhotoButton
                            image={file}
                            disabled={isSubmitting}
                            onClick={() => remove(index)}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </FieldArray>
              </Stack>
            )}
            {values.video && (
              <Stack gap={2} width="100%">
                <Typography variant="h6" component="p" color="primary">
                  🎬 {videoTitle}
                </Typography>
                <VideoPreview
                  video={values.video}
                  disabled={isSubmitting}
                  onRemove={() => setFieldValue('video', null)}
                />
              </Stack>
            )}
            <Stack direction="row" gap={2} width="100%">
              <PhotoInput multiple disabled={isSubmitting} onSelect={onSelectPhoto} />
              <VideoInput disabled onSelect={onSelectVideo} />
            </Stack>
          </Stack>
        </Form>
      </FormikProvider>
    </Modal>
  )
}

export default CreateFeedback

import { Grid, Typography, Stack } from '@mui/material'
import { ErrorMessage, Field, FieldArray, Form, FormikProvider } from 'formik'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { usePhotoLimit } from 'entities/confirmation'
import { useDeviceContext } from 'entities/device'
import CancelButton from 'shared/ui/cancel-button'
import Input from 'shared/ui/input'
import Modal from 'shared/ui/modal'
import PhotoButton from 'src/shared/ui/photo-button'
import PhotoInput from 'shared/ui/photo-input'
import SpinTypography from 'shared/ui/spin-typography'
import SubmitButton from 'shared/ui/submit-button'
import VideoInput from 'shared/ui/videoInput'
import VideoPreview from 'shared/ui/video-preview'
import { useCreateConfirmationForm } from './model'

const Alert = dynamic(() => import('@mui/material/Alert'))

interface CreateConfirmationModalProps {
  goalId: number
  onClose: () => void
}

function CreateConfirmationModal({ goalId, onClose }: CreateConfirmationModalProps) {
  const { formatMessage } = useIntl()
  const { isMobile } = useDeviceContext()
  const form = useCreateConfirmationForm(goalId, onClose)
  const { isSubmitting, values, setFieldValue, handleSubmit } = form
  const title = formatMessage({ id: 'component.modal-completion.title' })
  const buttonText = formatMessage({ id: 'common.complete' })
  const loadingText = formatMessage({ id: 'common.completing' })
  const subtitle = formatMessage({ id: 'component.modal-completion.subtitle' })
  const label = formatMessage({ id: 'component.modal-completion.label' })
  const photoTitle = formatMessage({ id: 'component.modal-completion.photoTitle' })
  const videoTitle = formatMessage({ id: 'component.modal-completion.videoTitle' })

  const onSelectPhoto = usePhotoLimit(form)

  const onSelectVideo = (file: File) => setFieldValue('video', file)

  return (
    <Modal
      title={title}
      fullScreen={isMobile}
      actions={[
        <CancelButton key="cancel" onClick={onClose} />,
        <SubmitButton
          text={buttonText}
          loadingText={loadingText}
          isLoading={isSubmitting}
          key="submit"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form>
          <Stack alignItems="center" gap={3}>
            <Stack alignItems="center" gap={1}>
              <SpinTypography>🏆</SpinTypography>
              <Typography variant="subtitle1" color="#ffa300">
                {subtitle}
              </Typography>
            </Stack>
            <Field name="text" label={label} color="warning" multiline rows={3} component={Input} />
            {!!values.photos.length && (
              <Stack gap={2} width="100%">
                <Typography variant="h6" color="primary" component="p">
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
                <Typography variant="h6" color="primary" component="p">
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
              <PhotoInput disabled={isSubmitting} multiple onSelect={onSelectPhoto} />
              <VideoInput disabled onSelect={onSelectVideo} />
            </Stack>
            <ErrorMessage name="photos">
              {(msg) => (
                <Alert severity="error" variant="outlined" sx={{ width: '100%' }}>
                  {msg}
                </Alert>
              )}
            </ErrorMessage>
          </Stack>
        </Form>
      </FormikProvider>
    </Modal>
  )
}

export default CreateConfirmationModal

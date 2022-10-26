import dynamic from 'next/dynamic'
import { Field, FieldArray, Form, FormikProvider } from 'formik'
import { useIntl } from 'react-intl'
import { Grid, Box, Typography } from '@mui/material'
import { GoalDto } from '@dto'
import useSelectPhoto from '@hooks/useSelectPhoto'
import ActionSubmit from '@components/Action/ActionSubmit'
import ActionCancel from '@components/Action/ActionCancel'
import AppModal from '@ui/AppModal'
import AppAccordion from '@ui/AppAccordion'
import AppInput from '@ui/AppInput'
import AppHeader from '@ui/AppHeader'
import AppSpinIcon from '@ui/AppSpinIcon'
import PhotoInput from '@components/Photo/PhotoInput'
import PhotoButton from '@components/Photo/PhotoButton'
import VideoPreview from '@components/Video/VideoPreview'
import VideoInput from '@components/Video/VideoInput'
import useForm from './hook'

const Alert = dynamic(() => import('@mui/material/Alert'))

export interface ModalCompletionProps {
  goal: GoalDto
  onClose: () => void
}

export default function ModalCompletion({ goal, onClose }: ModalCompletionProps) {
  const { formatMessage } = useIntl()
  const form = useForm(goal, onClose)
  const { isSubmitting, values, touched, errors, setFieldValue, handleSubmit } = form
  const photoError = Array.isArray(errors.photos) ? errors.photos.join(', ') : errors.photos
  const title = formatMessage({ id: 'components.modal-completion.title' })
  const buttonText = formatMessage({ id: 'components.modal-completion.button' })
  const loadingText = formatMessage({ id: 'components.modal-completion.buttonLoading' })
  const subtitle = formatMessage({ id: 'components.modal-completion.subtitle' })
  const label = formatMessage({ id: 'components.modal-completion.label' })
  const photoTitle = formatMessage({ id: 'components.modal-completion.photoTitle' })
  const videoTitle = formatMessage({ id: 'components.modal-completion.videoTitle' })
  const accordionHeader = formatMessage({ id: 'components.modal-completion.accordionHeader' })
  const ariaControls = formatMessage({ id: 'components.modal-completion.ariaControls' })
  const detailsStart = formatMessage({ id: 'components.modal-completion.details-start' })
  const detailsEnd = formatMessage({ id: 'components.modal-completion.details-end' })

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
          emoji="completed"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form autoComplete="off">
          <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
              <AppSpinIcon name="completed" />
              <Typography variant="subtitle1" sx={{ color: '#ffa300' }}>
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
              <PhotoInput disabled={isSubmitting} multiple onSelect={onSelectPhoto} />
              <VideoInput disabled onSelect={onSelectVideo} />
            </Box>
            {touched.photos && photoError && (
              <Alert severity="error" variant="outlined" sx={{ width: '100%' }}>
                {photoError}
              </Alert>
            )}
            <Box sx={{ width: '100%' }}>
              <AppAccordion
                name="switch"
                header={accordionHeader}
                id="goal"
                ariaControls={ariaControls}
                details={
                  <Box sx={{ color: 'zen.silent' }}>
                    <Typography>
                      {detailsStart}{' '}
                      <Box component="b" sx={{ color: 'text.primary' }}>
                        5
                      </Box>{' '}
                      {detailsEnd}.
                    </Typography>
                  </Box>
                }
              />
            </Box>
          </Box>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

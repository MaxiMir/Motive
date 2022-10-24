import dynamic from 'next/dynamic'
import { Field, FieldArray, Form, FormikProvider } from 'formik'
import { useIntl } from 'react-intl'
import { Grid, Box, Typography } from '@mui/material'
import { MAIN_CHARACTERISTICS, GoalDto } from 'dto'
import useSelectPhoto from 'hooks/useSelectPhoto'
import ActionSubmit from 'components/Action/ActionSubmit'
import ActionCancel from 'components/Action/ActionCancel'
import AppModal from 'components/ui/AppModal'
import AppDecorEmoji from 'components/ui/AppDecorEmoji'
import AppAccordion from 'components/ui/AppAccordion'
import AppInput from 'components/ui/AppInput'
import AppHeader from 'components/ui/AppHeader'
import AppSpinIcon from 'components/ui/AppSpinIcon'
import PhotoInput from 'components/Photo/PhotoInput'
import PhotoButton from 'components/Photo/PhotoButton'
import VideoPreview from 'components/Video/VideoPreview'
import VideoInput from 'components/Video/VideoInput'
import useForm from './hook'
import i18n from './i18n'

const Alert = dynamic(() => import('@mui/material/Alert'))

export interface ModalCompletionProps {
  goal: GoalDto
  onClose: () => void
}

export default function ModalCompletion({ goal, onClose }: ModalCompletionProps) {
  const { locale } = useIntl()
  const form = useForm(goal, onClose)
  const { isSubmitting, values, touched, errors, setFieldValue, handleSubmit } = form
  const photoError = Array.isArray(errors.photos) ? errors.photos.join(', ') : errors.photos
  const {
    title,
    button,
    buttonLoading,
    subtitle,
    label,
    photoTitle,
    videoTitle,
    accordionHeader,
    ariaControls,
    details,
  } = i18n[locale]

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
          name={button}
          nameLoading={buttonLoading}
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
                      {details[0]}{' '}
                      {MAIN_CHARACTERISTICS.map((name) => (
                        <AppDecorEmoji name={name} key={name} />
                      ))}
                      {details[1]}{' '}
                      <Box component="b" sx={{ color: 'text.primary' }}>
                        5
                      </Box>{' '}
                      <AppDecorEmoji name="motivation" /> {details[2]}.
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

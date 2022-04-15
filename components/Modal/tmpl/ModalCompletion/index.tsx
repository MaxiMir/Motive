import dynamic from 'next/dynamic'
import { Field, FieldArray, Form, FormikProvider } from 'formik'
import { Grid, Box, Typography, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { GoalDto, MainCharacteristicName } from 'dto'
import useLocale from 'hooks/useLocale'
import useSelectPhoto from 'hooks/useSelectPhoto'
import Action from 'components/Action'
import AppModal from 'components/UI/AppModal'
import AppDecorEmoji from 'components/UI/AppDecorEmoji'
import AppAccordion from 'components/UI/AppAccordion'
import AppInput from 'components/UI/AppInput'
import AppTitle from 'components/UI/AppTitle'
import AppSpinIcon from 'components/UI/AppSpinIcon'
import Photo from 'components/Photo'
import Video from 'components/Video'
import useForm from './hook'
import i18n from './i18n'

const Alert = dynamic(() => import('@mui/material/Alert'))

const CHARACTERISTIC_NAMES: MainCharacteristicName[] = ['motivation', 'creativity', 'support']

export interface ModalCompletionProps {
  tmpl: 'completion'
  goal: GoalDto
  onClose: () => void
}

export default function ModalCompletion({ goal, onClose }: ModalCompletionProps): JSX.Element {
  const classes = useStyles()
  const { locale } = useLocale()
  const form = useForm(goal, onClose)
  const { isSubmitting, values, touched, errors, setFieldValue, handleSubmit } = form
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
        <Action tmpl="close" onClick={onClose} />,
        <Action
          tmpl="submit"
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
              <Typography variant="subtitle1" className={classes.congratulations}>
                {subtitle}
              </Typography>
            </Box>
            <Field name="text" label={label} color="warning" multiline rows={3} component={AppInput} />
            {!!values.photos.length && (
              <Box display="flex" flexDirection="column" gap={2} width="100%">
                <AppTitle name="photo" variant="h6" component="h2" color="primary">
                  {photoTitle}
                </AppTitle>
                <FieldArray name="photos">
                  {({ remove }) => (
                    <Grid container spacing={2}>
                      {values.photos.map((file, index) => (
                        <Grid item xs={4} key={index}>
                          <Photo tmpl="button" image={file} disabled={isSubmitting} onClick={() => remove(index)} />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </FieldArray>
              </Box>
            )}
            {values.video && (
              <Box display="flex" flexDirection="column" gap={2} width="100%">
                <AppTitle name="video" variant="h6" component="h2" color="primary">
                  {videoTitle}
                </AppTitle>
                <Video
                  tmpl="preview"
                  video={values.video}
                  disabled={isSubmitting}
                  onRemove={() => setFieldValue('video', null)}
                />
              </Box>
            )}
            <Box display="flex" gap={2} width="100%">
              <Photo tmpl="input" disabled={isSubmitting} multiple onSelect={onSelectPhoto} />
              <Video tmpl="input" disabled onSelect={onSelectVideo} />
            </Box>
            {touched.photos && errors.photos && (
              <Alert severity="error" variant="outlined" sx={{ width: '100%' }}>
                {errors.photos}
              </Alert>
            )}
            <div className={classes.accordionWrap}>
              <AppAccordion
                name="switch"
                header={accordionHeader}
                id="goal"
                ariaControls={ariaControls}
                details={
                  <div className={classes.hint}>
                    <Typography>
                      {details[0]}{' '}
                      {CHARACTERISTIC_NAMES.map((name) => (
                        <AppDecorEmoji name={name} key={name} />
                      ))}
                      {details[1]} <b className={classes.count}>5</b> <AppDecorEmoji name="motivation" /> {details[2]}.
                    </Typography>
                  </div>
                }
              />
            </div>
          </Box>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    congratulations: {
      color: '#ffa300',
    },
    accordionWrap: {
      width: '100%',
    },
    hint: {
      color: theme.palette.zen.silent,
    },
    count: {
      color: theme.palette.text.primary,
    },
  }),
)

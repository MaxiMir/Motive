import dynamic from 'next/dynamic'
import { Field, FieldArray, Form, FormikProvider } from 'formik'
import { Grid, Box, Typography, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { GoalDto, MainCharacteristicName } from 'dto'
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

const Alert = dynamic(() => import('@mui/material/Alert'))

const CHARACTERISTIC_NAMES: MainCharacteristicName[] = ['motivation', 'creativity', 'support']

export interface ModalCompletionProps {
  tmpl: 'completion'
  goal: GoalDto
  onClose: () => void
}

export default function ModalCompletion({ goal, onClose }: ModalCompletionProps): JSX.Element {
  const classes = useStyles()
  const form = useForm(goal, onClose)
  const { isSubmitting, values, touched, errors, setFieldValue, handleSubmit } = form

  const onSelectPhoto = useSelectPhoto(form)

  const onSelectVideo = (file: File) => setFieldValue('video', file)

  return (
    <AppModal
      title="Completing the goal"
      maxWidth="xs"
      actions={[
        <Action tmpl="close" onClick={onClose} />,
        <Action
          tmpl="submit"
          isLoading={isSubmitting}
          name="Complete"
          nameLoading="Completing"
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
                Congratulations, you did it!
              </Typography>
            </Box>
            <Field name="text" label="How it was" color="secondary" multiline rows={3} component={AppInput} />
            {!!values.photos.length && (
              <Box display="flex" flexDirection="column" gap={2} width="100%">
                <AppTitle name="photo" variant="h6" component="h2" color="primary">
                  Photos
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
                  Video
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
                header="Goal Completion"
                id="goal"
                ariaControls="about-goal-completion"
                details={
                  <div className={classes.hint}>
                    <Typography>
                      In addition to the points you receive{' '}
                      {CHARACTERISTIC_NAMES.map((name) => (
                        <AppDecorEmoji name={name} key={name} />
                      ))}
                      , you get an extra <b className={classes.count}>5</b> points <AppDecorEmoji name="motivation" />{' '}
                      for completing the goal.
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

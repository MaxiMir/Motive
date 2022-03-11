import dynamic from 'next/dynamic'
import { Field, FieldArray, Form, FormikProvider } from 'formik'
import { createStyles, makeStyles } from '@material-ui/core'
import { GoalDto, MainCharacteristicName } from 'dto'
import useSelectPhoto from 'hooks/useSelectPhoto'
import ModalAction from 'components/ModalAction'
import AppModal from 'components/UI/AppModal'
import AppTypography from 'components/UI/AppTypography'
import AppBox from 'components/UI/AppBox'
import AppDecorEmoji from 'components/UI/AppDecorEmoji'
import AppAccordion from 'components/UI/AppAccordion'
import AppInput from 'components/UI/AppInput'
import AppTitle from 'components/UI/AppTitle'
import AppSpinIcon from 'components/UI/AppSpinIcon'
import Photo from 'components/Photo'
import Video from 'components/Video'
import useForm from './hook'

const Alert = dynamic(() => import('@material-ui/lab/Alert'))

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
        <ModalAction tmpl="close" onClick={onClose} />,
        <ModalAction
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
          <AppBox flexDirection="column" alignItems="center" spacing={3}>
            <AppBox flexDirection="column" alignItems="center" spacing={1}>
              <AppSpinIcon name="completed" />
              <AppTypography variant="subtitle1" className={classes.congratulations}>
                Congratulations, you did it!
              </AppTypography>
            </AppBox>
            <Field name="text" label="How it was" color="secondary" multiline rows={3} component={AppInput} />
            {!!values.photos.length && (
              <AppBox flexDirection="column" spacing={2} width="100%">
                <AppTitle name="photo" variant="h6" component="h2" color="primary">
                  Photos
                </AppTitle>
                <FieldArray name="photos">
                  {({ remove }) => (
                    <AppBox flexWrap="wrap" spacing={2}>
                      {values.photos.map((file, index) => (
                        <Photo
                          tmpl="button"
                          file={file}
                          disabled={isSubmitting}
                          key={index}
                          onClick={() => remove(index)}
                        />
                      ))}
                    </AppBox>
                  )}
                </FieldArray>
              </AppBox>
            )}
            {values.video && (
              <AppBox flexDirection="column" spacing={2} width="100%">
                <AppTitle name="video" variant="h6" component="h2" color="primary">
                  Video
                </AppTitle>
                <Video
                  tmpl="preview"
                  video={values.video}
                  disabled={isSubmitting}
                  onRemove={() => setFieldValue('video', null)}
                />
              </AppBox>
            )}
            <AppBox spacing={2} width="100%">
              <Photo tmpl="input" disabled={isSubmitting} onSelect={onSelectPhoto} />
              <Video tmpl="input" disabled onSelect={onSelectVideo} />
            </AppBox>
            {touched.photos && errors.photos && (
              <Alert severity="error" variant="outlined" style={{ width: '100%' }}>
                {errors.photos}
              </Alert>
            )}
            <div className={classes.accordionWrap}>
              <AppAccordion
                name="switch"
                header="About Goal Completion"
                id="goal"
                ariaControls="about-goal-completion"
                details={
                  <div className={classes.hint}>
                    <AppTypography>
                      In addition to the points you receive{' '}
                      {CHARACTERISTIC_NAMES.map((name) => (
                        <AppDecorEmoji name={name} key={name} />
                      ))}
                      ,
                    </AppTypography>
                    <AppTypography>
                      You get an extra <b className={classes.count}>5</b> points <AppDecorEmoji name="motivation" /> for
                      completing the goal.
                    </AppTypography>
                  </div>
                }
              />
            </div>
          </AppBox>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    congratulations: {
      color: '#ffa300',
    },
    accordionWrap: {
      width: '100%',
    },
    hint: {
      color: theme.text.silent,
    },
    count: {
      color: theme.palette.text.primary,
    },
  }),
)

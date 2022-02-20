import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { Field, FieldArray, Form, FormikProvider } from 'formik'
import { createStyles, makeStyles } from '@material-ui/core'
import { GoalDto, MainCharacteristicName } from 'dto'
import useSelectPhoto from 'hooks/useSelectPhoto'
import ModalAction from 'components/ModalAction'
import AppModal from 'components/UI/AppModal'
import AppTypography from 'components/UI/AppTypography'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'
import AppAccordion from 'components/UI/AppAccordion'
import AppInput from 'components/UI/AppInput'
import AppHeader from 'components/UI/AppHeader'
import AppSpinIcon from 'components/UI/AppSpinIcon'
import Photo from 'components/Photo'
import Video from 'components/Video'
import useForm from './hook'

const Alert = dynamic(() => import('@material-ui/lab/Alert'))

const CHARACTERISTIC_NAMES: MainCharacteristicName[] = ['motivation', 'creativity', 'support']

export interface ModalCompleteProps {
  tmpl: 'complete'
  goal: GoalDto
  onClose: () => void
}

export default function ModalComplete({ goal, onClose }: ModalCompleteProps): JSX.Element {
  const classes = useStyles()
  const { isLoading, formik } = useForm(goal, onClose)
  const { values, touched, errors, setFieldValue, handleSubmit } = formik

  const onSelectPhoto = useSelectPhoto(formik)

  const onSelectVideo = (file: File) => setFieldValue('video', file)

  return (
    <AppModal
      title="Completing the goal"
      maxWidth="xs"
      actions={[
        <ModalAction tmpl="close" onClick={onClose} />,
        <ModalAction
          tmpl="submit"
          isLoading={isLoading}
          name="Complete"
          nameLoading="Completing"
          emoji="completed"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={formik}>
        <Form autoComplete="off">
          <AppBox flexDirection="column" alignItems="center" spacing={3}>
            <AppBox flexDirection="column" alignItems="center" spacing={1}>
              <AppSpinIcon name="completed" />
              <AppTypography variant="subtitle1" className={classes.congratulations}>
                Congratulations, you did it!
              </AppTypography>
            </AppBox>
            <Field name="description" label="How it was" color="secondary" multiline rows={3} component={AppInput} />
            {!!values.photos.length && (
              <AppBox flexDirection="column" spacing={2} width="100%">
                <AppHeader name="photo" variant="h6" component="h2" color="primary">
                  Photos
                </AppHeader>
                <FieldArray name="photos">
                  {({ remove }) => (
                    <AppBox flexWrap="wrap" spacing={2}>
                      {values.photos.map((file, index) => (
                        <Photo
                          tmpl="button"
                          file={file}
                          disabled={isLoading}
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
                <AppHeader name="video" variant="h6" component="h2" color="primary">
                  Video
                </AppHeader>
                <Video
                  tmpl="preview"
                  video={values.video}
                  disabled={isLoading}
                  onRemove={() => setFieldValue('video', null)}
                />
              </AppBox>
            )}
            <AppBox spacing={2} width="100%">
              <Photo tmpl="input" disabled={isLoading} onSelect={onSelectPhoto} />
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
                header="About goal completion"
                id="goal"
                ariaControls="about-goal-completion"
                details={
                  <div className={classes.hint}>
                    <AppTypography>
                      In addition to the points you receive{' '}
                      {CHARACTERISTIC_NAMES.map((name) => (
                        <Fragment key={name}>
                          <AppEmoji name={name} onlyEmoji />{' '}
                        </Fragment>
                      ))}
                      ,
                    </AppTypography>
                    <AppTypography>
                      You get an additional <b className={classes.count}>5</b> points{' '}
                      <AppEmoji name="motivation" onlyEmoji /> for completing the goal.
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

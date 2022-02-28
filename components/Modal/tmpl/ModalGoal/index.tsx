import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { Field, FieldArray, Form, FormikProvider } from 'formik'
import { makeStyles } from '@material-ui/core/styles'
import { Accordion, AccordionDetails, AccordionSummary, Button, createStyles } from '@material-ui/core'
import { MainCharacteristicName } from 'dto'
import useFocus from 'hooks/useFocus'
import ModalAction from 'components/ModalAction'
import Task from 'components/Task'
import AppEmoji from 'components/UI/AppEmoji'
import AppModal from 'components/UI/AppModal'
import AppTitle from 'components/UI/AppTitle'
import AppBox from 'components/UI/AppBox'
import AppInput from 'components/UI/AppInput'
import AppTypography from 'components/UI/AppTypography'
import AppIcon from 'components/UI/AppIcon'
import AppDot from 'components/UI/AppDot'
import AppAccordion from 'components/UI/AppAccordion'
import { PaulIcon } from 'components/UI/icons'
import useForm from './hook'

const AppCloseButton = dynamic(() => import('components/UI/AppCloseButton'))

const CHARACTERISTIC_NAMES: MainCharacteristicName[] = ['motivation', 'creativity', 'support']

export interface ModalGoalProps {
  tmpl: 'goal'
  onClose: () => void
}

export default function ModalGoal({ onClose }: ModalGoalProps): JSX.Element {
  const classes = useStyles()
  const [hashtagsRef, setHashtagsFocus] = useFocus()
  const { isLoading, formik } = useForm(onClose)
  const { values, setFieldValue, handleSubmit } = formik

  const onAddHashtag = () => {
    setFieldValue('hashtags', !values.hashtags ? '#' : [values.hashtags, '#'].join(' '))
    setHashtagsFocus()
  }

  return (
    <AppModal
      title="Creating a new goal"
      maxWidth="xs"
      actions={[
        <ModalAction tmpl="close" onClick={onClose} />,
        <ModalAction
          tmpl="submit"
          isLoading={isLoading}
          name="Create"
          nameLoading="Creating"
          emoji="goal"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={formik}>
        <Form autoComplete="off">
          <AppBox flexDirection="column" spacing={3}>
            <Field name="name" label="Name *" color="secondary" component={AppInput} />
            <AppBox flexDirection="column" spacing={1}>
              <Field
                name="hashtags"
                label="Hashtags"
                color="secondary"
                multiline
                rows={3}
                inputRef={hashtagsRef}
                component={AppInput}
              />
              <Button variant="outlined" size="small" className={classes.button} onClick={onAddHashtag}>
                # Hashtag
              </Button>
            </AppBox>
            <AppBox flexDirection="column" spacing={2}>
              <AppTitle name="stage" variant="h6" component="h2" color="primary">
                Stages
              </AppTitle>
              <FieldArray name="stages">
                {({ push, remove }) => (
                  <>
                    {values.stages.map((_, index) => (
                      <AppBox spacing={1} key={index}>
                        <AppBox alignSelf="flex-start" mt={2}>
                          <AppDot size={10} />
                        </AppBox>
                        <Field
                          name={`stages.${index}`}
                          label={`stage ${index + 1}`}
                          autoFocus={index === values.stages.length - 1}
                          color="secondary"
                          component={AppInput}
                        />
                        <AppBox alignSelf="flex-start" mt="-4px">
                          <AppCloseButton onClick={() => remove(index)} />
                        </AppBox>
                      </AppBox>
                    ))}
                    <Button variant="outlined" size="small" className={classes.button} onClick={() => push('')}>
                      + Add stage
                    </Button>
                  </>
                )}
              </FieldArray>
            </AppBox>
            <AppBox flexDirection="column" spacing={2}>
              <AppTitle name="task" variant="h6" component="h2" color="primary">
                Tasks for tomorrow
              </AppTitle>
              <FieldArray name="tasks">
                {({ push, remove }) => (
                  <>
                    {values.tasks.map((task, index) => (
                      <Task
                        tmpl="field"
                        index={index}
                        taskCount={values.tasks.length}
                        date={task.date}
                        key={`tasks.${index}`}
                        onRemove={() => remove(index)}
                        onToggleDate={(isChecked) =>
                          setFieldValue(`tasks.${index}.date`, isChecked ? values.date : undefined)
                        }
                      />
                    ))}
                    <Button
                      variant="outlined"
                      size="small"
                      className={classes.button}
                      onClick={() => push({ name: '', date: undefined })}
                    >
                      + Add task
                    </Button>
                  </>
                )}
              </FieldArray>
            </AppBox>
            <div>
              <AppAccordion
                name="stage"
                header="About Stages"
                id="stage"
                ariaControls="about-stages-content"
                details={
                  <div className={classes.hint}>
                    <AppTypography>We recommend to divide large goals into stages.</AppTypography>
                    <AppTypography>Add each stage in the field above.</AppTypography>
                  </div>
                }
              />
              <Accordion>
                <AccordionSummary
                  expandIcon={<AppIcon name="expand_more" color="primary" />}
                  aria-controls="old-pitt-note"
                  id="old-pitt-note"
                >
                  <AppBox alignItems="center" spacing={1}>
                    <PaulIcon />
                    <AppTypography variant="h6" component="h3" color="primary">
                      Remember Old Pitt!
                    </AppTypography>
                  </AppBox>
                </AccordionSummary>
                <AccordionDetails>
                  <AppTypography className={classes.hint}>
                    He hunts for abandoned goals.
                    <br />
                    On the 14th day he covers them 🕸.
                    <br />
                    On the 28th day he eats them 🩸.
                    <br />
                    The accumulated points{' '}
                    {CHARACTERISTIC_NAMES.map((name) => (
                      <Fragment key={name}>
                        <AppEmoji name={name} onlyEmoji />{' '}
                      </Fragment>
                    ))}
                    will burn out and the number of abandoned goals increases.
                  </AppTypography>
                </AccordionDetails>
              </Accordion>
            </div>
          </AppBox>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      alignSelf: 'baseline',
      textTransform: 'none',
    },
    hint: {
      color: theme.text.silent,
    },
  }),
)

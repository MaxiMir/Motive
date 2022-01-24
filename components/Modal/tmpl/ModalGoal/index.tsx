import { Field, FieldArray, Form, FormikProvider } from 'formik'
import { makeStyles } from '@material-ui/core/styles'
import { Accordion, AccordionDetails, AccordionSummary, Button, createStyles } from '@material-ui/core'
import { MainCharacteristicName } from 'dto'
import { getTomorrow } from 'helpers/date'
import useFocus from 'hooks/useFocus'
import ModalAction from 'components/ModalAction'
import Task from 'components/Task'
import AppEmoji from 'components/UI/AppEmoji'
import AppModal from 'components/UI/AppModal'
import AppHeader from 'components/UI/AppHeader'
import AppBox from 'components/UI/AppBox'
import AppInput from 'components/UI/AppInput'
import AppTypography from 'components/UI/AppTypography'
import AppIcon from 'components/UI/AppIcon'
import { PaulIcon } from 'components/UI/icons'
import useForm from './hook'

const CHARACTERISTIC_NAMES: MainCharacteristicName[] = ['motivation', 'creativity', 'support']

export interface ModalGoalProps {
  tmpl: 'goal'
  onClose: () => void
}

export default function ModalGoal({ onClose }: ModalGoalProps): JSX.Element {
  const classes = useStyles()
  const [hashtagsRef, setHashtagsFocus] = useFocus()
  const tomorrow = getTomorrow()
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
              <AppHeader name="task" variant="h6" component="h2" color="primary">
                Tasks for tomorrow
              </AppHeader>
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
                          setFieldValue(`tasks.${index}.date`, isChecked ? tomorrow : undefined)
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
            <AppBox flexDirection="column" spacing={2}>
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
                      <>
                        <AppEmoji name={name} onlyEmoji key={name} />{' '}
                      </>
                    ))}
                    will burn out.
                    <br />
                    And the number of abandoned goals increases.
                  </AppTypography>
                </AccordionDetails>
              </Accordion>
            </AppBox>
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

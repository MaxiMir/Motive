import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { Field, FieldArray, Form, Formik } from 'formik'
import { object, string, array, SchemaOf } from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import { Button, FormControlLabel, IconButton, Switch } from '@material-ui/core'
import { KeyboardTimePicker } from 'formik-material-ui-pickers'
import { Add } from '@material-ui/icons'
import { Goal } from 'dto'
import AppModal from 'components/UI/AppModal'
import AppHeader from 'components/UI/AppHeader'
import AppBox from 'components/UI/AppBox'
import AppInput from 'components/UI/AppInput'
import AppTypography from 'components/UI/AppTypography'
import AppGradientButton from 'components/UI/AppGradientButton'
import { CloseIcon, PaulIcon } from 'components/UI/icons'

const CircularProgress = dynamic(() => import('@material-ui/core/CircularProgress'))

interface UserCardAddGoalModalProps {
  onCreate: () => void
  onClose: () => void
}

const schema: SchemaOf<Goal> = object({
  title: string().trim().required('Goal title needed').min(5, "It's too short.").max(35, "It's so long."),
  hashtags: string().trim(),
  tasks: array().of(
    object({
      title: string().trim().required('Task content is required').min(5, "It's too short.").max(255, "It's too long."),
      date: string(),
    }),
  ),
})

const SECONDS_IN_THE_DAY = 3600 * 1000 * 24

export default function UserCardAddGoalModal({ onCreate, onClose }: UserCardAddGoalModalProps): JSX.Element {
  const classes = useStyles()

  const generateNewTask = () => ({ title: '', date: undefined })

  return (
    <AppModal title="Creating a new goal" onClose={onClose}>
      <Formik
        initialValues={{
          title: '',
          hashtags: '',
          tasks: [generateNewTask()],
        }}
        validationSchema={schema}
        onSubmit={async (values) => {
          await new Promise<void>((r) =>
            setTimeout(() => {
              console.log(values)
              onCreate()
              r()
            }, 3000),
          )
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form autoComplete="off">
            <AppBox flexDirection="column" spacing={3}>
              <Field name="title" label="Title *" color="secondary" component={AppInput} />
              <Field
                name="hashtags"
                label="Hashtags"
                color="secondary"
                multiline
                rows={4}
                rowsMax={4}
                component={AppInput}
              />
              <FieldArray name="tasks">
                {({ push, remove }) => (
                  <AppBox flexDirection="column" spacing={2}>
                    <AppHeader name="task" variant="h6" component="h2" color="primary">
                      Tasks for tomorrow
                    </AppHeader>
                    {values.tasks.map((task, index) => (
                      <Fragment key={`tasks.${index}`}>
                        <AppBox alignItems="center" spacing={1}>
                          <Field
                            name={`tasks.${index}.title`}
                            label="Task *"
                            color="secondary"
                            placeholder="What should be done"
                            multiline
                            rows={3}
                            rowsMax={3}
                            component={AppInput}
                          />
                          <IconButton
                            disableFocusRipple
                            aria-label="remove task"
                            disabled={values.tasks.length === 1}
                            onClick={() => remove(index)}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </AppBox>
                        <AppBox pl={1} mb={1} spacing={1}>
                          <FormControlLabel
                            control={
                              <Switch
                                size="small"
                                onChange={(_, isChecked) =>
                                  setFieldValue(
                                    `tasks.${index}.date`,
                                    isChecked ? new Date(Date.now() + SECONDS_IN_THE_DAY) : undefined,
                                  )
                                }
                              />
                            }
                            label="remind"
                          />
                          {task.date && (
                            <Field
                              name={`tasks.${index}.date`}
                              ampm={false}
                              className={classes.timepicker}
                              component={KeyboardTimePicker}
                            />
                          )}
                        </AppBox>
                      </Fragment>
                    ))}
                    <div>
                      <Button
                        startIcon={<Add color="secondary" />}
                        className={classes.buttonAdd}
                        onClick={() => push(generateNewTask())}
                      >
                        <AppTypography color="secondary">add task</AppTypography>
                      </Button>
                    </div>
                  </AppBox>
                )}
              </FieldArray>
              <AppBox flexDirection="column" spacing={2}>
                <AppBox alignItems="center" spacing={1}>
                  <PaulIcon />
                  <AppTypography variant="h6" component="h3" color="primary">
                    Remember Old Pitt!
                  </AppTypography>
                </AppBox>
                <AppTypography className={classes.hint}>
                  He hunts for abandoned goals.
                  <br />
                  On the 14th day they get covered with 🕸.
                  <br />
                  On the 28th day he eats them.
                  <br />
                  And people have to start all over again.
                </AppTypography>
                <AppBox justifyContent="space-between" mt={2}>
                  <AppGradientButton onClick={onClose}>🚫 Cancel</AppGradientButton>
                  <AppGradientButton
                    type="submit"
                    disabled={isSubmitting}
                    startIcon={isSubmitting ? <CircularProgress size="0.9rem" color="primary" /> : undefined}
                  >
                    {isSubmitting ? 'Creating' : '💎 Create'}
                  </AppGradientButton>
                </AppBox>
              </AppBox>
            </AppBox>
          </Form>
        )}
      </Formik>
    </AppModal>
  )
}

const useStyles = makeStyles({
  buttonAdd: {
    textTransform: 'none',
  },
  hint: {
    color: '#99989D',
  },
  timepicker: {
    width: 100,
  },
})

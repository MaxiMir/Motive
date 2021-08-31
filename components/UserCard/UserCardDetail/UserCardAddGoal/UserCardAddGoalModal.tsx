import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { Field, FieldArray, Form, FormikProvider, useFormik } from 'formik'
import { object, string, array, SchemaOf } from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import { Button, FormControlLabel, IconButton, Switch } from '@material-ui/core'
import { KeyboardTimePicker } from 'formik-material-ui-pickers'
import { GoalCreation } from 'dto'
import useFocus from 'hooks/useFocus'
import AppModal from 'components/UI/AppModal'
import AppHeader from 'components/UI/AppHeader'
import AppBox from 'components/UI/AppBox'
import AppInput from 'components/UI/AppInput'
import AppTypography from 'components/UI/AppTypography'
import AppGradientButton from 'components/UI/AppGradientButton'
import AppIconText from 'components/UI/AppIcon'
import { PaulIcon } from 'components/UI/icons'

const CircularProgress = dynamic(() => import('@material-ui/core/CircularProgress'))

interface UserCardAddGoalModalProps {
  onCreate: () => void
  onClose: () => void
}

const schema: SchemaOf<GoalCreation> = object({
  name: string().trim().required('Goal name needed').min(5, "It's too short.").max(35, "It's so long."),
  hashtags: string().trim().max(150, "It's so long."),
  tasks: array().of(
    object({
      name: string().trim().required('Task content needed').min(5, "It's too short.").max(255, "It's too long."),
      date: string(),
    }),
  ),
})

const SECONDS_IN_THE_DAY = 3600 * 1000 * 24

export default function UserCardAddGoalModal({ onCreate, onClose }: UserCardAddGoalModalProps): JSX.Element {
  const classes = useStyles()
  const [hashtagsRef, setHashtagsFocus] = useFocus()
  const formik = useFormik({
    initialValues: {
      name: '',
      hashtags: '',
      tasks: [generateNewTask()],
    },
    validationSchema: schema,
    onSubmit: async (formValues) => {
      await new Promise<void>((r) =>
        setTimeout(() => {
          console.log(formValues)
          onCreate()
          r()
        }, 3000),
      )
    },
  })
  const { values, setFieldValue, isSubmitting, handleSubmit } = formik

  function generateNewTask() {
    return { name: '', date: undefined }
  }

  return (
    <AppModal
      title="Creating a new goal"
      actions={[
        <AppGradientButton onClick={onClose}>🚫 Cancel</AppGradientButton>,
        <AppGradientButton
          type="submit"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size="0.9rem" color="primary" /> : undefined}
          onClick={() => handleSubmit()}
        >
          {isSubmitting ? 'Creating' : '💎 Create'}
        </AppGradientButton>,
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
              <Button
                className={classes.button}
                variant="outlined"
                size="small"
                onClick={() => {
                  setFieldValue('hashtags', `${values.hashtags} #`)
                  setHashtagsFocus()
                }}
              >
                # Hashtag
              </Button>
            </AppBox>
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
                          name={`tasks.${index}.name`}
                          label="Task *"
                          color="secondary"
                          placeholder="What should be done"
                          multiline
                          rows={3}
                          component={AppInput}
                        />
                        <IconButton
                          disableFocusRipple
                          aria-label="remove task"
                          disabled={values.tasks.length === 1}
                          onClick={() => remove(index)}
                          className={classes.iconCloseBtn}
                        >
                          <AppIconText>close</AppIconText>
                        </IconButton>
                      </AppBox>
                      <AppBox height={48} alignItems="center" pl={1} spacing={1}>
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
                  <Button
                    startIcon={<AppIconText color="secondary">add</AppIconText>}
                    className={classes.button}
                    onClick={() => push(generateNewTask())}
                  >
                    <AppTypography color="secondary">add task</AppTypography>
                  </Button>
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
            </AppBox>
          </AppBox>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

const useStyles = makeStyles({
  button: {
    alignSelf: 'baseline',
    textTransform: 'none',
  },
  hint: {
    color: '#99989D',
  },
  timepicker: {
    width: 100,
  },
  iconCloseBtn: {
    color: '#99989D',
  },
})

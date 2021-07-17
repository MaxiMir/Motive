import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { v1 as uniqId } from 'uuid'
import { Field, FieldArray, Form, Formik } from 'formik'
import { object, string, array, SchemaOf } from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import { Button, IconButton } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { Goal } from 'dto'
import AppModal from 'components/UI/AppModal'
import AppHeader from 'components/UI/AppHeader'
import AppBox from 'components/UI/AppBox'
import AppInput from 'components/UI/AppInput'
import AppTypography from 'components/UI/AppTypography'
import { CloseIcon, PaulIcon } from 'components/UI/icons'
import AppGradientButton from 'components/UI/AppGradientButton'

const CircularProgress = dynamic(() => import('@material-ui/core/CircularProgress'))

interface UserCardAddGoalModalProps {
  onCreate: () => void
  onClose: () => void
}

const schema: SchemaOf<Goal> = object({
  title: string().trim().required('Goal title needed').min(5, "It's too short.").max(35, "It's so long."),
  tasks: array()
    .of(
      object({
        id: string().required(),
        title: string()
          .trim()
          .required('Task content is required')
          .min(5, "It's too short.")
          .max(255, "It's too long."),
        date: string(),
      }),
    )
    .required('This field is required'),
})

export default function UserCardAddGoalModal({ onCreate, onClose }: UserCardAddGoalModalProps): JSX.Element {
  const classes = useStyles()

  const generateNewTask = () => ({ id: uniqId(), title: '' })

  return (
    <AppModal title="Creating a new goal" onClose={onClose}>
      <Formik
        initialValues={{
          title: '',
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
        {({ values, isSubmitting }) => (
          <Form autoComplete="off">
            <AppBox flexDirection="column" spacing={3}>
              <Field name="title" label="Title *" color="secondary" component={AppInput} />
              <FieldArray name="tasks">
                {({ push, remove }) => (
                  <AppBox flexDirection="column" spacing={2}>
                    <AppHeader name="task" variant="h6" component="h2" color="primary">
                      Tasks
                    </AppHeader>
                    {values.tasks.map((task, index) => (
                      <Fragment key={task.id}>
                        <AppBox spacing={1} alignItems="center">
                          <Field
                            name={`tasks.${index}.title`}
                            label="Task"
                            color="secondary"
                            placeholder="What should be done"
                            multiline
                            rows={4}
                            rowsMax={4}
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
                <AppBox justifyContent="space-between">
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
})

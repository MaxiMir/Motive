import { Fragment } from 'react'
import { v1 as uniqId } from 'uuid'
import { Field, FieldArray, Form, Formik } from 'formik'
import { object, string, array, SchemaOf } from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import { Button, CircularProgress, IconButton } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { Goal } from 'dto'
import AppModal from 'components/UI/AppModal'
import AppHeader from 'components/UI/AppHeader'
import AppBox from 'components/UI/AppBox'
import AppInput from 'components/UI/AppInput'
import AppTypography from 'components/UI/AppTypography'
import { CloseIcon, PaulIcon } from 'components/UI/icons'

interface UserCardAddGoalModalProps {
  onClose: () => void
}

const schema: SchemaOf<Goal> = object({
  title: string().trim().required('Goal title needed').min(5, "It's too short.").max(25, "It's so long."),
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

export default function UserCardAddGoalModal({ onClose }: UserCardAddGoalModalProps): JSX.Element {
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
                        <AppBox spacing={2}>
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
                            className={classes.buttonClose}
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
                    <Button
                      startIcon={<Add color="secondary" />}
                      className={classes.buttonAdd}
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
                <AppTypography className={classes.hintText}>
                  He hunts for abandoned goals.
                  <br />
                  On the 14th day they get covered with 🕸.
                  <br />
                  On the 28th day he eats them.
                  <br />
                  And people have to start all over again.
                </AppTypography>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={isSubmitting ? <CircularProgress size="0.9rem" /> : undefined}
                >
                  {isSubmitting ? 'Submitting' : 'Submit'}
                </Button>
              </AppBox>
            </AppBox>
          </Form>
        )}
      </Formik>
    </AppModal>
  )
}

const useStyles = makeStyles({
  buttonClose: {
    padding: 0,
  },
  buttonAdd: {
    textTransform: 'none',
  },
  hintText: {
    color: '#99989D',
  },
})

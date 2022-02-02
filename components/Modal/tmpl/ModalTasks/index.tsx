import { FieldArray, Form, FormikProvider } from 'formik'
import { Button, createStyles, makeStyles } from '@material-ui/core'
import { GoalDto } from 'dto'
import { getTomorrow } from 'helpers/date'
import ModalAction from 'components/ModalAction'
import Task from 'components/Task'
import AppModal from 'components/UI/AppModal'
import useForm from './hook'

export interface ModalTasksProps {
  tmpl: 'tasks'
  goal: GoalDto
  onClose: () => void
}

export default function ModalTasks({ goal, onClose }: ModalTasksProps): JSX.Element {
  const classes = useStyles()
  const tomorrow = getTomorrow()
  const { isLoading, formik } = useForm(goal, onClose)
  const { values, setFieldValue, handleSubmit } = formik

  return (
    <AppModal
      title={
        <>
          Adding tasks for <span className={classes.tomorrow}>tomorrow</span>
        </>
      }
      maxWidth="xs"
      actions={[
        <ModalAction tmpl="close" onClick={onClose} />,
        <ModalAction
          tmpl="submit"
          isLoading={isLoading}
          name="Add"
          nameLoading="Adding"
          emoji="feedback"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={formik}>
        <Form autoComplete="off">
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
                    onToggleDate={(isChecked) => setFieldValue(`tasks.${index}.date`, isChecked ? tomorrow : undefined)}
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
    tomorrow: {
      color: theme.text.sand,
    },
  }),
)

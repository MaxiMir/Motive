import { useMemo } from 'react'
import { FieldArray, Form, FormikProvider, useFormik } from 'formik'
import { addDays } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { GoalDto } from 'dto'
import ModalAction from 'components/ModalAction'
import Task from 'components/Task'
import AppModal from 'components/UI/AppModal'
import schema from './schema'

export interface ModalTasksProps {
  tmpl: 'tasks'
  goal: GoalDto
  onClose: () => void
}

export default function ModalTasks({ onClose }: ModalTasksProps): JSX.Element {
  const isLoading = false
  const classes = useStyles()
  const tomorrow = useMemo(() => addDays(new Date(), 1), [])
  const formik = useFormik({
    initialValues: {
      tasks: [{ name: '', date: undefined }],
    },
    validationSchema: schema,
    async onSubmit(data) {
      console.log(data)
      // send({ ...data, hashtags: prepareHashtags(data.hashtags) })
    },
  })
  const { values, setFieldValue, handleSubmit } = formik

  return (
    <AppModal
      title="Adding tasks for tomorrow"
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

const useStyles = makeStyles({
  button: {
    alignSelf: 'baseline',
    textTransform: 'none',
  },
})

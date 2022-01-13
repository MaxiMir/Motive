import { useMemo } from 'react'
import { FieldArray, Form, FormikProvider, useFormik } from 'formik'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { GoalDto } from 'dto'
import GoalService from 'services/GoalService'
import { getTomorrow } from 'helpers/date'
import useSend from 'hooks/useSend'
import { useMutateGoals } from 'views/User/hook'
import ModalAction from 'components/ModalAction'
import Task from 'components/Task'
import AppModal from 'components/UI/AppModal'
import produce from 'immer'
import schema from './schema'

export interface ModalTasksProps {
  tmpl: 'tasks'
  goal: GoalDto
  onClose: () => void
}

export default function ModalTasks({ goal, onClose }: ModalTasksProps): JSX.Element {
  const classes = useStyles()
  const tomorrow = useMemo(getTomorrow, [])
  const [goals, mutateGoals] = useMutateGoals()
  const { isLoading, send } = useSend(GoalService.addDay, {
    onSuccess(data) {
      // change url + change date
      mutateGoals(
        produce(goals, (draft: GoalDto[]) => {
          const draftGoal = draft[draft.findIndex((g) => g.id === goal.id)]
          draftGoal.days = data.days
        }),
      )
    },
  })
  const formik = useFormik({
    initialValues: {
      id: goal.id,
      tasks: [{ name: '', date: undefined }],
    },
    validationSchema: schema,
    async onSubmit(data) {
      send(data)
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

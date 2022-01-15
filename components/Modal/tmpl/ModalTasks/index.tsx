import { useMemo } from 'react'
import { FieldArray, Form, FormikProvider, useFormik } from 'formik'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { GoalDto } from 'dto'
import GoalService from 'services/GoalService'
import { getTomorrow } from 'helpers/date'
import useSend from 'hooks/useSend'
import useChangeDayUrl from 'hooks/useChangeDayUrl'
import { useMutatePage } from 'views/User/hook'
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
  const [page, mutate] = useMutatePage()
  const changeDayUrl = useChangeDayUrl()
  const { isLoading, send } = useSend(GoalService.addDay, {
    onSuccess(data) {
      const [day] = data.days

      mutate(
        produce(page, (draft) => {
          const draftGoals = draft.content.goals
          const draftGoal = draftGoals[draftGoals.findIndex((g) => g.id === goal.id)]

          draftGoal.calendar.push({ id: day.id, date: day.date })
          draftGoal.days = [day]
        }),
      )
      changeDayUrl(page.content.goals, goal.id, data.days[0].id)
      onClose()
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

const useStyles = makeStyles({
  button: {
    alignSelf: 'baseline',
    textTransform: 'none',
  },
  tomorrow: {
    color: '#ad998b',
  },
})

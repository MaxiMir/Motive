import { Form, Formik } from 'formik'
import { Task } from 'dto'
import AppCheckbox from 'components/UI/AppCheckbox'

interface GoalCardTaskFormProps {
  tasks: Task[]
}

export default function GoalCardTaskForm({ tasks }: GoalCardTaskFormProps): JSX.Element {
  return (
    <Formik
      initialValues={{ tasks }}
      onSubmit={async (values) => {
        await new Promise<void>((r) =>
          setTimeout(() => {
            console.log(values)
            r()
          }, 3000),
        )
      }}
    >
      {({ values, setFieldValue }) => (
        <Form autoComplete="off">
          {values.tasks.map(({ name, completed }, index) => (
            <AppCheckbox
              name={`tasks.${index}.completed`}
              label={name}
              checked={completed}
              disabled={completed}
              onChange={(_, isChecked) => setFieldValue(`tasks.${index}.completed`, isChecked)}
            />
          ))}
        </Form>
      )}
    </Formik>
  )
}

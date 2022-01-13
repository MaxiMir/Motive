import dynamic from 'next/dynamic'
import { TaskFieldProps } from './tmpl/TaskField'

const TaskField = dynamic(() => import('./tmpl/TaskField'))

export default function Task(props: TaskFieldProps): JSX.Element {
  switch (props.tmpl) {
    case 'field':
      return <TaskField {...props} />
  }
}

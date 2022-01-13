import dynamic from 'next/dynamic'
import { ModalAuthProps } from './tmpl/ModalAuth'
import { ModalGoalProps } from './tmpl/ModalGoal'
import { ModalFeedbackProps } from './tmpl/ModalFeedback'
import { ModalTasksProps } from './tmpl/ModalTasks'

const ModalAuth = dynamic(() => import('./tmpl/ModalAuth'))
const ModalGoal = dynamic(() => import('./tmpl/ModalGoal'))
const ModalFeedback = dynamic(() => import('./tmpl/ModalFeedback'))
const ModalTasks = dynamic(() => import('./tmpl/ModalTasks'))

export default function Modal(
  props: ModalAuthProps | ModalGoalProps | ModalFeedbackProps | ModalTasksProps,
): JSX.Element {
  switch (props.tmpl) {
    case 'auth':
      return <ModalAuth {...props} />
    case 'goal':
      return <ModalGoal {...props} />
    case 'feedback':
      return <ModalFeedback {...props} />
    case 'tasks':
      return <ModalTasks {...props} />
  }
}

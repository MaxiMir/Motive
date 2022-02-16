import dynamic from 'next/dynamic'
import { ModalAuthProps } from './tmpl/ModalAuth'
import { ModalGoalProps } from './tmpl/ModalGoal'
import { ModalFeedbackProps } from './tmpl/ModalFeedback'
import { ModalTasksProps } from './tmpl/ModalTasks'
import { ModalCompleteProps } from './tmpl/ModalComplete'
import { ModalFollowersProps } from './tmpl/ModalFollowers'
import { ModalStageProps } from './tmpl/ModalStage'
import { ModalSupportProps } from './tmpl/ModalSupport'
import { ModalEditMessageProps } from './tmpl/ModalEditMessage'

const ModalAuth = dynamic(() => import('./tmpl/ModalAuth'))
const ModalGoal = dynamic(() => import('./tmpl/ModalGoal'))
const ModalFeedback = dynamic(() => import('./tmpl/ModalFeedback'))
const ModalTasks = dynamic(() => import('./tmpl/ModalTasks'))
const ModalComplete = dynamic(() => import('./tmpl/ModalComplete'))
const ModalFollowers = dynamic(() => import('./tmpl/ModalFollowers'))
const ModalStage = dynamic(() => import('./tmpl/ModalStage'))
const ModalSupport = dynamic(() => import('./tmpl/ModalSupport'))
const ModalEditMessage = dynamic(() => import('./tmpl/ModalEditMessage'))

export default function Modal(
  props:
    | ModalAuthProps
    | ModalGoalProps
    | ModalFeedbackProps
    | ModalTasksProps
    | ModalCompleteProps
    | ModalFollowersProps
    | ModalStageProps
    | ModalSupportProps
    | ModalEditMessageProps,
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
    case 'complete':
      return <ModalComplete {...props} />
    case 'followers':
      return <ModalFollowers {...props} />
    case 'stage':
      return <ModalStage {...props} />
    case 'support':
      return <ModalSupport {...props} />
    case 'edit-message':
      return <ModalEditMessage {...props} />
  }
}

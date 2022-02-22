import dynamic from 'next/dynamic'
import { ModalAuthProps } from './tmpl/ModalAuth'
import { ModalGoalProps } from './tmpl/ModalGoal'
import { ModalFeedbackProps } from './tmpl/ModalFeedback'
import { ModalTasksProps } from './tmpl/ModalTasks'
import { ModalCompletionProps } from './tmpl/ModalCompletion'
import { ModalFollowersProps } from './tmpl/ModalFollowers'
import { ModalStageProps } from './tmpl/ModalStage'
import { ModalSupportProps } from './tmpl/ModalSupport'
import { ModalEditMessageProps } from './tmpl/ModalEditMessage'
import { ModalCompletedProps } from './tmpl/ModalCompleted'

const ModalAuth = dynamic(() => import('./tmpl/ModalAuth'))
const ModalGoal = dynamic(() => import('./tmpl/ModalGoal'))
const ModalFeedback = dynamic(() => import('./tmpl/ModalFeedback'))
const ModalTasks = dynamic(() => import('./tmpl/ModalTasks'))
const ModalCompletion = dynamic(() => import('./tmpl/ModalCompletion'))
const ModalFollowers = dynamic(() => import('./tmpl/ModalFollowers'))
const ModalStage = dynamic(() => import('./tmpl/ModalStage'))
const ModalSupport = dynamic(() => import('./tmpl/ModalSupport'))
const ModalEditMessage = dynamic(() => import('./tmpl/ModalEditMessage'))
const ModalCompleted = dynamic(() => import('./tmpl/ModalCompleted'))

export default function Modal(
  props:
    | ModalAuthProps
    | ModalGoalProps
    | ModalFeedbackProps
    | ModalTasksProps
    | ModalCompletionProps
    | ModalFollowersProps
    | ModalStageProps
    | ModalSupportProps
    | ModalEditMessageProps
    | ModalCompletedProps,
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
    case 'completion':
      return <ModalCompletion {...props} />
    case 'followers':
      return <ModalFollowers {...props} />
    case 'stage':
      return <ModalStage {...props} />
    case 'support':
      return <ModalSupport {...props} />
    case 'edit-message':
      return <ModalEditMessage {...props} />
    case 'completed':
      return <ModalCompleted {...props} />
  }
}

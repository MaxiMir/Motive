import dynamic from 'next/dynamic'
import { ModalSignInProps } from './tmpl/ModalSignIn'
import { ModalGoalProps } from './tmpl/ModalGoal'
import { ModalFeedbackProps } from './tmpl/ModalFeedback'
import { ModalTasksProps } from './tmpl/ModalTasks'
import { ModalCompletionProps } from './tmpl/ModalCompletion'
import { ModalFollowersProps } from './tmpl/ModalFollowers'
import { ModalStageProps } from './tmpl/ModalStage'
import { ModalSupportProps } from './tmpl/ModalSupport'
import { ModalEditMessageProps } from './tmpl/ModalEditMessage'
import { ModalCompletedProps } from './tmpl/ModalCompleted'
import { ModalJoinProps } from './tmpl/ModalJoin'
import { ModalLeaveProps } from './tmpl/ModalLeave'

const ModalSignIn = dynamic(() => import('./tmpl/ModalSignIn'))
const ModalGoal = dynamic(() => import('./tmpl/ModalGoal'))
const ModalFeedback = dynamic(() => import('./tmpl/ModalFeedback'))
const ModalTasks = dynamic(() => import('./tmpl/ModalTasks'))
const ModalCompletion = dynamic(() => import('./tmpl/ModalCompletion'))
const ModalFollowers = dynamic(() => import('./tmpl/ModalFollowers'))
const ModalStage = dynamic(() => import('./tmpl/ModalStage'))
const ModalSupport = dynamic(() => import('./tmpl/ModalSupport'))
const ModalEditMessage = dynamic(() => import('./tmpl/ModalEditMessage'))
const ModalCompleted = dynamic(() => import('./tmpl/ModalCompleted'))
const ModalJoin = dynamic(() => import('./tmpl/ModalJoin'))
const ModalLeave = dynamic(() => import('./tmpl/ModalLeave'))

export default function Modal(
  props:
    | ModalSignInProps
    | ModalGoalProps
    | ModalFeedbackProps
    | ModalTasksProps
    | ModalCompletionProps
    | ModalFollowersProps
    | ModalStageProps
    | ModalSupportProps
    | ModalEditMessageProps
    | ModalCompletedProps
    | ModalJoinProps
    | ModalLeaveProps,
): JSX.Element {
  switch (props.tmpl) {
    case 'signIn':
      return <ModalSignIn {...props} />
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
    case 'join':
      return <ModalJoin {...props} />
    case 'leave':
      return <ModalLeave {...props} />
  }
}

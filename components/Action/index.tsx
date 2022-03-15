import dynamic from 'next/dynamic'
import { ActionSubmitProps } from './tmpl/ActionSubmit'
import { ActionCloseProps } from './tmpl/ActionClose'
import { ActionGoalProps } from './tmpl/ActionGoal'

const ActionSubmit = dynamic(() => import('./tmpl/ActionSubmit'))
const ActionClose = dynamic(() => import('./tmpl/ActionClose'))
const ActionGoal = dynamic(() => import('./tmpl/ActionGoal'))

export default function Action(props: ActionSubmitProps | ActionCloseProps | ActionGoalProps): JSX.Element {
  switch (props.tmpl) {
    case 'submit':
      return <ActionSubmit {...props} />
    case 'close':
      return <ActionClose {...props} />
    case 'goal':
      return <ActionGoal {...props} />
  }
}

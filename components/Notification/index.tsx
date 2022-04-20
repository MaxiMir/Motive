import dynamic from 'next/dynamic'
import { NotificationDto } from 'dto'

const NotificationGoal = dynamic(() => import('./tmpl/NotificationGoal'))

export default function Notification(props: NotificationDto): JSX.Element {
  switch (props.tmpl) {
    case 'goal':
      return <NotificationGoal {...props} />
  }
}

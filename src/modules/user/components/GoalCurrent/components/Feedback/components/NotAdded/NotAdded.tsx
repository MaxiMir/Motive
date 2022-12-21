import dynamic from 'next/dynamic'
import { OwnershipDto } from '@features/member'

const Soon = dynamic(() => import('./components/Soon/Soon'))
const FeedbackAdd = dynamic(() => import('./components/FeedbackAdd'))

interface NotAddedProps {
  forTomorrow: boolean
  clientOwnership: OwnershipDto
}

function NotAdded({ forTomorrow, clientOwnership }: NotAddedProps) {
  return <>{!clientOwnership.goal ? <Soon /> : <FeedbackAdd forTomorrow={forTomorrow} />}</>
}

export default NotAdded

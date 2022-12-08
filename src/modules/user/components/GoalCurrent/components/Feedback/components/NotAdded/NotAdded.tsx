import dynamic from 'next/dynamic'
import { OwnershipDto } from '@dto'

const Soon = dynamic(() => import('./components/Soon'))
const FeedbackAdd = dynamic(() => import('./components/FeedbackAdd'))

interface NotAddedProps {
  forTomorrow: boolean
  clientOwnership: OwnershipDto
}

function NotAdded({ forTomorrow, clientOwnership }: NotAddedProps) {
  return <>{!clientOwnership.goal ? <Soon /> : <FeedbackAdd forTomorrow={forTomorrow} />}</>
}

export default NotAdded

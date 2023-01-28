import dynamic from 'next/dynamic'
import { MemberDto } from 'shared/api'
import { useNextDayId } from './hooks/useNextDayId'

const EndOfDay = dynamic(() => import('./components/EndOfDay'))
const Done = dynamic(() => import('./components/Done'))

interface CompletionProps {
  forTomorrow: boolean
  clientMember: MemberDto
}

function Completion({ forTomorrow, clientMember }: CompletionProps) {
  const nextDayId = useNextDayId()

  return (
    <>
      {!nextDayId ? (
        <Done forTomorrow={forTomorrow} />
      ) : (
        <EndOfDay nextDayId={nextDayId} forTomorrow={forTomorrow} clientMember={clientMember} />
      )}
    </>
  )
}

export default Completion

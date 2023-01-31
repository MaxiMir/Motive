import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useOpenSignIn } from 'entities/signin'
import { useClient } from 'entities/user'
import { CalendarDto } from 'shared/api'
import { useToggle } from 'shared/lib/hooks'
import BlueButton from 'shared/ui/BlueButton'

const CreateMemberModal = dynamic(() => import('features/member/create-member'))

interface JoinProps {
  goalId: number
  dayId: number
  calendar: CalendarDto[]
  ownerName: string
}

function Join({ goalId, dayId, calendar, ownerName }: JoinProps) {
  const client = useClient()
  const openSignIn = useOpenSignIn()
  const { formatMessage } = useIntl()
  const [open, toggle] = useToggle()
  const buttonText = formatMessage({ id: 'common.join' })

  const onClick = () => {
    if (!client) {
      openSignIn({ callbackUrl: window.location.href })
      return
    }

    toggle()
  }

  return (
    <>
      <BlueButton size="small" onClick={onClick}>
        {buttonText}
      </BlueButton>
      {open && (
        <CreateMemberModal
          goalId={goalId}
          dayId={dayId}
          calendar={calendar}
          ownerName={ownerName}
          onClose={toggle}
        />
      )}
    </>
  )
}

export default Join

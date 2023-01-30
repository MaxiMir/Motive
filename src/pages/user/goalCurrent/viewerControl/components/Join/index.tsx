import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useOpenSignIn } from 'entities/signin'
import { useClient } from 'entities/user'
import { useToggle } from 'shared/lib/hooks'
import BlueButton from 'shared/ui/BlueButton'

const JoinModal = dynamic(() => import('./joinModal'))

function Join() {
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
      {open && <JoinModal onClose={toggle} />}
    </>
  )
}

export default Join

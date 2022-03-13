import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@material-ui/core'
import { GoalDto, MemberDto } from 'dto'
import useClient from 'hooks/useClient'
import useOpenSignIn from 'hooks/useOpenSignIn'
import AppEmoji from 'components/UI/AppEmoji'

const Modal = dynamic(() => import('components/Modal'))

interface MembershipProps {
  goal: GoalDto
  member?: MemberDto
}

export default function Membership({ goal, member }: MembershipProps): JSX.Element {
  const client = useClient()
  const openSignIn = useOpenSignIn()
  const [modal, setModal] = useState<'subscribe' | 'unsubscribe'>()

  const onClick = () => {
    if (!client) {
      openSignIn({ callbackUrl: window.location.href })
      return
    }

    setModal(!member ? 'subscribe' : 'unsubscribe')
  }

  const onClose = () => setModal(undefined)

  return (
    <>
      <Button
        variant="outlined"
        color={member ? 'primary' : 'secondary'}
        startIcon={<AppEmoji name={member ? 'unsubscribe' : 'subscribe'} onlyEmoji />}
        onClick={onClick}
      >
        {member ? 'Leave' : 'Join'}
      </Button>
      {modal && <Modal tmpl={modal} goal={goal} onClose={onClose} />}
    </>
  )
}

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { GoalDto, UserBaseDto } from '@dto'
import useClient from '@hooks/useClient'
import useOpenSignIn from '@hooks/useOpenSignIn'
import ActionGoal from '@components/Action/ActionGoal'

const ModalSupport = dynamic(() => import('./components/ModalSupport'))

interface ReactionSupportProps {
  goal: GoalDto
  owner: UserBaseDto
}

function ReactionSupport({ goal, owner }: ReactionSupportProps) {
  const { formatMessage } = useIntl()
  const client = useClient()
  const openSignIn = useOpenSignIn()
  const [open, setOpen] = useState(false)
  const supportingText = formatMessage({ id: 'common.supporting' })
  const title = `${supportingText} ${owner.name}`

  const toggleModal = () => setOpen(!open)

  const onClick = () => {
    if (!client) {
      openSignIn({ callbackUrl: window.location.href })
      return
    }

    toggleModal()
  }

  return (
    <>
      <ActionGoal name="support" title={title} onClick={onClick} />
      {open && <ModalSupport goal={goal} owner={owner} onClose={toggleModal} />}
    </>
  )
}

export default ReactionSupport

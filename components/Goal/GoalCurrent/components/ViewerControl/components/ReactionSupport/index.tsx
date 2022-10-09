import { useState } from 'react'
import dynamic from 'next/dynamic'
import { GoalDto, UserBaseDto } from 'dto'
import { Locale } from 'hooks/useLocale'
import useClient from 'hooks/useClient'
import useOpenSignIn from 'hooks/useOpenSignIn'
import ActionGoal from 'components/Action/ActionGoal'
import i18n from './i18n'

const ModalSupport = dynamic(() => import('./components/ModalSupport'))

interface ReactionSupportProps {
  goal: GoalDto
  owner: UserBaseDto
  locale: Locale
}

export default function ReactionSupport({ goal, owner, locale }: ReactionSupportProps) {
  const client = useClient()
  const openSignIn = useOpenSignIn()
  const [open, setOpen] = useState(false)
  const { getTitle } = i18n[locale]
  const title = getTitle(owner.name)

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

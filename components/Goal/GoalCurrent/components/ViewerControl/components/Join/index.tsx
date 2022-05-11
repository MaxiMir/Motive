import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@mui/material'
import { GoalDto } from 'dto'
import useClient from 'hooks/useClient'
import { Locale } from 'hooks/useLocale'
import useOpenSignIn from 'hooks/useOpenSignIn'
import AppEmoji from 'components/UI/AppEmoji'
import i18n from './i18n'

const ModalJoin = dynamic(() => import('components/Modal/ModalJoin'))

export interface JoinProps {
  goal: GoalDto
  locale: Locale
}

export default function Join({ goal, locale }: JoinProps) {
  const client = useClient()
  const openSignIn = useOpenSignIn()
  const [open, setOpen] = useState(false)
  const { button } = i18n[locale]

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
      <Button variant="outlined" color="primary" startIcon={<AppEmoji name="join" onlyEmoji />} onClick={onClick}>
        {button}
      </Button>
      {open && <ModalJoin goal={goal} onClose={toggleModal} />}
    </>
  )
}
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@mui/material'
import { GoalDto } from 'dto'
import useClient from 'hooks/useClient'
import { Locale } from 'hooks/useLocale'
import useOpenSignIn from 'hooks/useOpenSignIn'
import AppEmoji from 'components/UI/AppEmoji'
import i18n from './i18n'

const Modal = dynamic(() => import('components/Modal'))

export interface JoinProps {
  goal: GoalDto
  locale: Locale
}

export default function Join({ goal, locale }: JoinProps): JSX.Element {
  const client = useClient()
  const openSignIn = useOpenSignIn()
  const [open, setOpen] = useState(false)
  const { buttonName } = i18n[locale]

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
      <Button variant="outlined" color="secondary" startIcon={<AppEmoji name="join" onlyEmoji />} onClick={onClick}>
        {buttonName}
      </Button>
      {open && <Modal tmpl="join" goal={goal} onClose={toggleModal} />}
    </>
  )
}

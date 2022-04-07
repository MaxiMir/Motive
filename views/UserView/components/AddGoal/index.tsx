import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@mui/material'
import { Locale } from 'hooks/useLocale'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import i18n from './i18n'

const Modal = dynamic(() => import('components/Modal'))

interface AddGoalProps {
  locale: Locale
}

export default function AddGoal({ locale }: AddGoalProps): JSX.Element {
  const [open, setOpen] = useState(false)
  const { name } = i18n[locale]

  const toggleModal = () => setOpen(!open)

  return (
    <AppBox justifyContent="center">
      <Button variant="outlined" color="info" startIcon={<AppEmoji name="goal" onlyEmoji />} onClick={toggleModal}>
        {name}
      </Button>
      {open && <Modal tmpl="goal" locale={locale} onClose={toggleModal} />}
    </AppBox>
  )
}

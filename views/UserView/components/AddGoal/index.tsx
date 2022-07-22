import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Box, Button } from '@mui/material'
import useLocale from 'hooks/useLocale'
import AppEmoji from 'components/ui/AppEmoji'
import i18n from './i18n'

const ModalGoal = dynamic(() => import('components/Modal/ModalGoal'))

export default function AddGoal() {
  const { locale } = useLocale()
  const [open, setOpen] = useState(false)
  const { name } = i18n[locale]

  const toggleModal = () => setOpen(!open)

  return (
    <Box display="flex" justifyContent="center">
      <Button variant="outlined" color="info" startIcon={<AppEmoji name="goal" onlyEmoji />} onClick={toggleModal}>
        {name}
      </Button>
      {open && <ModalGoal locale={locale} onClose={toggleModal} />}
    </Box>
  )
}

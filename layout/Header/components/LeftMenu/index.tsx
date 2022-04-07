import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@mui/material'
import useLocale from 'hooks/useLocale'
import AppIcon from 'components/UI/AppIcon'
import i18n from './i18n'

const MenuModal = dynamic(() => import('./components/MenuModal'))

export default function LeftMenu(): JSX.Element {
  const { locale } = useLocale()
  const [open, setOpen] = useState(false)
  const i18nElements = i18n[locale]
  const { ariaLabel } = i18nElements

  const toggleModal = () => setOpen(!open)

  return (
    <div>
      <Button aria-label={ariaLabel} sx={{ color: 'common.white' }} onClick={toggleModal}>
        <AppIcon name="menu" />
      </Button>
      {open && <MenuModal onClose={toggleModal} />}
    </div>
  )
}

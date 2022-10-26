import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Button } from '@mui/material'
import AppIcon from '@ui/AppIcon'
import i18n from './i18n'

const MenuModal = dynamic(() => import('./components/MenuModal'))
const ModalSettings = dynamic(() => import('./components/ModalSettings'))

export default function LeftMenu() {
  const { locale } = useIntl()
  const [openMenu, setOpenMenu] = useState(false)
  const [openSettings, setOpenSettings] = useState(false)
  const i18nElements = i18n[locale]
  const { ariaLabel } = i18nElements

  const toggleMenu = () => setOpenMenu(!openMenu)

  const onOpenSettings = () => {
    setOpenSettings(true)
    toggleMenu()
  }

  const onCloseSettings = () => setOpenSettings(false)

  return (
    <>
      <Button aria-label={ariaLabel} sx={{ color: 'common.white' }} onClick={toggleMenu}>
        <AppIcon name="menu" />
      </Button>
      {openMenu && <MenuModal onOpenSettings={onOpenSettings} onClose={toggleMenu} />}
      {openSettings && <ModalSettings onClose={onCloseSettings} />}
    </>
  )
}

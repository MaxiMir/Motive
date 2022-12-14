import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@mui/material'
import AppIcon from '@ui/AppIcon'
import { useMessages } from './hooks/useMessages'

const MenuModal = dynamic(() => import('./components/MenuModal'))
const ModalSettings = dynamic(() => import('./components/ModalSettings'))

function LeftMenu() {
  const messages = useMessages()
  const [openMenu, setOpenMenu] = useState(false)
  const [openSettings, setOpenSettings] = useState(false)

  const toggleMenu = () => setOpenMenu(!openMenu)

  const onOpenSettings = () => {
    setOpenSettings(true)
    toggleMenu()
  }

  const onCloseSettings = () => setOpenSettings(false)

  return (
    <>
      <Button
        aria-label={messages.ariaLabel}
        aria-expanded={openMenu ? 'true' : undefined}
        aria-haspopup="true"
        sx={{ color: 'common.white' }}
        onClick={toggleMenu}
      >
        <AppIcon name="menu" />
      </Button>
      {openMenu && <MenuModal onOpenSettings={onOpenSettings} onClose={toggleMenu} />}
      {openSettings && <ModalSettings onClose={onCloseSettings} />}
    </>
  )
}

export default LeftMenu

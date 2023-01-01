import { useState } from 'react'
import dynamic from 'next/dynamic'
import { IconButton } from '@mui/material'
import AppIcon from '@ui/AppIcon'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'

const MenuModal = dynamic(() => import('./components/MenuModal'))
const SettingsModal = dynamic(() => import('./components/SettingsModal'))

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
      <TooltipArrow title={messages.ariaLabel}>
        <IconButton
          aria-haspopup="true"
          aria-expanded={openMenu ? 'true' : undefined}
          onClick={toggleMenu}
        >
          <AppIcon name="menu" />
        </IconButton>
      </TooltipArrow>
      {openMenu && <MenuModal onOpenSettings={onOpenSettings} onClose={toggleMenu} />}
      {openSettings && <SettingsModal onClose={onCloseSettings} />}
    </>
  )
}

export default LeftMenu

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { IconButton } from '@mui/material'
import Icon from '@ui/Icon'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'

const NavigationModal = dynamic(() => import('./components/NavigationModal'))
const SettingsModal = dynamic(() => import('./components/SettingsModal'))

function Sidebar() {
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
      <TooltipArrow title={messages.title}>
        <IconButton
          aria-haspopup="true"
          aria-expanded={openMenu ? 'true' : undefined}
          onClick={toggleMenu}
        >
          <Icon name="menu" />
        </IconButton>
      </TooltipArrow>
      {openMenu && <NavigationModal onOpenSettings={onOpenSettings} onClose={toggleMenu} />}
      {openSettings && <SettingsModal onClose={onCloseSettings} />}
    </>
  )
}

export default Sidebar

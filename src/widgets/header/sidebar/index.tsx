import { IconButton } from '@mui/material'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useMessage } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'
import { TooltipArrow } from 'shared/ui/styled'

const SidebarModal = dynamic(() => import('./sidebarModal'))
const SettingsModal = dynamic(() => import('./settingsModal'))

export function Sidebar() {
  const title = useMessage('common.open-menu')
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
      <TooltipArrow title={title}>
        <IconButton
          aria-haspopup="true"
          aria-expanded={openMenu ? 'true' : undefined}
          onClick={toggleMenu}
        >
          <Icon name="menu" />
        </IconButton>
      </TooltipArrow>
      {openMenu && <SidebarModal onOpenSettings={onOpenSettings} onClose={toggleMenu} />}
      {openSettings && <SettingsModal onClose={onCloseSettings} />}
    </>
  )
}

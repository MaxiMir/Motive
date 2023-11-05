import { IconButton } from '@mui/material'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import Icon from 'shared/ui/icon'
import TooltipArrow from 'shared/ui/tooltip-arrow'

const SidebarModal = dynamic(() => import('./sidebar-modal'))
const SettingsModal = dynamic(() => import('./settings-modal'))

export function Sidebar() {
  const { formatMessage } = useIntl()
  const [openMenu, setOpenMenu] = useState(false)
  const [openSettings, setOpenSettings] = useState(false)
  const title = formatMessage({ id: 'common.open-menu' })

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

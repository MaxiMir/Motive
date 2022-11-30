import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Button } from '@mui/material'
import AppIcon from '@ui/AppIcon'

const MenuModal = dynamic(() => import('./components/MenuModal'))
const ModalSettings = dynamic(() => import('./components/ModalSettings'))

function LeftMenu() {
  const { formatMessage } = useIntl()
  const ariaLabel = formatMessage({ id: 'common.open-menu' })
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
        aria-label={ariaLabel}
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

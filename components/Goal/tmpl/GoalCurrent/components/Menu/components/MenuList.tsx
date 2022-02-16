import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Menu } from '@material-ui/core'
import { RoleDto, UserBaseDto } from 'dto'
import AppMenuItem from 'components/UI/AppMenuItem'

const Report = dynamic(() => import('components/Report'))

interface MenuListProps {
  anchorEl: HTMLElement
  goalId: number
  client?: UserBaseDto
  role: RoleDto
  onShare: () => void
  onClose: () => void
}

export default function MenuList({ anchorEl, goalId, client, role, onShare, onClose }: MenuListProps): JSX.Element {
  const [withReport, setWithReport] = useState(false)

  const onOpenReport = () => setWithReport(true)

  const onCloseReport = () => {
    setWithReport(false)
    onClose()
  }

  return (
    <>
      <Menu id="goal-menu" anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={onClose}>
        <AppMenuItem icon="share" text="Share" onClick={onShare} />
        {role !== 'OWNER' && <AppMenuItem icon="outlined_flag" text="Report" onClick={onOpenReport} />}
        <AppMenuItem icon="not_interested" text="Cancel" onClick={onClose} />
      </Menu>
      {withReport && (
        <Report entityId={goalId} type="goal" anchorEl={anchorEl} client={client} onClose={onCloseReport} />
      )}
    </>
  )
}

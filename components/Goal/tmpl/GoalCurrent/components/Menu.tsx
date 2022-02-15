import { MouseEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { MenuItem } from '@material-ui/core'
import { RoleDto, UserBaseDto } from 'dto'
import Share from 'components/Share'
import AppMenuButton from 'components/UI/AppMenuButton'

const MUMenu = dynamic(() => import('@material-ui/core/Menu'))
const Report = dynamic(() => import('components/Report'))

interface MenuProps {
  goalId: number
  title: string
  href: string
  role: RoleDto
  client?: UserBaseDto
}

export default function Menu({ goalId, title, href, role, client }: MenuProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [withShare, setWithShare] = useState(false)
  const [withReport, setWithReport] = useState(false)

  const onShare = () => {
    onCloseMenu()
    setWithShare(true)
  }

  const onOpenMenu = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onCloseMenu = () => setAnchorEl(null)

  const onOpenReport = () => setWithReport(true)

  const onCloseReport = () => {
    setWithReport(false)
    onCloseMenu()
  }

  return (
    <>
      <AppMenuButton ariaControls="goal-menu" title="open goal menu" onClick={onOpenMenu} />
      {anchorEl && (
        <>
          <MUMenu id="goal-menu" anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={onCloseMenu}>
            <MenuItem onClick={onShare}>Share</MenuItem>
            {role !== 'OWNER' && <MenuItem onClick={onOpenReport}>Report</MenuItem>}
            <MenuItem onClick={onCloseMenu}>Cancel</MenuItem>
          </MUMenu>
          {withReport && (
            <Report entityId={goalId} type="goal" anchorEl={anchorEl} client={client} onClose={onCloseReport} />
          )}
        </>
      )}
      <Share open={withShare} title={title} href={href} onClose={() => setWithShare(false)} />
    </>
  )
}

import { MouseEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { MenuItem } from '@material-ui/core'
import { RoleDto } from 'dto'
import Share from 'components/Share'
import AppMenuButton from 'components/UI/AppMenuButton'

const MUMenu = dynamic(() => import('@material-ui/core/Menu'))

interface MenuProps {
  title: string
  href: string
  role: RoleDto
}

export default function Menu({ title, href, role }: MenuProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [withShare, setWithShare] = useState(false)
  const [withReport, setWithReport] = useState(false)

  const onShare = () => {
    onCloseMenu()
    setWithShare(true)
  }

  const onOpenMenu = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onOpenReport = () => setWithReport(true)

  const onCloseReport = () => {
    setWithReport(false)
    onCloseMenu()
  }

  const onCloseMenu = () => setAnchorEl(null)

  return (
    <>
      <AppMenuButton ariaControls="goal-menu" title="open goal menu" onClick={onOpenMenu} />
      {anchorEl && (
        <MUMenu id="goal-menu" anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={onCloseMenu}>
          <MenuItem onClick={onShare}>Share</MenuItem>
          {role !== 'OWNER' && <MenuItem onClick={onOpenReport}>Report</MenuItem>}
          <MenuItem onClick={onCloseMenu}>Cancel</MenuItem>
        </MUMenu>
      )}
      {withReport && (
        <MUMenu id="report-menu" anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={onCloseReport}>
          <MenuItem disabled>Select a reason:</MenuItem>
          <MenuItem onClick={onCloseReport}>Nudity</MenuItem>
          <MenuItem onClick={onCloseReport}>Violence</MenuItem>
          <MenuItem onClick={onCloseReport}>Terrorism</MenuItem>
          <MenuItem onClick={onCloseReport}>Spam</MenuItem>
          <MenuItem onClick={onCloseReport}>Something else</MenuItem>
          <MenuItem onClick={onCloseReport}>Cancel</MenuItem>
        </MUMenu>
      )}
      <Share open={withShare} title={title} href={href} onClose={() => setWithShare(false)} />
    </>
  )
}

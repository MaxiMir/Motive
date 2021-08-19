import { useState } from 'react'
import dynamic from 'next/dynamic'
import { MenuItem } from '@material-ui/core'
import Share from 'components/Share'
import AppMenuButton from 'components/UI/AppMenuButton'

const Menu = dynamic(() => import('@material-ui/core/Menu'))
const AppSnackbar = dynamic(() => import('components/UI/AppSnackbar'))

interface GoalCardMenuProps {
  title: string
  href: string
}

export default function GoalCardMenu({ title, href }: GoalCardMenuProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [withShare, setWithShare] = useState(false)
  const [withReport, setWithReport] = useState(false)
  const [message, setMessage] = useState<string>()

  const onShare = () => {
    onCloseMenu()
    setWithShare(true)
  }

  const onCloseReport = () => {
    setWithReport(false)
    onCloseMenu()
  }

  const onCloseMenu = () => setAnchorEl(null)

  return (
    <>
      <AppMenuButton ariaControls="goal-menu" title="open goal menu" onClick={(e) => setAnchorEl(e.currentTarget)} />
      {anchorEl && (
        <Menu id="goal-menu" anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={onCloseMenu}>
          <MenuItem onClick={onShare}>Share</MenuItem>
          <MenuItem onClick={() => setWithReport(true)}>Report</MenuItem>
          <MenuItem onClick={onCloseMenu}>Cancel</MenuItem>
        </Menu>
      )}
      {withReport && (
        <Menu id="report-menu" anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={onCloseReport}>
          <MenuItem disabled>Select a reason:</MenuItem>
          <MenuItem onClick={onCloseReport}>Nudity</MenuItem>
          <MenuItem onClick={onCloseReport}>Violence</MenuItem>
          <MenuItem onClick={onCloseReport}>Terrorism</MenuItem>
          <MenuItem onClick={onCloseReport}>Spam</MenuItem>
          <MenuItem onClick={onCloseReport}>Something else</MenuItem>
          <MenuItem onClick={onCloseReport}>Cancel</MenuItem>
        </Menu>
      )}
      <Share open={withShare} title={title} href={href} onClose={() => setWithShare(false)} />
      {message && (
        <AppSnackbar severity="success" autoHideDuration={3000} onClose={() => setMessage(undefined)}>
          {message}
        </AppSnackbar>
      )}
    </>
  )
}
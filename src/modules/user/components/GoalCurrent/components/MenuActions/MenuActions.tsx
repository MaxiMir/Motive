import { MouseEvent, useId, useState } from 'react'
import dynamic from 'next/dynamic'
import { Box, IconButton, Menu, MenuItem } from '@mui/material'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks/useGoalContext'
import { OwnershipDto } from '@features/member'
import useToggle from '@hooks/useToggle'
import AppIcon from '@ui/AppIcon'
import AppListItem from '@ui/AppListItem'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'

const Report = dynamic(() => import('@features/report'))
const Share = dynamic(() => import('@components/Share'))
const LeaveModal = dynamic(() => import('./components/LeaveModal'))

interface MenuActionsProps {
  title: string
  href: string
  clientOwnership: OwnershipDto
}

function MenuActions({ title, href, clientOwnership }: MenuActionsProps) {
  const id = useId()
  const menuId = useId()
  const messages = useMessages()
  const { id: goalId } = useGoalContext()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [sharing, toggleSharing] = useToggle()
  const [leaving, toggleLeaving] = useToggle()
  const [reporting, toggleReporting] = useToggle()
  const open = Boolean(anchorEl)

  const onOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onClose = () => setAnchorEl(null)

  const onShare = () => {
    onClose()
    toggleSharing()
  }

  const onLeave = () => {
    onClose()
    toggleLeaving()
  }

  const onCloseReport = () => {
    onClose()
    toggleReporting()
  }

  return (
    <>
      <Box sx={{ marginLeft: 'auto ' }}>
        <TooltipArrow title={messages.buttonTitle}>
          <IconButton
            id={id}
            size="small"
            aria-controls={open ? menuId : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            sx={({ palette }) => ({ color: palette.grey[500] })}
            onClick={onOpen}
          >
            <AppIcon name="more_horiz" />
          </IconButton>
        </TooltipArrow>
      </Box>
      <Menu
        open={open}
        anchorEl={anchorEl}
        MenuListProps={{
          'aria-labelledby': id,
        }}
        onClose={onClose}
      >
        <MenuItem onClick={onShare}>
          <AppListItem icon="share" primary={messages.shareText} />
        </MenuItem>
        {!clientOwnership.goal && (
          <MenuItem onClick={toggleReporting}>
            <AppListItem icon="outlined_flag" primary={messages.reportText} color="error.dark" />
          </MenuItem>
        )}
        {clientOwnership.member && (
          <MenuItem onClick={onLeave}>
            <AppListItem icon="logout" primary={messages.leaveText} />
          </MenuItem>
        )}
        <MenuItem onClick={onClose}>
          <AppListItem icon="block" primary={messages.cancelText} color="grey" />
        </MenuItem>
      </Menu>
      {reporting && <Report id={goalId} type="goal" anchorEl={anchorEl} onClose={onCloseReport} />}
      {sharing && <Share title={title} href={href} onClose={toggleSharing} />}
      {leaving && <LeaveModal clientOwnership={clientOwnership} onClose={toggleLeaving} />}
    </>
  )
}

export default MenuActions

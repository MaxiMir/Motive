import { MouseEvent, useId, useState } from 'react'
import dynamic from 'next/dynamic'
import { Box, IconButton, Menu, MenuItem } from '@mui/material'
import { OwnershipDto } from '@app/model/member'
import { useGoalContext } from '@pages/user/components/GoalCurrent/hooks/useGoalContext'
import { share } from '@shared/lib/helpers/navigator'
import useToggle from '@shared/lib/hooks/useToggle'
import Icon from '@shared/ui/Icon'
import ListItem from '@shared/ui/ListItem'
import TooltipArrow from '@shared/ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'

const Report = dynamic(() => import('@features/creating-report'))
const Share = dynamic(() => import('@features/share'))
const LeaveModal = dynamic(() => import('./components/LeaveModal'))

interface MenuActionsProps {
  href: string
  title: string
  clientOwnership: OwnershipDto
}

function MenuActions({ href, title, clientOwnership }: MenuActionsProps) {
  const id = useId()
  const menuId = useId()
  const messages = useMessages()
  const { id: goalId } = useGoalContext()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [sharing, toggleSharing] = useToggle()
  const [leaving, toggleLeaving] = useToggle()
  const [reporting, toggleReporting] = useToggle()
  const open = Boolean(anchorEl)

  const onOpenMenu = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onCloseMenu = () => setAnchorEl(null)

  const onShare = async () => {
    onCloseMenu()
    await share(href, title, toggleSharing)
  }

  const onLeave = () => {
    onCloseMenu()
    toggleLeaving()
  }

  const onCloseReport = () => {
    onCloseMenu()
    toggleReporting()
  }

  return (
    <>
      <Box marginLeft="auto">
        <TooltipArrow title={messages.buttonTitle}>
          <IconButton
            id={id}
            size="small"
            aria-controls={open ? menuId : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            sx={({ palette }) => ({ color: palette.grey[500] })}
            onClick={onOpenMenu}
          >
            <Icon name="more_horiz" />
          </IconButton>
        </TooltipArrow>
      </Box>
      <Menu
        open={open}
        anchorEl={anchorEl}
        MenuListProps={{
          'aria-labelledby': id,
        }}
        onClose={onCloseMenu}
      >
        <MenuItem onClick={onShare}>
          <ListItem icon="share" primary={messages.shareText} />
        </MenuItem>
        {!clientOwnership.goal && (
          <MenuItem onClick={toggleReporting}>
            <ListItem icon="outlined_flag" primary={messages.reportText} color="error.dark" />
          </MenuItem>
        )}
        {clientOwnership.member && (
          <MenuItem onClick={onLeave}>
            <ListItem icon="logout" primary={messages.leaveText} />
          </MenuItem>
        )}
        <MenuItem onClick={onCloseMenu}>
          <ListItem icon="block" primary={messages.cancelText} color="grey" />
        </MenuItem>
      </Menu>
      {reporting && <Report id={goalId} type="goal" anchorEl={anchorEl} onClose={onCloseReport} />}
      {sharing && <Share href={href} title={title} onClose={toggleSharing} />}
      {leaving && <LeaveModal clientOwnership={clientOwnership} onClose={toggleLeaving} />}
    </>
  )
}

export default MenuActions

import { Box, IconButton, Menu, MenuItem } from '@mui/material'
import { MouseEvent, useId, useState } from 'react'
import dynamic from 'next/dynamic'
import { tryNativeShare } from 'features/share'
import { MemberDto } from 'shared/api'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'
import ListItem from 'shared/ui/ListItem'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { useMessages } from './lib'

const Share = dynamic(() => import('features/share'))
const CreateReport = dynamic(() => import('features/report/create-report'))
const DeleteMembershipModal = dynamic(() => import('features/membership/delete-membership'))

interface MenuActionsProps {
  goalId: number
  goalName: string
  href: string
  clientPage: boolean
  clientGoal: boolean
  clientMember?: MemberDto
}

export function MenuActions({
  goalId,
  goalName,
  href,
  clientPage,
  clientGoal,
  clientMember,
}: MenuActionsProps) {
  const id = useId()
  const menuId = useId()
  const messages = useMessages()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [sharing, toggleSharing] = useToggle()
  const [leaving, toggleLeaving] = useToggle()
  const [reporting, toggleReporting] = useToggle()
  const open = Boolean(anchorEl)

  const onOpenMenu = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onCloseMenu = () => setAnchorEl(null)

  const onShare = async () => {
    onCloseMenu()
    await tryNativeShare(href, goalName, toggleSharing)
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
        {!clientGoal && (
          <MenuItem onClick={toggleReporting}>
            <ListItem icon="outlined_flag" primary={messages.reportText} color="error.dark" />
          </MenuItem>
        )}
        {clientMember && (
          <MenuItem onClick={onLeave}>
            <ListItem icon="logout" primary={messages.leaveText} />
          </MenuItem>
        )}
        <MenuItem onClick={onCloseMenu}>
          <ListItem icon="block" primary={messages.cancelText} color="grey" />
        </MenuItem>
      </Menu>
      {sharing && <Share href={href} title={goalName} onClose={toggleSharing} />}
      {reporting && (
        <CreateReport id={goalId} type="goal" anchorEl={anchorEl} onClose={onCloseReport} />
      )}
      {leaving && (
        <DeleteMembershipModal
          goalId={goalId}
          goalName={goalName}
          clientPage={clientPage}
          clientMember={clientMember}
          onClose={toggleLeaving}
        />
      )}
    </>
  )
}

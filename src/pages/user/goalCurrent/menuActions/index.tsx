import { Box, IconButton, Menu, MenuItem } from '@mui/material'
import { MouseEvent, useId, useState } from 'react'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { tryNativeShare } from 'features/share'
import { MemberDto } from 'shared/api'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'
import ListItem from 'shared/ui/ListItem'
import TooltipArrow from 'shared/ui/TooltipArrow'

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
  const { formatMessage } = useIntl()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [sharing, toggleSharing] = useToggle()
  const [leaving, toggleLeaving] = useToggle()
  const [reporting, toggleReporting] = useToggle()
  const open = Boolean(anchorEl)
  const buttonTitle = formatMessage({ id: 'page.user.goal-current.open-menu' })
  const shareText = formatMessage({ id: 'common.share' })
  const reportText = formatMessage({ id: 'common.report' })
  const leaveText = formatMessage({ id: 'common.leave' })
  const cancelText = formatMessage({ id: 'common.cancel' })

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
        <TooltipArrow title={buttonTitle}>
          <IconButton
            id={id}
            size="small"
            aria-controls={open ? menuId : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            sx={(theme) => ({ color: theme.palette.grey[500] })}
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
          <ListItem icon="ios_share" primary={shareText} />
        </MenuItem>
        {!clientGoal && (
          <MenuItem onClick={toggleReporting}>
            <ListItem icon="outlined_flag" primary={reportText} color="error.dark" />
          </MenuItem>
        )}
        {clientMember && (
          <MenuItem onClick={onLeave}>
            <ListItem icon="logout" primary={leaveText} />
          </MenuItem>
        )}
        <MenuItem onClick={onCloseMenu}>
          <ListItem icon="block" primary={cancelText} color="grey" />
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

import { Box, IconButton, Menu, MenuItem } from '@mui/material'
import { MouseEvent, useId, useState } from 'react'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'
import ListItem from 'shared/ui/ListItem'
import TooltipArrow from 'shared/ui/TooltipArrow'

const CreateReport = dynamic(() => import('features/report/create-report'))

interface MenuActionsProps {
  goalId: number
  viewerGoal: boolean
}

export function MenuActions({ goalId, viewerGoal }: MenuActionsProps) {
  const id = useId()
  const menuId = useId()
  const { formatMessage } = useIntl()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [reporting, toggleReporting] = useToggle()
  const open = Boolean(anchorEl)
  const buttonTitle = formatMessage({ id: 'page.user.goal-current.open-menu' })
  const reportText = formatMessage({ id: 'common.report' })
  const cancelText = formatMessage({ id: 'common.cancel' })

  const onOpenMenu = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onCloseMenu = () => setAnchorEl(null)

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
        {!viewerGoal && (
          <MenuItem onClick={toggleReporting}>
            <ListItem icon="outlined_flag" primary={reportText} color="error.dark" />
          </MenuItem>
        )}
        <MenuItem onClick={onCloseMenu}>
          <ListItem icon="block" primary={cancelText} color="grey" />
        </MenuItem>
      </Menu>
      {reporting && (
        <CreateReport id={goalId} type="goal" anchorEl={anchorEl} onClose={onCloseReport} />
      )}
    </>
  )
}

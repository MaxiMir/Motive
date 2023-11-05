import { IconButton, Menu, MenuItem } from '@mui/material'
import { useState, MouseEvent, useId } from 'react'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { tryNativeShare } from 'features/share'
import { useRemoveFollowing } from 'features/subscription/remove-following'
import { UserDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/icon'
import ListItem from 'shared/ui/list-item'
import TooltipArrow from 'shared/ui/tooltip-arrow'

const Share = dynamic(() => import('features/share'))

interface MenuActsProps {
  user: UserDto
  index: number
}

export default function MenuActs({ user, index }: MenuActsProps) {
  const { name, nickname } = user
  const id = useId()
  const menuId = useId()
  const { formatMessage } = useIntl()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [sharing, toggleSharing] = useToggle()
  const { isLoading, remove } = useRemoveFollowing()
  const href = joinToHref(nickname)
  const open = Boolean(anchorEl)
  const title = formatMessage({ id: 'common.user-menu' })
  const shareText = formatMessage({ id: 'common.share' })
  const removeText = formatMessage({ id: 'common.remove' })
  const cancelText = formatMessage({ id: 'common.cancel' })

  const onOpenMenu = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onCloseMenu = () => setAnchorEl(null)

  const onShare = () => tryNativeShare(href, name, toggleSharing)

  const onRemove = () => remove(user, index)

  return (
    <>
      <TooltipArrow title={title}>
        <IconButton
          id={id}
          size="small"
          aria-controls={open ? menuId : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          sx={(theme) => ({ color: theme.palette.grey[500] })}
          onClick={onOpenMenu}
        >
          <Icon name="more_vert" />
        </IconButton>
      </TooltipArrow>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{
          'aria-labelledby': id,
        }}
        onClick={onCloseMenu}
        onClose={onCloseMenu}
      >
        <MenuItem onClick={onShare}>
          <ListItem icon="ios_share" primary={shareText} />
        </MenuItem>
        <MenuItem disabled={isLoading} onClick={onRemove}>
          <ListItem icon="delete" primary={removeText} color="error.dark" />
        </MenuItem>
        <MenuItem onClick={onCloseMenu}>
          <ListItem icon="block" primary={cancelText} color="grey" />
        </MenuItem>
      </Menu>
      {sharing && <Share href={href} title={name} onClose={toggleSharing} />}
    </>
  )
}

import { MenuItem, Button, Menu } from '@mui/material'
import { styled } from '@mui/system'
import { MouseEvent, useId, useState } from 'react'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import Icon from 'shared/ui/Icon'
import ListItem from 'shared/ui/ListItem'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { ModalType } from './types'

const EditCover = dynamic(() => import('features/goal/edit-cover'))
const DeleteCover = dynamic(() => import('features/goal/delete-cover'))

interface CoverMenuProps {
  goalId: number
  cover: string | null
}

function CoverMenu({ goalId, cover }: CoverMenuProps) {
  const buttonId = useId()
  const menuId = useId()
  const { formatMessage } = useIntl()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [modal, setModal] = useState<ModalType>()
  const open = Boolean(anchorEl)
  const buttonTitle = formatMessage({ id: 'page.user.goal-current.open-menu' })
  const editText = formatMessage({ id: 'page.user.goal-current.edit-cover' })
  const deleteText = formatMessage({ id: 'page.user.goal-current.delete-cover' })

  const onOpenMenu = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onCloseMenu = () => setAnchorEl(null)

  const toOnClick = (type: ModalType) => {
    return () => setModal(type)
  }

  const onClose = () => {
    onCloseMenu()
    setModal(undefined)
  }

  return (
    <>
      <TooltipArrow title={buttonTitle}>
        <StyledButton
          id={buttonId}
          variant="contained"
          color="inherit"
          aria-controls={open ? menuId : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={onOpenMenu}
        >
          <Icon name="edit_note" />
        </StyledButton>
      </TooltipArrow>
      <Menu
        open={open}
        anchorEl={anchorEl}
        MenuListProps={{
          'aria-labelledby': buttonId,
        }}
        onClose={onCloseMenu}
      >
        <MenuItem onClick={toOnClick('edit')}>
          <ListItem icon="photo" primary={editText} />
        </MenuItem>
        {cover && (
          <MenuItem onClick={toOnClick('delete')}>
            <ListItem icon="delete" primary={deleteText} color="error.dark" />
          </MenuItem>
        )}
      </Menu>
      {modal === 'edit' && <EditCover goalId={goalId} onClose={onClose} />}
      {modal === 'delete' && <DeleteCover goalId={goalId} onClose={onClose} />}
    </>
  )
}

const StyledButton = styled(Button)({
  minWidth: 'initial',
  width: 36,
  height: 36,
  border: '2px solid black',
  '& span': {
    fontSize: 18,
  },
})

export default CoverMenu

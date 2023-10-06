import { IconButton, IconButtonProps } from '@mui/material'
import { styled } from '@mui/system'
import Icon from 'shared/ui/Icon'

type CloseButtonProps = Pick<IconButtonProps, 'aria-label' | 'onClick'>

function CloseButton(props: CloseButtonProps) {
  return (
    <StyledIconButton edge="start" {...props}>
      <Icon name="close" fontSize={16} />
    </StyledIconButton>
  )
}

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: 24,
  height: 24,
  background: theme.palette.grey[800],
  color: '#121212',
}))

export default CloseButton

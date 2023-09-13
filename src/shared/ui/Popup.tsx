import { Drawer, Box, Container, IconButton, Typography, Divider } from '@mui/material'
import { styled } from '@mui/system'
import { KeyboardEvent, ReactNode } from 'react'
import { useIntl } from 'react-intl'
import Icon from 'shared/ui/Icon'

interface PopupProps {
  title?: ReactNode | string
  children: ReactNode | ReactNode[]
  onClose: () => void
}

function Popup({ title, children, onClose }: PopupProps) {
  const { formatMessage } = useIntl()
  const closeText = formatMessage({ id: 'common.close' })
  const onKeyDown = (event: KeyboardEvent<Element>) => {
    if (event.type === 'keydown' && ['Tab', 'Shift'].includes(event.key)) {
      return
    }

    onClose()
  }

  return (
    <Drawer open anchor="bottom" onClose={onClose}>
      <Box role="presentation" minHeight={350} onKeyDown={onKeyDown}>
        <Container fixed>
          <Box display="flex" justifyContent="space-between" alignItems="center" minHeight={64}>
            <Typography variant="h6" component="div" textAlign="center" ml={2} flex={1}>
              {title}
            </Typography>
            <CloseButton edge="start" color="inherit" aria-label={closeText} onClick={onClose}>
              <Icon name="close" />
            </CloseButton>
          </Box>
          <Divider light />
          {children}
        </Container>
      </Box>
    </Drawer>
  )
}

const CloseButton = styled(IconButton)(({ theme }) => ({
  background: theme.palette.grey[900],
  ':hover': {
    background: theme.palette.grey[800],
  },
}))

export default Popup

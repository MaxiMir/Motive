import { Drawer as MuiDrawer, Box, Container, Typography, Divider, IconButton } from '@mui/material'
import { backdropClasses } from '@mui/material/Backdrop'
import { paperClasses } from '@mui/material/Paper'
import { styled } from '@mui/system'
import { KeyboardEvent, ReactNode } from 'react'
import { useIntl } from 'react-intl'
import Icon from 'shared/ui/Icon'

interface DrawerProps {
  title?: ReactNode | string
  children: ReactNode | ReactNode[]
  onClose: () => void
}

function Drawer({ title, children, onClose }: DrawerProps) {
  const { formatMessage } = useIntl()
  const closeText = formatMessage({ id: 'common.close' })

  const onKeyDown = (event: KeyboardEvent<Element>) => {
    if (event.type === 'keydown' && ['Tab', 'Shift'].includes(event.key)) {
      return
    }

    onClose()
  }

  return (
    <StyledDrawer open anchor="bottom" onClose={onClose}>
      <Box role="presentation" onKeyDown={onKeyDown}>
        <Container fixed>
          <Box display="flex" justifyContent="space-between" alignItems="center" minHeight={56}>
            <Typography variant="h6" component="div" textAlign="center" ml={2} flex={1}>
              {title}
            </Typography>
            <IconButton size="small" edge="start" aria-label={closeText} onClick={onClose}>
              <Icon name="close" />
            </IconButton>
          </Box>
          <Divider light />
          <Box py={3} px={2}>
            {children}
          </Box>
        </Container>
      </Box>
    </StyledDrawer>
  )
}

const StyledDrawer = styled(MuiDrawer)({
  [`& .${backdropClasses.root}`]: {
    background: 'rgba(34, 34, 34, 0.75)',
    backdropFilter: 'blur(5px)',
  },
  [`& .${paperClasses.root}`]: {
    borderRadius: '32px 32px 0 0',
  },
})

export default Drawer

import dynamic from 'next/dynamic'
import { Box, AppBar, Chip, Container } from '@mui/material'
import LeftMenu from './components/LeftMenu'

const SignIn = dynamic(() => import('./components/SignIn'))
const Notification = dynamic(() => import('./components/Notification'))

interface HeaderProps {
  authenticated: boolean
}

export default function Header({ authenticated }: HeaderProps): JSX.Element {
  return (
    <AppBar
      position="static"
      sx={{
        padding: '16px 0 8px',
        backgroundColor: 'navigation',
        backgroundImage: 'none',
        boxShadow: 'none',
      }}
    >
      <Container fixed>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <LeftMenu />
          <Chip label="Alpha 1.0.8" variant="outlined" />
          {authenticated ? <Notification /> : <SignIn />}
        </Box>
      </Container>
    </AppBar>
  )
}

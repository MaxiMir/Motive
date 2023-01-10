import { useRouter } from 'next/router'
import Link from 'next/link'
import { Container, Box, IconButton } from '@mui/material'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useRoutes } from './hooks/useRoutes'
import ProfileLink from './components/ProfileLink'

function Footer() {
  const { asPath } = useRouter()
  const routes = useRoutes()

  return (
    <Box
      component="footer"
      sx={{
        position: 'sticky',
        bottom: 0,
        width: '100%',
        zIndex: 30,
        backgroundColor: 'underlay',
      }}
    >
      <Container
        fixed
        sx={({ breakpoints }) => ({
          [breakpoints.only('xl')]: {
            maxWidth: 900,
          },
        })}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
          {routes.map(({ title, href, Component }) => (
            <TooltipArrow title={title} key={href}>
              <IconButton href={href} component={Link}>
                <Component sx={{ color: asPath.includes(href) ? 'inherit' : 'grey' }} />
              </IconButton>
            </TooltipArrow>
          ))}
          <ProfileLink />
        </Box>
      </Container>
    </Box>
  )
}

export default Footer

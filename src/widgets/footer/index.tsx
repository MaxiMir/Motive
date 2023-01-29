import { Container, Box, IconButton, Stack } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import OpeningProfile from 'features/user/opening-profile'
import { TooltipArrow } from 'shared/ui/styled'
import { useRoutes } from './lib'

function Footer() {
  const { asPath } = useRouter()
  const routes = useRoutes()

  return (
    <Box
      position="sticky"
      component="footer"
      bottom={0}
      zIndex={30}
      display={{
        xs: 'block',
        xl: 'none',
      }}
      width="100%"
      sx={{ backgroundColor: 'underlay' }}
    >
      <Container fixed>
        <Stack direction="row" justifyContent="space-between" alignItems="center" py={1}>
          {routes.map(({ title, href, Component }) => (
            <TooltipArrow title={title} key={href}>
              <IconButton href={href} component={Link}>
                <Component
                  sx={{ fontSize: 21, color: asPath.includes(href) ? 'inherit' : 'grey' }}
                />
              </IconButton>
            </TooltipArrow>
          ))}
          <OpeningProfile />
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer

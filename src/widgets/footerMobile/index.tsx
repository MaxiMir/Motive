import { Container, Box, IconButton, Stack } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import OpenProfile from 'features/user/open-profile'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { useRoutes } from './lib'

interface FooterMobileProps {
  scrolledDown: boolean
}

function FooterMobile({ scrolledDown }: FooterMobileProps) {
  const { asPath } = useRouter()
  const routes = useRoutes()
  const position = scrolledDown ? 'static' : 'fixed'

  return (
    <Box
      component="footer"
      position={position}
      bottom={0}
      zIndex={30}
      display={{
        xs: 'block',
        xl: 'none',
      }}
      width="100%"
      sx={{ backgroundColor: '#121212', transition: 'all .3s' }}
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
          <OpenProfile />
        </Stack>
      </Container>
    </Box>
  )
}

export default FooterMobile

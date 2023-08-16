import { Container, Box, IconButton, Stack, GlobalStyles } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import OpenProfile from 'features/user/open-profile'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { useRoutes } from './lib'

const HEIGHT = 56

interface FooterMobileProps {
  fixed: boolean
}

function FooterMobile({ fixed }: FooterMobileProps) {
  const { asPath } = useRouter()
  const routes = useRoutes()

  return (
    <Box
      component="footer"
      position={fixed ? 'fixed' : 'static'}
      bottom={fixed ? 0 : undefined}
      height={HEIGHT}
      zIndex={30}
      display={{
        xs: 'block',
        xl: 'none',
      }}
      width="100%"
      sx={{ backgroundColor: '#121212' }}
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
      <GlobalStyles
        styles={{
          main: {
            paddingBottom: fixed ? HEIGHT : 0,
          },
        }}
      />
    </Box>
  )
}

export default FooterMobile

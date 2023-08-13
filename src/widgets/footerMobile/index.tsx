import { Container, Box, IconButton, Stack, GlobalStyles } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import OpenProfile from 'features/user/open-profile'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { useRoutes } from './lib'

interface FooterMobileProps {
  scrollUp: boolean
}

function FooterMobile({ scrollUp }: FooterMobileProps) {
  const { asPath } = useRouter()
  const routes = useRoutes()
  const position = !scrollUp ? 'static' : 'fixed'
  const bottom = !scrollUp ? undefined : 0

  return (
    <Box
      component="footer"
      position={position}
      bottom={bottom}
      height={56}
      zIndex={30}
      display={{
        xs: 'block',
        xl: 'none',
      }}
      width="100%"
      maxWidth="100vw"
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
            paddingBottom: scrollUp ? 56 : undefined,
          },
        }}
      />
    </Box>
  )
}

export default FooterMobile

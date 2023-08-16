import { Container, Box, IconButton, Stack, GlobalStyles } from '@mui/material'
import { styled } from '@mui/system'
import { useState } from 'react'
import { InView } from 'react-intersection-observer'
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
  const [visible, setVisible] = useState(true)

  return (
    <Footer
      component="footer"
      position={fixed ? 'fixed' : 'static'}
      bottom={fixed ? 0 : undefined}
      display={{
        xs: 'block',
        xl: 'none',
      }}
      height={HEIGHT}
    >
      <InView threshold={0.1} onChange={setVisible}>
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
      </InView>
      <GlobalStyles
        styles={{
          main: {
            paddingBottom: fixed ? HEIGHT : 0,
            '#create-goal': {
              bottom: visible ? 72 : 24,
              transition: 'bottom 0.2s ease-in',
            },
          },
        }}
      />
    </Footer>
  )
}

const Footer = styled(Box)({
  width: '100%',
  zIndex: 30,
  backgroundColor: '#121212',
})

export default FooterMobile

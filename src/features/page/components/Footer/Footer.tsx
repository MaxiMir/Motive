import { useRouter } from 'next/router'
import Link from 'next/link'
import { useIntl } from 'react-intl'
import { Container, Box, IconButton } from '@mui/material'
import { Route } from '@href'
import TopOfTheDay from '@ui/icons/TopOfTheDay'
import Search from '@ui/icons/Search'
import Rating from '@ui/icons/Rating'
import Following from '@ui/icons/Following'
import TooltipArrow from '@ui/styled/TooltipArrow'
import ProfileLink from './components/ProfileLink'

function Footer() {
  const { formatMessage } = useIntl()
  const { asPath } = useRouter()
  const routes = getRoutes()

  function getRoutes() {
    return [
      {
        title: formatMessage({ id: 'component.footer.top' }),
        href: Route.TopOfTheDay,
        Component: TopOfTheDay,
      },
      {
        title: formatMessage({ id: 'component.footer.search' }),
        href: Route.Search,
        Component: Search,
      },
      {
        title: formatMessage({ id: 'component.footer.rating' }),
        href: Route.Rating,
        Component: Rating,
      },
      {
        title: formatMessage({ id: 'common.following' }),
        href: Route.Following,
        Component: Following,
      },
    ]
  }

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
              <IconButton
                href={href}
                component={Link}
                sx={{ opacity: !asPath.includes(href) ? 0.6 : 1 }}
              >
                <Component />
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

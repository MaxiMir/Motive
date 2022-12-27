import { useRouter } from 'next/router'
import Link from 'next/link'
import { useIntl } from 'react-intl'
import { Container, Box, Button } from '@mui/material'
import { Route } from '@href'
import TopOfTheDayIcon from '@ui/icons/TopOfTheDayIcon'
import SearchIcon from '@ui/icons/SearchIcon'
import RatingIcon from '@ui/icons/RatingIcon'
import FollowingIcon from '@ui/icons/FollowingIcon'
import ProfileLink from './components/ProfileLink/ProfileLink'

const HOVER_OPACITY = 0.6

interface FooterProps {
  nickname?: string
}

function Footer({ nickname }: FooterProps) {
  const { formatMessage } = useIntl()
  const { asPath } = useRouter()
  const routes = getRoutes()

  function getRoutes() {
    return [
      {
        title: formatMessage({ id: 'component.footer.top' }),
        href: Route.TopOfTheDay,
        Component: TopOfTheDayIcon,
      },
      {
        title: formatMessage({ id: 'component.footer.search' }),
        href: Route.Search,
        Component: SearchIcon,
      },
      {
        title: formatMessage({ id: 'component.footer.rating' }),
        href: Route.Rating,
        Component: RatingIcon,
      },
      {
        title: formatMessage({ id: 'common.following' }),
        href: Route.Following,
        Component: FollowingIcon,
      },
    ]
  }

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'underlay',
        position: 'sticky',
        bottom: 0,
        width: '100%',
        zIndex: 30,
      }}
    >
      <Container
        fixed
        sx={(theme) => ({
          [theme.breakpoints.only('xl')]: {
            maxWidth: 900,
          },
        })}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" height={52}>
          {routes.map(({ title, href, Component }) => (
            <Button href={href} aria-label={title} key={title} component={Link}>
              <Component
                sx={{ color: 'common.white', opacity: !asPath.includes(href) ? HOVER_OPACITY : 1 }}
              />
            </Button>
          ))}
          <ProfileLink nickname={nickname} asPath={asPath} hoverOpacity={HOVER_OPACITY} />
        </Box>
      </Container>
    </Box>
  )
}

export default Footer

import { useRouter } from 'next/router'
import Link from 'next/link'
import { useIntl } from 'react-intl'
import { Container, Box, Button } from '@mui/material'
import { Route } from '@href'
import { TopOfTheDayIcon, SearchIcon, RatingIcon, FollowingIcon } from '@ui/icons'
import FooterProfile from './components/FooterProfile'

const HOVER_OPACITY = 0.6

interface FooterProps {
  nickname?: string
}

export default function Footer({ nickname }: FooterProps) {
  const { formatMessage } = useIntl()
  const { asPath } = useRouter()
  const routes = getRoutes()

  function getRoutes() {
    return [
      { title: formatMessage({ id: 'component.footer.top' }), href: Route.TopOfTheDay, Component: TopOfTheDayIcon },
      { title: formatMessage({ id: 'component.footer.search' }), href: Route.Search, Component: SearchIcon },
      { title: formatMessage({ id: 'component.footer.rating' }), href: Route.Rating, Component: RatingIcon },
      { title: formatMessage({ id: 'common.following' }), href: Route.Following, Component: FollowingIcon },
    ]
  }

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'navigation',
        position: 'sticky',
        bottom: 0,
        width: '100%',
      }}
    >
      <Container fixed>
        <Box display="flex" justifyContent="space-between" alignItems="center" height={52}>
          {routes.map(({ title, href, Component }) => (
            <Button href={href} aria-label={title} key={title} component={Link}>
              <Component sx={{ color: 'common.white', opacity: !asPath.includes(href) ? HOVER_OPACITY : 1 }} />
            </Button>
          ))}
          <FooterProfile nickname={nickname} asPath={asPath} hoverOpacity={HOVER_OPACITY} />
        </Box>
      </Container>
    </Box>
  )
}

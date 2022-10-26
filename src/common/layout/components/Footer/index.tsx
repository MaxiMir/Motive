import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import { Container, Box, Button } from '@mui/material'
import { FOLLOWING, RATING, SEARCH, TOP_OF_THE_DAY } from '@links'
import AppLink from '@ui/AppLink'
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
      { title: formatMessage({ id: 'component.footer.top' }), href: TOP_OF_THE_DAY, Component: TopOfTheDayIcon },
      { title: formatMessage({ id: 'component.footer.search' }), href: SEARCH, Component: SearchIcon },
      { title: formatMessage({ id: 'component.footer.rating' }), href: RATING, Component: RatingIcon },
      { title: formatMessage({ id: 'common.following' }), href: FOLLOWING, Component: FollowingIcon },
    ]
  }

  return (
    <Box
      component="footer"
      className="apple-hide"
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
            <AppLink href={href} title={title} key={title}>
              <Button aria-label={title}>
                <Component sx={{ color: 'common.white', opacity: !asPath.includes(href) ? HOVER_OPACITY : 1 }} />
              </Button>
            </AppLink>
          ))}
          <FooterProfile nickname={nickname} asPath={asPath} hoverOpacity={HOVER_OPACITY} />
        </Box>
      </Container>
    </Box>
  )
}

import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import { Container, Box, Button } from '@mui/material'
import { FOLLOWING, RATING, SEARCH, TOP_OF_THE_DAY } from 'route'
import AppLink from 'components/ui/AppLink'
import { TopOfTheDayIcon, SearchIcon, RatingIcon, FollowingIcon } from 'components/ui/icons'
import { ucFirst } from 'helpers/prepare'
import FooterIcon from './components/FooterIcon'
import FooterProfile from './components/FooterProfile'

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
      { title: ucFirst(formatMessage({ id: 'common.following' })), href: FOLLOWING, Component: FollowingIcon },
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
                <FooterIcon Icon={Component} selected={asPath.includes(href)} key={href} />
              </Button>
            </AppLink>
          ))}
          <FooterProfile nickname={nickname} asPath={asPath} />
        </Box>
      </Container>
    </Box>
  )
}

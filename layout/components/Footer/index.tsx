import { useRouter } from 'next/router'
import { Container, Box, Button } from '@mui/material'
import { FOLLOWING, RATING, SEARCH, TOP_OF_THE_DAY } from 'route'
import useLocale from 'hooks/useLocale'
import AppLink from 'components/ui/AppLink'
import { TopOfTheDayIcon, SearchIcon, RatingIcon, FollowingIcon } from 'components/ui/icons'
import FooterIcon from './components/FooterIcon'
import FooterProfile from './components/FooterProfile'
import i18n from './i18n'

interface FooterProps {
  nickname?: string
}

export default function Footer({ nickname }: FooterProps) {
  const { asPath } = useRouter()
  const { locale } = useLocale()
  const titles = i18n[locale]
  const routes = getRoutes()

  function getRoutes() {
    return [
      { title: titles.top, href: TOP_OF_THE_DAY, Icon: TopOfTheDayIcon },
      { title: titles.search, href: SEARCH, Icon: SearchIcon },
      { title: titles.rating, href: RATING, Icon: RatingIcon },
      { title: titles.following, href: FOLLOWING, Icon: FollowingIcon },
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
          {routes.map(({ title, href, Icon }) => (
            <AppLink href={href} title={title} key={title}>
              <Button aria-label={title}>
                <FooterIcon Icon={Icon} selected={asPath.includes(href)} key={href} />
              </Button>
            </AppLink>
          ))}
          <FooterProfile nickname={nickname} ariaLabel={titles.my} asPath={asPath} />
        </Box>
      </Container>
    </Box>
  )
}

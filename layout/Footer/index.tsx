import { useRouter } from 'next/router'
import { Container, Box, Button } from '@mui/material'
import { FOLLOWING, RATING, SEARCH, TOP_OF_THE_DAY } from 'route'
import AppLink from 'components/UI/AppLink'
import { TopOfTheDayIcon, SearchIcon, RatingIcon, FollowingIcon } from 'components/UI/icons'
import FooterIcon from './components/FooterIcon'
import FooterProfile from './components/FooterProfile'

const ROUTES = [
  {
    href: TOP_OF_THE_DAY,
    title: 'top of the day',
    Icon: TopOfTheDayIcon,
  },
  { href: SEARCH, title: 'search', Icon: SearchIcon },
  { href: RATING, title: 'rating', Icon: RatingIcon },
  { href: FOLLOWING, title: 'following', Icon: FollowingIcon },
]

interface FooterProps {
  nickname?: string
}

export default function Footer({ nickname }: FooterProps): JSX.Element {
  const { asPath } = useRouter()

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
          {ROUTES.map(({ href, title, Icon }) => (
            <AppLink href={href} title={title} key={title}>
              <Button>
                <FooterIcon Icon={Icon} selected={asPath.includes(href)} key={href} />
              </Button>
            </AppLink>
          ))}
          <FooterProfile nickname={nickname} asPath={asPath} />
        </Box>
      </Container>
    </Box>
  )
}

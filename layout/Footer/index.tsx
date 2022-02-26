import { useRouter } from 'next/router'
import { Session } from 'next-auth'
import { Button, makeStyles } from '@material-ui/core'
import { Providers } from 'dto'
import { FOLLOWING_ROUTE, RATING_ROUTE, SEARCH_ROUTE, TOP_OF_THE_DAY_ROUTE } from 'route'
import AppBox from 'components/UI/AppBox'
import AppContainer from 'components/UI/AppContainer'
import { TopOfTheDayIcon, SearchIcon, RatingIcon, FollowingIcon } from 'components/UI/icons'
import FooterIcon from './components/FooterIcon'
import FooterProfile from './components/FooterProfile'

const ROUTES = [
  {
    href: TOP_OF_THE_DAY_ROUTE,
    title: 'top of the day',
    Icon: TopOfTheDayIcon,
  },
  { href: SEARCH_ROUTE, title: 'search', Icon: SearchIcon },
  { href: RATING_ROUTE, title: 'rating', Icon: RatingIcon },
  { href: FOLLOWING_ROUTE, title: 'following', Icon: FollowingIcon },
]

interface FooterProps {
  session: Session | null
  providers?: Providers
}

export default function Footer({ session, providers }: FooterProps): JSX.Element {
  const classes = useStyles()
  const { asPath } = useRouter()
  const nickname = session?.nickname as string | undefined

  return (
    <footer className={classes.root}>
      <AppContainer>
        <AppBox justifyContent="space-between" alignItems="center" height={65}>
          {ROUTES.map(({ href, title, Icon }) => (
            <Button href={href} title={title} key={title}>
              <FooterIcon Icon={Icon} selected={asPath.includes(href)} key={href} />
            </Button>
          ))}
          <FooterProfile nickname={nickname} asPath={asPath} providers={providers} />
        </AppBox>
      </AppContainer>
    </footer>
  )
}

const useStyles = makeStyles({
  root: {
    backgroundColor: '#121212',
  },
})

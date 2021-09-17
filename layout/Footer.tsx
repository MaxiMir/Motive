import React from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import ROUTE from 'route'
import AppBox from 'components/UI/AppBox'
import AppLink from 'components/UI/AppLink'
import AppContainer from 'components/UI/AppContainer'
import { TopOfTheDayIcon, SearchIcon, RatingIcon, FavoritesMenuIcon, ProfileIcon } from 'components/UI/icons'

const LINKS = [
  {
    href: ROUTE.TOP_OF_THE_DAY,
    Icon: TopOfTheDayIcon,
    title: 'top of the day',
  },
  { href: ROUTE.SEARCH, Icon: SearchIcon, title: 'search' },
  { href: ROUTE.RATING, Icon: RatingIcon, title: 'rating' },
  { href: ROUTE.FAVORITES, Icon: FavoritesMenuIcon, title: 'favorites' },
  { href: ROUTE.PROFILE, Icon: ProfileIcon, title: 'profile' },
]

export default function Footer(): JSX.Element {
  const classes = useStyles()
  const { pathname } = useRouter()

  return (
    <footer className={classes.root}>
      <AppContainer>
        <AppBox justifyContent="space-between" alignItems="center" height={80}>
          {LINKS.map(({ href, title, Icon }) => (
            <AppLink href={href} key={title} title={title}>
              <Icon fontSize="large" className={pathname !== href ? classes.link : classes.currentLink} />
            </AppLink>
          ))}
        </AppBox>
      </AppContainer>
    </footer>
  )
}

const useStyles = makeStyles({
  root: {
    backgroundColor: '#121212',
  },
  link: {
    transition: 'all .2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  currentLink: {
    opacity: 0.6,
  },
})

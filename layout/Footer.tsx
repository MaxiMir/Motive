import React from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { FAVORITES_ROUTE, PROFILE_ROUTE, RATING_ROUTE, SEARCH_ROUTE, TOP_OF_THE_DAY_ROUTE } from 'route'
import AppBox from 'components/UI/AppBox'
import AppLink from 'components/UI/AppLink'
import AppContainer from 'components/UI/AppContainer'
import { TopOfTheDayIcon, SearchIcon, RatingIcon, FavoritesMenuIcon, ProfileIcon } from 'components/UI/icons'
import { BottomNavigationAction } from '@material-ui/core'

const LINKS = [
  {
    href: TOP_OF_THE_DAY_ROUTE,
    Icon: TopOfTheDayIcon,
    title: 'top of the day',
  },
  { href: SEARCH_ROUTE, Icon: SearchIcon, title: 'search' },
  { href: RATING_ROUTE, Icon: RatingIcon, title: 'rating' },
  { href: FAVORITES_ROUTE, Icon: FavoritesMenuIcon, title: 'favorites' },
  { href: PROFILE_ROUTE, Icon: ProfileIcon, title: 'profile' },
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
              <BottomNavigationAction
                label={title}
                value={title}
                icon={<Icon fontSize="large" className={clsx([pathname === href && classes.currentLink])} />}
              />
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
  currentLink: {
    opacity: 0.6,
  },
})

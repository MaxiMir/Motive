import * as React from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import AppBox from 'components/UI/AppBox'
import AppLink from 'components/UI/AppLink'
import {
  TopOfTheDayIcon,
  SearchIcon,
  RatingIcon,
  FavoritesIcon,
  ProfileIcon,
} from 'components/UI/icons'
import { ROUTE } from 'route'

const LINKS = [
  {
    href: ROUTE.TOP_OF_THE_DAY,
    Icon: TopOfTheDayIcon,
    title: 'top of the day',
  },
  { href: ROUTE.SEARCH, Icon: SearchIcon, title: 'search' },
  { href: ROUTE.RATING, Icon: RatingIcon, title: 'rating' },
  { href: ROUTE.FAVORITES, Icon: FavoritesIcon, title: 'favorites' },
  { href: ROUTE.PROFILE, Icon: ProfileIcon, title: 'profile' },
]

export const Footer = () => {
  const classes = useStyles()
  const { pathname } = useRouter()

  return (
    <footer className={classes.root}>
      <AppBox
        justifyContent="space-between"
        alignItems="center"
        flexGrow={1}
        height="100%"
        padding={2}
      >
        {LINKS.map(({ href, title, Icon }, key) => (
          <AppLink href={href} key={key} title={title}>
            <Icon
              fontSize="large"
              className={pathname !== href ? classes.link : classes.currentLink}
            />
          </AppLink>
        ))}
      </AppBox>
    </footer>
  )
}

const useStyles = makeStyles({
  root: {
    height: 80,
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

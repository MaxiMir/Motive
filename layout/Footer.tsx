import React from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { FOLLOWING_ROUTE, PROFILE_ROUTE, RATING_ROUTE, SEARCH_ROUTE, TOP_OF_THE_DAY_ROUTE } from 'route'
import AppBox from 'components/UI/AppBox'
import AppLink from 'components/UI/AppLink'
import AppContainer from 'components/UI/AppContainer'
import { TopOfTheDayIcon, SearchIcon, RatingIcon, FollowingIcon, ProfileIcon } from 'components/UI/icons'
import { getUserHref } from '../views/User/helper'

const ROUTES = [
  {
    href: TOP_OF_THE_DAY_ROUTE,
    Icon: TopOfTheDayIcon,
    title: 'top of the day',
  },
  { href: SEARCH_ROUTE, Icon: SearchIcon, title: 'search' },
  { href: RATING_ROUTE, Icon: RatingIcon, title: 'rating' },
  { href: FOLLOWING_ROUTE, Icon: FollowingIcon, title: 'following' },
]

interface FooterProps {
  nickname?: string
}

export default function Footer({ nickname }: FooterProps): JSX.Element {
  const classes = useStyles()
  const { asPath } = useRouter()
  const allRoutes = getAllRoutes()

  function getAllRoutes() {
    return [...ROUTES, { href: nickname ? getUserHref(nickname) : PROFILE_ROUTE, Icon: ProfileIcon, title: 'profile' }]
  }

  return (
    <footer className={classes.root}>
      <AppContainer>
        <AppBox justifyContent="space-between" alignItems="center" height={80}>
          {allRoutes.map(({ href, title, Icon }) => (
            <AppLink href={href} key={title} title={title}>
              <Icon fontSize="large" className={!asPath.includes(href) ? classes.link : classes.currentLink} />
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

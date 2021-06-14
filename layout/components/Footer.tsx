import * as React from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { AppBox } from 'components/UI/AppBox'
import { AppLink } from 'components/UI/AppLink'
import {
  TopOfTheDayIcon,
  SearchIcon,
  RatingIcon,
  FavoritesIcon,
  ProfileIcon,
} from 'components/UI/icons'
import { LINK } from 'link'

const LINKS = [
  { href: LINK.TOP_OF_THE_DAY, Icon: TopOfTheDayIcon },
  { href: LINK.SEARCH, Icon: SearchIcon },
  { href: LINK.RATING, Icon: RatingIcon },
  { href: LINK.FAVORITES, Icon: FavoritesIcon },
  { href: LINK.PROFILE, Icon: ProfileIcon },
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
        {LINKS.map(({ href, Icon }, key) => (
          <AppLink href={href} key={key}>
            <Icon
              fontSize="large"
              className={pathname !== href ? undefined : classes.currentLink}
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
  currentLink: {
    opacity: 0.6,
  },
})

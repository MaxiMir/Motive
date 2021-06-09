import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBox } from '@/components/UI/AppBox'
import {
  CatalogIcon,
  SearchIcon,
  CupIcon,
  StarIcon,
  ProfileIcon,
} from '@/components/UI/icons'

export const Footer = () => {
  const classes = useStyles()

  return (
    <footer className={classes.root}>
      <AppBox justifyContent="space-between" flexGrow={1} padding={2}>
        <CatalogIcon fontSize="large" />
        <SearchIcon fontSize="large" />
        <CupIcon fontSize="large" />
        <StarIcon fontSize="large" />
        <ProfileIcon fontSize="large" />
      </AppBox>
    </footer>
  )
}

const useStyles = makeStyles({
  root: {
    height: 80,
    backgroundColor: '#121212',
  },
})

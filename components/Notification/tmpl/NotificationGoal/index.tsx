import { Box, Typography, ListItemIcon, MenuItem } from '@mui/material'
import { NotificationGoalDto } from 'dto'
import useLocale from 'hooks/useLocale'
import { getDistance } from 'helpers/date'
import User from 'components/User'
import AppLink from 'components/UI/AppLink'
import AppEmoji from 'components/UI/AppEmoji'
import { getUserHref } from 'views/UserView/helper'
import i18n from './i18n'

export default function NotificationGoal({ details, created, tmpl }: NotificationGoalDto): JSX.Element {
  const { user } = details
  const href = getUserHref(user.nickname)
  const { locale } = useLocale()
  const dateDistance = getDistance(created, locale)
  const title = i18n[locale][tmpl]

  return (
    <MenuItem>
      <ListItemIcon sx={{ position: 'relative' }}>
        <User tmpl="avatar" user={user} />
        <Box component="span" sx={{ position: 'absolute', bottom: '-5px', right: '7px', fontSize: '0.625rem' }}>
          <AppEmoji name={tmpl} onlyEmoji />
        </Box>
      </ListItemIcon>
      <Box display="flex" flexDirection="column">
        <Typography variant="caption">
          <AppLink href={href} sx={{ color: 'primary.main', textDecoration: 'none' }}>
            {user.name}
          </AppLink>{' '}
          {title}
        </Typography>
        <Box component="span" sx={{ fontSize: '0.6875rem', color: 'zen.silent' }}>
          {dateDistance}
        </Box>
      </Box>
    </MenuItem>
  )
}

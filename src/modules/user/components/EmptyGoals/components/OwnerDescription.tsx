import { useIntl } from 'react-intl'
import { Box, Typography } from '@mui/material'
import { SEARCH } from '@links'
import AppLink from '@ui/AppLink'

export default function OwnerDescription() {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'page.user.owner-description.title' })
  const subtitle = formatMessage({ id: 'page.user.owner-description.subtitle' })
  const description = formatMessage({ id: 'page.user.owner-description.description' })
  const link = formatMessage({ id: 'page.user.owner-description.link' })

  return (
    <>
      <Typography>
        {title}{' '}
        <Box component="span" sx={{ color: 'primary' }}>
          {subtitle}
        </Box>
      </Typography>
      <Typography>
        {description}{' '}
        <AppLink href={SEARCH} sx={{ color: 'warning.light' }}>
          {link}
        </AppLink>
      </Typography>
    </>
  )
}

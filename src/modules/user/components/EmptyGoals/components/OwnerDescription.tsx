import Link from 'next/link'
import { useIntl } from 'react-intl'
import { Box, Typography } from '@mui/material'
import { Route } from '@href'

function OwnerDescription() {
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
        <Box component="span" sx={{ color: 'warning.light' }}>
          <Link href={Route.Search}>{link}</Link>
        </Box>
      </Typography>
    </>
  )
}

export default OwnerDescription

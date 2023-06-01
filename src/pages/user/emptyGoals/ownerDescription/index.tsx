import { Box, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import Link from 'next/link'
import { Route } from 'shared/config'

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
        <Box component="span" color="primary">
          {subtitle}
        </Box>
      </Typography>
      <Typography>
        {description}{' '}
        <Box component="span" color="warning.light">
          <Link href={Route.Search}>{link}</Link>
        </Box>
      </Typography>
    </>
  )
}

export default OwnerDescription

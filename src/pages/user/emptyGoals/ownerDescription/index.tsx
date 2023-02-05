import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { Route } from 'shared/config'
import { useMessages } from './lib'

function OwnerDescription() {
  const messages = useMessages()

  return (
    <>
      <Typography>
        {messages.title}{' '}
        <Box component="span" color="primary">
          {messages.subtitle}
        </Box>
      </Typography>
      <Typography>
        {messages.description}{' '}
        <Box component="span" color="warning.light">
          <Link href={Route.Search}>{messages.link}</Link>
        </Box>
      </Typography>
    </>
  )
}

export default OwnerDescription
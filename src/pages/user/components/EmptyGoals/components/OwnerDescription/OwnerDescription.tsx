import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { Route } from 'shared/consts'
import { useMessages } from './hooks/useMessages'

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

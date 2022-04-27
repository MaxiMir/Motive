import { Box } from '@mui/material'
import { ClientDto } from 'dto'
import { useEvents } from './hook'

interface EventsProps {
  client: ClientDto
}

export default function Events({ client }: EventsProps): JSX.Element {
  useEvents(client)

  return <Box />
}

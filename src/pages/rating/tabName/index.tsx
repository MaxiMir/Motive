import { Typography } from '@mui/material'
import { MainCharacteristicName } from 'shared/api'
import { useMessages } from './lib'

interface TabNameProps {
  name: MainCharacteristicName
}

export function TabName({ name }: TabNameProps) {
  const messages = useMessages(name)

  return (
    <Typography
      sx={({ breakpoints }) => ({
        [breakpoints.only('xs')]: {
          fontSize: 14,
        },
      })}
    >
      {messages.tabText}
    </Typography>
  )
}

import { Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import { MainCharacteristicName } from 'shared/api'

interface TabNameProps {
  name: MainCharacteristicName
}

export function TabName({ name }: TabNameProps) {
  const { formatMessage } = useIntl()
  const tabText = formatMessage({ id: `common.${name}` })

  return (
    <Typography
      sx={({ breakpoints }) => ({
        [breakpoints.only('xs')]: {
          fontSize: 14,
        },
      })}
    >
      {tabText}
    </Typography>
  )
}

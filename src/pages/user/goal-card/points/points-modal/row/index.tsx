import { Box, Typography } from '@mui/material'
import { useFormatNumber } from 'shared/lib/hooks'
import Icon from 'shared/ui/icon'

interface RowProps {
  icon: string
  name: string
  value: number
}

export function Row({ icon, name, value }: RowProps) {
  const formatNumber = useFormatNumber()
  const formattedValue = formatNumber(value)

  return (
    <Box display="flex" gap={1}>
      <Icon name={icon} />
      <Typography>{name}:</Typography>
      <Typography textAlign="right" color="zen.silent" marginLeft="auto">
        {formattedValue}
      </Typography>
    </Box>
  )
}

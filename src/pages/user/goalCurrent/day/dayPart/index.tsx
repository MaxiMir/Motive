import { Typography } from '@mui/material'

interface DayPartProps {
  datePart: string
}

function DayPart({ datePart }: DayPartProps) {
  const isDate = Number(datePart)
  const variant = isDate ? 'h6' : 'body2'

  return (
    <Typography variant={variant} component="span">
      {datePart}
    </Typography>
  )
}

export default DayPart

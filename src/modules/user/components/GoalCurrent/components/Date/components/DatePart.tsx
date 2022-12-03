import { Typography } from '@mui/material'

interface DatePartProps {
  datePart: string
}

function DatePart({ datePart }: DatePartProps) {
  const isDate = Number(datePart)
  const variant = isDate ? 'h6' : 'body2'

  return (
    <Typography variant={variant} component="span">
      {datePart}
    </Typography>
  )
}

export default DatePart

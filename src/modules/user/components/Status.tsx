import { Typography } from '@mui/material'

interface StatusProps {
  status: string
}

export default function Status({ status }: StatusProps) {
  return (
    <Typography variant="caption" sx={{ color: 'zen.sand' }}>
      {status}
    </Typography>
  )
}

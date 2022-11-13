import { Typography } from '@mui/material'

interface StatusProps {
  motto: string
}

export default function Motto({ motto }: StatusProps) {
  return (
    <Typography variant="caption" sx={{ color: 'zen.sand' }}>
      {motto}
    </Typography>
  )
}

import { useRouter } from 'next/router'
import { Box, Typography } from '@mui/material'
import AppIcon from '@ui/AppIcon'

export default function Nickname(): JSX.Element {
  const { query } = useRouter()
  const nickname = query.id

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        '.material-icons, p': {
          fontWeight: 'bold',
          fontSize: 16,
        },
      }}
    >
      <AppIcon name="alternate_email" />
      <Typography sx={{ maxWidth: 200, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
        {nickname}
      </Typography>
    </Box>
  )
}

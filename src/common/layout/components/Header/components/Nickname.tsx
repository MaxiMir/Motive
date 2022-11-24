import { useRouter } from 'next/router'
import { Button, Typography } from '@mui/material'
import AppIcon from '@ui/AppIcon'

export default function Nickname(): JSX.Element {
  const { query, reload } = useRouter()
  const nickname = query.id

  return (
    <Button
      sx={{
        textTransform: 'none',
        '.material-icons, p': {
          color: 'white',
          fontWeight: 'bold',
          fontSize: 16,
        },
      }}
      onClick={reload}
    >
      <AppIcon name="alternate_email" />
      <Typography sx={{ maxWidth: 200, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
        {nickname}
      </Typography>
    </Button>
  )
}

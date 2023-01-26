import { Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'

export function UserLink(): JSX.Element {
  const { query, reload } = useRouter()
  const nickname = query.id

  return (
    <Button onClick={reload}>
      <Typography
        sx={{
          color: 'common.white',
          textOverflow: 'ellipsis',
          fontWeight: 'bold',
        }}
        component="span"
        noWrap
      >
        {nickname}
      </Typography>
    </Button>
  )
}

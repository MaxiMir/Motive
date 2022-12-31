import { useRouter } from 'next/router'
import { Button, Typography } from '@mui/material'

function UserLink(): JSX.Element {
  const { query, reload } = useRouter()
  const nickname = query.id

  return (
    <Button onClick={reload}>
      <Typography
        sx={{
          maxWidth: 300,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          color: 'common.white',
          fontWeight: 'bold',
        }}
        component="span"
      >
        {nickname}
      </Typography>
    </Button>
  )
}

export default UserLink

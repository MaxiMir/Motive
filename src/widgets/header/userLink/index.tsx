import { Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'

function UserLink() {
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

export default UserLink

import { Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'

function ProfileLink() {
  const { query, reload } = useRouter()
  const nickname = query.id

  return (
    <Button color="inherit" onClick={reload}>
      <Typography textOverflow="ellipsis" fontWeight="bold" component="span" noWrap>
        {nickname}
      </Typography>
    </Button>
  )
}

export default ProfileLink

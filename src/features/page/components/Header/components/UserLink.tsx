import { useRouter } from 'next/router'
import { Button, Typography } from '@mui/material'

interface UserLinkProps {
  nickname: string
}

function UserLink({ nickname }: UserLinkProps): JSX.Element {
  const { reload } = useRouter()

  return (
    <Button sx={{ textTransform: 'none' }} onClick={reload}>
      <Typography
        sx={{
          maxWidth: 200,
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

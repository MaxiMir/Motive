import { useRouter } from 'next/router'
import { Button, Typography } from '@mui/material'
import AppIcon from '@ui/AppIcon'

interface NicknameProps {
  nickname: string
}

function Nickname({ nickname }: NicknameProps): JSX.Element {
  const { reload } = useRouter()

  return (
    <Button
      sx={{
        textTransform: 'none',
        '.material-icons, span': {
          color: 'common.white',
          fontWeight: 'bold',
          fontSize: 16,
        },
      }}
      onClick={reload}
    >
      <AppIcon name="alternate_email" />
      <Typography
        sx={{ maxWidth: 200, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
        component="span"
      >
        {nickname}
      </Typography>
    </Button>
  )
}

export default Nickname

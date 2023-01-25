import { Typography } from '@mui/material'
import { TooltipArrow } from '@shared/ui/styled'

interface NicknameProps {
  nickname: string
}

function Nickname({ nickname }: NicknameProps) {
  return (
    <TooltipArrow title={nickname}>
      <Typography
        variant="h5"
        component="p"
        sx={{
          maxWidth: 300,
          textOverflow: 'ellipsis',
          fontWeight: 300,
        }}
        noWrap
      >
        {nickname}
      </Typography>
    </TooltipArrow>
  )
}

export default Nickname

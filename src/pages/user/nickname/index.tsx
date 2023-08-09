import { Typography } from '@mui/material'
import TooltipArrow from 'shared/ui/TooltipArrow'

interface NicknameProps {
  nickname: string
}

function Nickname({ nickname }: NicknameProps) {
  return (
    <TooltipArrow title={nickname}>
      <Typography
        variant="h5"
        component="p"
        fontWeight={300}
        maxWidth={300}
        noWrap
        textOverflow="ellipsis"
      >
        {nickname}
      </Typography>
    </TooltipArrow>
  )
}

export default Nickname

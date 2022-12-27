import { Typography } from '@mui/material'
import TooltipArrow from '@ui/styled/TooltipArrow'

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
          maxWidth: 200,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontWeight: 300,
        }}
      >
        {nickname}
      </Typography>
    </TooltipArrow>
  )
}

export default Nickname

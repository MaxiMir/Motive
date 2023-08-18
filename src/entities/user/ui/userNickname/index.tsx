import { Typography, TypographyProps } from '@mui/material'
import TooltipArrow from 'shared/ui/TooltipArrow'

interface UserNicknameProps extends Pick<TypographyProps, 'variant'> {
  nickname: string
}

export function UserNickname({ nickname, variant }: UserNicknameProps) {
  return (
    <TooltipArrow title={nickname}>
      <Typography
        variant={variant}
        component="p"
        fontWeight={300}
        maxWidth={{
          xs: 180,
          md: 300,
        }}
        noWrap
        textOverflow="ellipsis"
      >
        {nickname}
      </Typography>
    </TooltipArrow>
  )
}

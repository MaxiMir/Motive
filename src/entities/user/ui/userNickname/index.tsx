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
          xs: 150,
          md: 300,
        }}
        whiteSpace="nowrap"
        textOverflow="ellipsis"
        overflow="hidden"
      >
        {nickname}
      </Typography>
    </TooltipArrow>
  )
}

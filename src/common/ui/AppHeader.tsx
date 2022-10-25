import { ElementType } from 'react'
import { Box, Typography, TypographyProps } from '@mui/material'
import AppEmoji, { AppEmojiName } from './AppEmoji'

type AppHeaderProps = TypographyProps & {
  name: AppEmojiName
  component?: ElementType
  mb?: number
}

export default function AppHeader({ name, variant = 'h1', component = 'h1', mb, children }: AppHeaderProps) {
  const gap = variant === 'h1' ? 2 : 1

  return (
    <Box display="flex" alignItems="center" gap={gap} mb={mb}>
      <AppEmoji name={name} variant={variant} />
      <Typography variant={variant} component={component}>
        {children}
      </Typography>
    </Box>
  )
}

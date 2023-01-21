import { ElementType } from 'react'
import { Typography, Stack, TypographyProps, StackProps } from '@mui/material'
import AppEmoji, { AppEmojiName } from './AppEmoji'

interface AppHeaderProps extends TypographyProps {
  name: AppEmojiName
  component?: ElementType
  mb?: StackProps['mb']
}

function EmojiHeader({ name, variant = 'h1', component = 'h1', mb, children }: AppHeaderProps) {
  const spacing = variant === 'h1' ? 2 : 1

  return (
    <Stack direction="row" alignItems="center" spacing={spacing} mb={mb}>
      <AppEmoji name={name} variant={variant} />
      <Typography variant={variant} component={component}>
        {children}
      </Typography>
    </Stack>
  )
}

export default EmojiHeader

import { ElementType } from 'react'
import { Typography, Stack, TypographyProps, StackProps } from '@mui/material'
import Emoji, { EmojiName } from './Emoji'

interface HeaderProps extends TypographyProps {
  name: EmojiName
  component?: ElementType
  mb?: StackProps['mb']
}

function EmojiHeader({ name, variant = 'h1', component = 'h1', mb, children }: HeaderProps) {
  const spacing = variant === 'h1' ? 2 : 1

  return (
    <Stack direction="row" alignItems="center" spacing={spacing} mb={mb}>
      <Emoji name={name} variant={variant} />
      <Typography variant={variant} component={component}>
        {children}
      </Typography>
    </Stack>
  )
}

export default EmojiHeader

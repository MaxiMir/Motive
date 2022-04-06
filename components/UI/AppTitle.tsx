import { ElementType } from 'react'
import { Typography, TypographyProps } from '@mui/material'
import AppBox from './AppBox'
import AppEmoji, { AppEmojiName } from './AppEmoji'

interface AppTitleProps extends TypographyProps {
  name: AppEmojiName
  component?: ElementType
  mb?: number
}

export default function AppTitle({ name, variant = 'h1', component = 'h1', mb, children }: AppTitleProps): JSX.Element {
  const gap = variant === 'h1' ? 2 : 1

  return (
    <AppBox alignItems="center" gap={gap} mb={mb}>
      <AppEmoji name={name} variant={variant} />
      <Typography variant={variant} component={component}>
        {children}
      </Typography>
    </AppBox>
  )
}

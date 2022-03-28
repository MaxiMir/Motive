import AppBox from './AppBox'
import AppEmoji, { AppEmojiName } from './AppEmoji'
import AppTypography, { AppTypographyProps } from './AppTypography'

interface AppTitleProps extends AppTypographyProps {
  name: AppEmojiName
  mb?: number
}

export default function AppTitle({
  name,
  variant = 'h1',
  component = 'h1',
  color = 'initial',
  mb,
  children,
}: AppTitleProps): JSX.Element {
  const spacing = variant === 'h1' ? 2 : 1

  return (
    <AppBox alignItems="center" spacing={spacing} mb={mb}>
      <AppEmoji name={name} variant={variant} />
      <AppTypography variant={variant} component={component} color={color}>
        {children}
      </AppTypography>
    </AppBox>
  )
}

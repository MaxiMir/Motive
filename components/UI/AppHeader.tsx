import AppEmoji, { AppEmojiName } from 'components/UI/AppEmoji'
import AppTypography, { AppTypographyProps } from './AppTypography'
import AppBox from './AppBox'

interface AppHeaderProps extends AppTypographyProps {
  name: AppEmojiName
  mb?: number
}

export default function AppHeader({
  name,
  variant = 'h1',
  component = 'h1',
  color = 'initial',
  mb,
  children,
}: AppHeaderProps): JSX.Element {
  return (
    <AppBox alignItems="center" spacing={1} mb={mb}>
      <AppEmoji name={name} variant={variant} />
      <AppTypography variant={variant} component={component} color={color}>
        {children}
      </AppTypography>
    </AppBox>
  )
}

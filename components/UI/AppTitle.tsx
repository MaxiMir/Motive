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
  return (
    <AppBox alignItems="center" spacing={2} mb={mb}>
      <AppTypography variant={variant} component={component} color={color}>
        <AppEmoji name={name} onlyEmoji /> {children}
      </AppTypography>
    </AppBox>
  )
}

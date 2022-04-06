import AppBox from './AppBox'

interface AppIconProps {
  name: string
}

export default function AppIcon({ name }: AppIconProps): JSX.Element {
  return (
    <AppBox component="span" display={undefined} className="material-icons">
      {name}
    </AppBox>
  )
}

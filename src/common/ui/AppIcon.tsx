import { BoxProps, Typography } from '@mui/material'

type AppIconProps = Exclude<BoxProps, 'component' | 'className'> & {
  name: string
}

export default function AppIcon({ name, ...props }: AppIconProps) {
  return (
    <Typography component="span" className="material-icons" {...props}>
      {name}
    </Typography>
  )
}

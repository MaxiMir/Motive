import { FC } from 'react'
import Image from 'next/image'
import { Typography } from '@material-ui/core'
import { AppBox } from './AppBox'

interface AppHeaderProps {
  src: string
}

export const AppHeader: FC<AppHeaderProps> = ({ src, children }) => (
  <AppBox alignItems="center" spacing={1}>
    <Image src={src} width={32} height={32} alt="header icon" />
    <Typography variant="h4" component="h1">
      {children}
    </Typography>
  </AppBox>
)

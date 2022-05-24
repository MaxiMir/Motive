import dynamic from 'next/dynamic'
import { Typography } from '@mui/material'
import useLocale from 'hooks/useLocale'

const Online = dynamic(() => import('./components/Online'))
const Offline = dynamic(() => import('./components/Offline'))

interface StatusProps {
  status: string
  device?: string | null
}

export default function Status({ status, device }: StatusProps) {
  const { locale } = useLocale()

  return (
    <Typography variant="caption" sx={{ color: 'zen.silent' }}>
      {status === 'online' ? <Online locale={locale} /> : <Offline status={status} device={device} locale={locale} />}
    </Typography>
  )
}

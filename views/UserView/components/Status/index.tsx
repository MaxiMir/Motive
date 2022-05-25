import dynamic from 'next/dynamic'
import { Typography } from '@mui/material'
import useLocale from 'hooks/useLocale'
import { UserBaseDto } from 'dto'

const Online = dynamic(() => import('./components/Online'))
const Offline = dynamic(() => import('./components/Offline'))

type StatusProps = Pick<UserBaseDto, 'online' | 'lastSeen' | 'device'>

export default function Status({ online, lastSeen, device }: StatusProps) {
  const { locale } = useLocale()

  return (
    <Typography variant="caption" sx={{ color: 'zen.silent' }}>
      {online ? (
        <Online locale={locale} />
      ) : (
        <>{lastSeen && <Offline lastSeen={lastSeen} device={device} locale={locale} />}</>
      )}
    </Typography>
  )
}

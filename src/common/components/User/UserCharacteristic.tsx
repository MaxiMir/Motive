import dynamic from 'next/dynamic'
import { Box, Typography } from '@mui/material'
import { UserDto, SecondCharacteristicName, MAIN_CHARACTERISTICS } from '@dto'
import { getUserHref } from '@helpers/url'
import CharacteristicUser from '@components/Characteristic/CharacteristicUser'
import AppLink from '@ui/AppLink'
import UserAvatar from './UserAvatar'

const AppInView = dynamic(() => import('@ui/AppInView'))

const CHARACTERISTICS = [...MAIN_CHARACTERISTICS, SecondCharacteristicName.Completed]

export interface UserCharacteristicProps {
  user: UserDto
  inView?: boolean
  menu?: JSX.Element
  onView?: () => void
  onClose?: () => void
}

export default function UserCharacteristic({ user, inView, menu, onView, onClose }: UserCharacteristicProps) {
  const { nickname, name, avatar, characteristic, online } = user
  const href = getUserHref(nickname)

  return (
    <>
      <Box display="flex" alignItems="center" gap={2} height={60}>
        <UserAvatar name={name} avatar={avatar} href={href} online={online} size={55} onClick={onClose} />
        <Box display="flex" flexDirection="column" justifyContent="space-between" flex={1}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <AppLink href={href} title={name} sx={{ textDecoration: 'none' }} onClick={onClose}>
              <Typography variant="subtitle1" component="p">
                {name}
              </Typography>
            </AppLink>
            {menu}
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            {CHARACTERISTICS.map((characteristicName) => (
              <CharacteristicUser
                name={characteristicName}
                value={characteristic[characteristicName]}
                key={characteristicName}
              />
            ))}
          </Box>
        </Box>
      </Box>
      {onView && <>{inView && <AppInView onView={onView} />}</>}
    </>
  )
}

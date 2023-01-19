import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Box, Typography } from '@mui/material'
import { UserDto, toHref } from '@features/user'
import { MAIN_CHARACTERISTICS, SecondCharacteristicName } from '@features/characteristic'
import CharacteristicUser from '@components/Characteristic/CharacteristicUser'
import UserLink from './UserLink'

const AppInView = dynamic(() => import('@ui/AppInView'))

const CHARACTERISTICS = [...MAIN_CHARACTERISTICS, SecondCharacteristicName.Completed]

interface UserCharacteristicProps {
  user: UserDto
  inView?: boolean
  menu?: JSX.Element
  onView?: () => void
  onClose?: () => void
}

function UserCharacteristic({ user, inView, menu, onView, onClose }: UserCharacteristicProps) {
  const { nickname, name, avatar, characteristic, online } = user
  const href = toHref(nickname)

  return (
    <>
      <Box display="flex" alignItems="center" gap={2} height={60}>
        <UserLink
          name={name}
          avatar={avatar}
          href={href}
          online={online}
          size={55}
          onClick={onClose}
        />
        <Box display="flex" flexDirection="column" justifyContent="space-between" flex={1}>
          <Typography variant="subtitle1" component="span">
            <Link href={href} onClick={onClose}>
              {name}
            </Link>
          </Typography>
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
        {menu}
      </Box>
      {onView && <>{inView && <AppInView onView={onView} />}</>}
    </>
  )
}

export default UserCharacteristic

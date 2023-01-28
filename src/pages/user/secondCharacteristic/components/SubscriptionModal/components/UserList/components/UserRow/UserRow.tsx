import { Stack, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { CharacteristicUser } from 'entities/characteristic'
import { MAIN_CHARACTERISTICS, SecondCharacteristicName, UserDto } from 'shared/api'
import { joinToHref } from 'shared/lib/helpers'
import Avatar from 'shared/ui/avatar'

const InView = dynamic(() => import('shared/ui/InView'))

const CHARACTERISTICS = [...MAIN_CHARACTERISTICS, SecondCharacteristicName.Completed]

interface UserRowProps {
  user: UserDto
  inView: boolean
  onView: () => void
  onClose: () => void
}

function UserRow({ user, inView, onView, onClose }: UserRowProps) {
  const { nickname, name, avatar, characteristic, online } = user
  const href = joinToHref(nickname)

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Link href={href} title={name} onClick={onClose}>
          <Avatar src={avatar} name={name} online={online} size={55} />
        </Link>
        <Stack justifyContent="space-between" flex={1}>
          <Typography variant="subtitle1" component="span">
            <Link href={href} onClick={onClose}>
              {name}
            </Link>
          </Typography>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            {CHARACTERISTICS.map((characteristicName) => (
              <CharacteristicUser
                name={characteristicName}
                value={characteristic[characteristicName]}
                key={characteristicName}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
      {onView && <>{inView && <InView onView={onView} />}</>}
    </>
  )
}

export default UserRow

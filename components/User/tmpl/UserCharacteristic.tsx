import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { Box, Typography } from '@mui/material'
import { UserDto, UserCharacteristicName } from 'dto'
import { getUserHref } from 'views/UserView/helper'
import Characteristic from 'components/Characteristic'
import AppLink from 'components/UI/AppLink'
import AppDot from 'components/UI/AppDot'
import AppAvatar from 'components/UI/AppAvatar'

const AppInView = dynamic(() => import('components/UI/AppInView'))

const CHARACTERISTICS: UserCharacteristicName[] = ['motivation', 'creativity', 'support', 'completed']
const LAST_CHARACTERISTIC_INDEX = 3

export interface UserCharacteristicProps {
  tmpl: 'characteristic'
  user: UserDto
  inView?: boolean
  menu?: JSX.Element
  onView?: () => void
}

export default function UserCharacteristic({ user, inView, menu, onView }: UserCharacteristicProps): JSX.Element {
  const { nickname, avatar, name, characteristic } = user
  const href = getUserHref(nickname)

  return (
    <>
      <Box display="flex" alignItems="center" gap={2} height={60}>
        <AppLink href={href} title={name}>
          <AppAvatar src={avatar} size={55} />
        </AppLink>
        <Box display="flex" flexDirection="column" justifyContent="space-between" flex={1}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <AppLink href={href} title={name} sx={{ textDecoration: 'none' }}>
              <Typography variant="subtitle1" component="p">
                {name}
              </Typography>
            </AppLink>
            {menu}
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            {CHARACTERISTICS.map((characteristicName, index) => (
              <Fragment key={characteristicName}>
                <Characteristic tmpl="user" name={characteristicName} value={characteristic[characteristicName]} />
                {index !== LAST_CHARACTERISTIC_INDEX && <AppDot />}
              </Fragment>
            ))}
          </Box>
        </Box>
      </Box>
      {onView && <>{inView && <AppInView onView={onView} />}</>}
    </>
  )
}

import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { UserDto, UserCharacteristicName } from 'dto'
import useCharacteristicColors from 'hooks/useCharacteristicColors'
import { getUserHref } from 'views/UserView/helper'
import Characteristic from 'components/Characteristic'
import AppBox from 'components/UI/AppBox'
import AppLink from 'components/UI/AppLink'
import AppDot from 'components/UI/AppDot'
import AppTypography from 'components/UI/AppTypography'
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
  const colors = useCharacteristicColors()
  const href = getUserHref(nickname)

  return (
    <>
      <AppBox spacing={2} height={60}>
        <AppLink href={href} title={name}>
          <AppAvatar src={avatar} size={55} />
        </AppLink>
        <AppBox flexDirection="column" justifyContent="space-between" flex={1}>
          <AppBox justifyContent="space-between" alignItems="center">
            <AppLink href={href} title={name}>
              <AppTypography variant="subtitle1" component="p">
                {name}
              </AppTypography>
            </AppLink>
            {menu}
          </AppBox>
          <AppBox justifyContent="space-between" alignItems="center">
            {CHARACTERISTICS.map((characteristicName, index) => (
              <Fragment key={characteristicName}>
                <Characteristic
                  tmpl="user"
                  name={characteristicName}
                  value={characteristic[characteristicName]}
                  color={colors[characteristicName].fontColor}
                />
                {index !== LAST_CHARACTERISTIC_INDEX && <AppDot />}
              </Fragment>
            ))}
          </AppBox>
        </AppBox>
      </AppBox>
      {onView && <>{inView && <AppInView onView={onView} />}</>}
    </>
  )
}

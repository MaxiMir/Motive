import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Box, Button, Typography } from '@mui/material'
import i18nAll from 'constants/i18n'
import { MainCharacteristic, SecondCharacteristic, UserCharacteristic, UserDetailDto } from 'dto'
import { Locale } from 'hooks/useLocale'
import CharacteristicUser from 'components/Characteristic/CharacteristicUser'

const ModalFollowers = dynamic(() => import('components/Modal/ModalFollowers'))
const ModalCompleted = dynamic(() => import('components/Modal/ModalCompleted'))
const ModalCharacteristic = dynamic(() => import('components/Modal/ModalCharacteristic'))

type Modal = SecondCharacteristic.COMPLETED | SecondCharacteristic.FOLLOWERS | MainCharacteristic

interface CharacteristicProps {
  user: UserDetailDto
  name: UserCharacteristic
  value: number
  locale: Locale
  onClick?: () => void
}

export default function Characteristic(props: CharacteristicProps) {
  const { user, name, locale } = props
  const router = useRouter()
  const [modal, setModal] = useState<Modal>()
  const button = i18nAll[locale][name]
  const modalCharacteristic =
    modal === MainCharacteristic.MOTIVATION ||
    modal === MainCharacteristic.CREATIVITY ||
    modal === MainCharacteristic.SUPPORT

  const onClick = () => {
    switch (name) {
      case 'followers':
      case 'completed':
      case 'motivation':
      case 'creativity':
      case 'support':
        setModal(name)
    }
  }

  const onClose = () => setModal(undefined)

  useEffect(onClose, [router.asPath])

  return (
    <>
      <Button
        sx={{
          textTransform: 'none',
          justifyContent: 'center',
          width: {
            sm: '110px',
          },
          padding: {
            xs: '6px 4px',
            md: undefined,
          },
        }}
        onClick={onClick}
      >
        <Box
          display="flex"
          justifyContent="flex-start"
          flexDirection="column"
          gap={0.5}
          minWidth={name === MainCharacteristic.CREATIVITY ? 68 : undefined}
        >
          <Typography
            variant="caption"
            sx={{
              color: `${name}.main`,
              fontSize: {
                xs: locale === 'ru' ? '0.55rem' : '0.75rem',
                md: '0.8rem',
              },
              textAlign: 'start',
            }}
          >
            {button}
          </Typography>
          <CharacteristicUser {...props} />
        </Box>
      </Button>
      {modal === SecondCharacteristic.COMPLETED && <ModalCompleted user={user} onClose={onClose} />}
      {modal === SecondCharacteristic.FOLLOWERS && <ModalFollowers user={user} onClose={onClose} />}
      {modalCharacteristic && <ModalCharacteristic user={user} characteristic={modal} onClose={onClose} />}
    </>
  )
}

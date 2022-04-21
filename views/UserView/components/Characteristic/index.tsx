import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Box, Typography, Button } from '@mui/material'
import i18nAll from 'constants/i18n'
import { UserDetailDto, UserCharacteristicName } from 'dto'
import { Locale } from 'hooks/useLocale'
import CharacteristicUser from 'components/Characteristic/CharacteristicUser'
import OptionalTooltip from 'components/OptionalTooltip'
import i18n from './i18n'

const ModalFollowers = dynamic(() => import('components/Modal/ModalFollowers'))
const ModalCompleted = dynamic(() => import('components/Modal/ModalCompleted'))

interface CharacteristicProps {
  user: UserDetailDto
  name: UserCharacteristicName
  value: number
  locale: Locale
  onClick?: () => void
}

export default function Characteristic(props: CharacteristicProps): JSX.Element {
  const { user, name, locale } = props
  const router = useRouter()
  const [modal, setModal] = useState<'followers' | 'completed'>()
  const button = i18nAll[locale][name]
  const title = i18n[locale][name]

  const onClick = () => {
    switch (name) {
      case 'followers':
      case 'completed':
        setModal(name)
    }
  }

  const onClose = () => setModal(undefined)

  useEffect(onClose, [router.asPath])

  return (
    <>
      <OptionalTooltip tmpl="custom" custom={title} wrap={!!title}>
        <Button
          sx={{
            textTransform: 'none',
            justifyContent: 'flex-start',
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
          <Box display="flex" flexDirection="column" gap={0.5}>
            <Typography
              variant="caption"
              sx={{
                color: `${name}.main`,
                fontSize: {
                  xs: locale === 'ru' ? '0.55rem' : '0.75rem',
                  md: '0.8rem',
                },
              }}
            >
              {button}
            </Typography>
            <CharacteristicUser {...props} />
          </Box>
        </Button>
      </OptionalTooltip>
      {modal === 'completed' && <ModalCompleted user={user} onClose={onClose} />}
      {modal === 'followers' && <ModalFollowers user={user} onClose={onClose} />}
    </>
  )
}

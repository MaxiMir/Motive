import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Box, Typography, Button } from '@mui/material'
import i18nAll from 'constants/i18n'
import { UserDetailDto, UserCharacteristicName } from 'dto'
import { Locale } from 'hooks/useLocale'
import CharacteristicBase from 'components/Characteristic'
import AppOptionalTooltip from 'components/UI/AppOptionalTooltip'
import i18n from './i18n'

const Modal = dynamic(() => import('components/Modal'))

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
  const title = i18nAll[locale][name]
  const tooltip = i18n[locale][name]

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
      <AppOptionalTooltip title={tooltip}>
        <Button
          sx={{
            textTransform: 'none',
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
          <Box display="flex" flexDirection="column" alignItems="flex-start" gap={0.5}>
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
              {title}
            </Typography>
            <CharacteristicBase tmpl="user" {...props} />
          </Box>
        </Button>
      </AppOptionalTooltip>
      {modal && <Modal tmpl={modal} user={user} onClose={onClose} />}
    </>
  )
}

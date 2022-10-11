import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Box, Button, Typography, useTheme } from '@mui/material'
import { MainCharacteristicName } from 'dto'
import i18nCommon from 'constants/i18n'
import AppCircle from 'components/ui/AppCircle'
import useLocale from 'hooks/useLocale'
import { ucFirst } from 'helpers/prepare'
import { getOffset, RADIUS } from './helper'
import i18n from './i18n'

const ModalCharacteristic = dynamic(() => import('./components/ModalCharacteristic'))

interface MainCharacteristicProps {
  name: MainCharacteristicName
  value: number
}

export default function MainCharacteristic({ name, value }: MainCharacteristicProps) {
  const theme = useTheme()
  const { locale } = useLocale()
  const [modal, setModal] = useState<MainCharacteristicName>()
  const level = Math.floor(value)
  const offset = getOffset(value)
  const { lvl } = i18n[locale]
  const characteristicName = ucFirst(i18nCommon[locale][name])

  const onClick = () => {
    switch (name) {
      case 'motivation':
      case 'creativity':
      case 'support':
        setModal(name)
    }
  }

  const onClose = () => setModal(undefined)

  return (
    <>
      <Button sx={{ textTransform: 'none' }} onClick={onClick}>
        <AppCircle
          size={100}
          strokeWidth={50}
          strokeWidthBg={50}
          radius={RADIUS}
          dasharray={1100}
          offset={offset}
          light={theme.palette.circle}
          dark={theme.palette[name].main}
        />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            color: 'white',
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography
              variant="caption"
              component="b"
              sx={{
                fontSize: '0.875rem',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              {level} {lvl}
            </Typography>
            <Typography
              component="p"
              sx={{
                fontSize: '0.625rem',
                color: 'white',
              }}
            >
              {characteristicName}
            </Typography>
          </Box>
        </Box>
      </Button>
      {modal && <ModalCharacteristic name={modal} value={value} onClose={onClose} />}
    </>
  )
}

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Box, Button, Typography, useTheme } from '@mui/material'
import { MainCharacteristicName } from '@features/characteristic'
import AppCircle from '@ui/AppCircle'
import { useMessages } from './hooks/useMessages'
import { getOffset, RADIUS } from './helper'

const ModalCharacteristic = dynamic(() => import('./components/ModalCharacteristic'))

interface MainCharacteristicProps {
  name: MainCharacteristicName
  value: number
}

function MainCharacteristic({ name, value }: MainCharacteristicProps) {
  const messages = useMessages(name)
  const theme = useTheme()
  const [modal, setModal] = useState<MainCharacteristicName>()
  const offset = getOffset(value)
  const level = Math.floor(value)

  const onClick = () => setModal(name)

  const onClose = () => setModal(undefined)

  return (
    <>
      <Button
        sx={{
          borderRadius: '50%',
          textTransform: 'none',
          padding: {
            xs: '0.25rem',
            md: '0.5rem',
          },
        }}
        aria-expanded={modal ? 'true' : undefined}
        aria-haspopup="true"
        onClick={onClick}
      >
        <AppCircle
          size={100}
          strokeWidth={50}
          strokeWidthBg={50}
          radius={RADIUS}
          dasharray={1100}
          offset={offset}
          light={theme.palette.circle}
          dark={theme.palette[name].border}
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
              {level} {messages.lvlText}
            </Typography>
            <Typography
              component="p"
              sx={{
                fontSize: '0.56rem',
                color: 'white',
              }}
            >
              {messages.header}
            </Typography>
          </Box>
        </Box>
      </Button>
      {modal && <ModalCharacteristic name={modal} value={value} onClose={onClose} />}
    </>
  )
}

export default MainCharacteristic

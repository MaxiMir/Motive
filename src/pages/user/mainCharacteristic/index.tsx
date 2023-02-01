import { Button, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { MainCharacteristicName } from 'shared/api'
import Circle from 'shared/ui/Circle'
import { RADIUS } from './consts'
import { getOffset } from './lib'

const CharacteristicInfo = dynamic(() =>
  import('entities/characteristic').then((m) => m.CharacteristicInfo),
)

interface MainCharacteristicProps {
  name: MainCharacteristicName
  value: number
}

function MainCharacteristic({ name, value }: MainCharacteristicProps) {
  const { formatMessage } = useIntl()
  const theme = useTheme()
  const [modal, setModal] = useState<MainCharacteristicName>()
  const offset = getOffset(value)
  const level = Math.floor(value)
  const header = formatMessage({ id: `common.${name}` })
  const lvlText = formatMessage({ id: 'common.lvl-short' })

  const onClick = () => setModal(name)

  const onClose = () => setModal(undefined)

  return (
    <>
      <Button
        aria-haspopup="true"
        aria-expanded={modal ? 'true' : undefined}
        sx={{
          borderRadius: '50%',
          ':hover': {
            backgroundColor: '#1a1a1a',
          },
        }}
        onClick={onClick}
      >
        <Circle
          size={100}
          strokeWidth={50}
          strokeWidthBg={50}
          radius={RADIUS}
          dasharray={1100}
          offset={offset}
          light={theme.palette.circle}
          dark={theme.palette[name].border}
        />
        <Stack
          justifyContent="center"
          alignItems="center"
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
        >
          <Stack alignItems="center">
            <Typography
              variant="caption"
              component="p"
              sx={{
                fontSize: 14,
                fontWeight: 'bold',
                color: 'common.white',
              }}
            >
              {level} {lvlText}
            </Typography>
            <Typography
              component="p"
              sx={{
                fontSize: 9,
                color: 'common.white',
              }}
            >
              {header}
            </Typography>
          </Stack>
        </Stack>
      </Button>
      {modal && <CharacteristicInfo name={modal} value={value} onClose={onClose} />}
    </>
  )
}

export default MainCharacteristic

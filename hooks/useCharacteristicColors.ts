import { useTheme } from '@material-ui/core'
import { Characteristic } from 'dto'

export type CharacteristicColor = {
  fontColor: string
  start: string
  end: string
}

export type CharacteristicColors = ReturnType<typeof useCharacteristicColors>

export default function useCharacteristicColors(): { [k in Characteristic]: CharacteristicColor } {
  const { palette } = useTheme()

  return {
    motivation: {
      fontColor: palette.warning.main,
      start: palette.warning.light,
      end: palette.warning.dark,
    },
    support: {
      fontColor: palette.info.main,
      start: palette.info.light,
      end: palette.info.dark,
    },
    creativity: {
      fontColor: palette.success.main,
      start: palette.success.light,
      end: palette.success.dark,
    },
    completed: {
      fontColor: '#78C77B',
      start: palette.text.disabled,
      end: '#1D1D1F',
    },
    abandoned: {
      fontColor: '#AEABAE',
      start: palette.text.disabled, // unused
      end: '#1D1D1F', // unused
    },
    members: {
      fontColor: '#EF8277',
      start: palette.text.disabled, // unused
      end: '#1D1D1F', // unused
    },
  }
}

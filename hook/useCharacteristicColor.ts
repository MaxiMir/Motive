import { useTheme } from '@material-ui/core'

export const useCharacteristicColor = () => {
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
      fontColor: palette.warning.main,
      start: '#BDB5B5',
      end: '#1D1D1F',
    },
    abandoned: {
      fontColor: palette.warning.main,
      start: '#BDB5B5',
      end: '#1D1D1F',
    },
  }
}

export type CharacteristicColor = ReturnType<typeof useCharacteristicColor>

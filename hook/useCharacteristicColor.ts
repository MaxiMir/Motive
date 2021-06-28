import { useTheme } from '@material-ui/core'

type Characteristic =
  | 'motivation'
  | 'support'
  | 'creativity'
  | 'completed'
  | 'abandoned'

export type CharacteristicColor = {
  fontColor: string
  start: string
  end: string
}

export const useCharacteristicColor = (): {
  [k in Characteristic]: CharacteristicColor
} => {
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
      start: palette.text.disabled,
      end: '#1D1D1F',
    },
    abandoned: {
      fontColor: palette.warning.main,
      start: palette.text.disabled,
      end: '#1D1D1F',
    },
  }
}

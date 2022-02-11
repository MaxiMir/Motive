import { useTheme } from '@material-ui/core'
import { GoalCharacteristicName, UserCharacteristicName } from 'dto'

export type CharacteristicColor = {
  fontColor: string
  start: string
  end: string
}

export type CharacteristicColors = ReturnType<typeof useCharacteristicColors>

type UseCharacteristicColors = {
  [k in UserCharacteristicName | GoalCharacteristicName]: CharacteristicColor
}

export default function useCharacteristicColors(): UseCharacteristicColors {
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
    followers: {
      fontColor: '#f2d900',
      start: palette.text.disabled, // unused
      end: '#1D1D1F', // unused
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

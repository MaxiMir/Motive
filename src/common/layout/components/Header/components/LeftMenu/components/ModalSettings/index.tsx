import { useContext, MouseEvent } from 'react'
import { useIntl } from 'react-intl'
import { ToggleButtonGroup, ToggleButton, Box, Typography, PaletteMode } from '@mui/material'
import { styled } from '@mui/system'
import { ThemeContext } from '@context/themeContext'
import { EN, RU, UK, Locale, useSetLocale } from '@hooks/useSetLocale'
import AppModal from '@ui/AppModal'
import AppEmoji from '@ui/AppEmoji'
import i18n from './i18n'

interface ModalLanguageProps {
  onClose: () => void
}

export default function ModalSettings({ onClose }: ModalLanguageProps) {
  const { locale } = useIntl()
  const setLocale = useSetLocale()
  const { mode, setMode } = useContext(ThemeContext)
  const { title, modeHeader, languageHeader, light, system, dark } = i18n[locale]

  const onChangeLocale = (_: MouseEvent<HTMLElement>, newLocale: Locale) => {
    setLocale(newLocale)
    onClose()
  }

  const onChangeMode = (_: MouseEvent<HTMLElement>, newMode: PaletteMode) => {
    setMode(newMode)
    onClose()
  }

  return (
    <AppModal title={title} maxWidth="xs" blur={false} onClose={onClose}>
      <Box display="flex" flexDirection="column" gap={3}>
        <Box display="flex" flexDirection="column" gap={1}>
          <Header variant="body2" gutterBottom>
            {languageHeader}:
          </Header>
          <ToggleButtonGroup
            color="warning"
            value={locale}
            exclusive
            aria-label={languageHeader}
            onChange={onChangeLocale}
          >
            <GroupButton value={EN}>
              <AppEmoji name="en" />
              <Box component="span">Eng</Box>
            </GroupButton>
            <GroupButton value={RU}>
              <AppEmoji name="ru" />
              <Box component="span">Рус</Box>
            </GroupButton>
            <GroupButton value={UK}>
              <AppEmoji name="uk" /> Укр
            </GroupButton>
          </ToggleButtonGroup>
        </Box>
        <Box display="flex" flexDirection="column" gap={1}>
          <Header variant="body2" gutterBottom>
            {modeHeader}:
          </Header>
          <ToggleButtonGroup color="warning" value={mode} exclusive aria-label={modeHeader} onChange={onChangeMode}>
            <GroupButton value="light" disabled>
              <AppEmoji name="light" /> {light}
            </GroupButton>
            <GroupButton value="system" disabled>
              <AppEmoji name="system" /> {system}
            </GroupButton>
            <GroupButton value="dark" disabled>
              <AppEmoji name="dark" /> {dark}
            </GroupButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
    </AppModal>
  )
}

const Header = styled(Typography)(({ theme }) => ({
  color: theme.palette.zen.silent,
}))

const GroupButton = styled(ToggleButton)({
  textTransform: 'uppercase',
  display: 'flex',
  gap: 8,
  flex: 1,
  '& p': {
    fontSize: 24,
  },
})

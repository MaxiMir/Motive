import { useContext, MouseEvent } from 'react'
import { ToggleButtonGroup, ToggleButton, Box, Typography, PaletteMode } from '@mui/material'
import { styled } from '@mui/system'
import { ThemeContext } from 'context/themeContext'
import useLocale, { Locale } from 'hooks/useLocale'
import AppModal from 'components/UI/AppModal'
import AppEmoji from 'components/UI/AppEmoji'
import i18n from './i18n'

interface ModalLanguageProps {
  onClose: () => void
}

export default function ModalSettings({ onClose }: ModalLanguageProps) {
  const { locale, setLocale } = useLocale()
  const { mode, setMode } = useContext(ThemeContext)
  const { title, modeHeader, languageHeader } = i18n[locale]

  const onChangeLocale = (_: MouseEvent<HTMLElement>, newLocale: Locale) => {
    setLocale(newLocale)
  }

  const onChangeMode = (_: MouseEvent<HTMLElement>, newMode: PaletteMode) => {
    setMode(newMode)
  }

  return (
    <AppModal title={title} maxWidth="xs" blur={false} onClose={onClose}>
      <Box display="flex" flexDirection="column" gap={3}>
        <Box display="flex" flexDirection="column" gap={1}>
          <Header variant="body2" gutterBottom>
            {languageHeader}:
          </Header>
          <ToggleButtonGroup color="warning" value={locale} exclusive aria-label="label" onChange={onChangeLocale}>
            <GroupButton value="en">
              <AppEmoji name="en" />
              <Box component="span">Eng</Box>
            </GroupButton>
            <GroupButton value="ru">
              <AppEmoji name="ru" />
              <Box component="span">Рус</Box>
            </GroupButton>
            <GroupButton value="uk" disabled>
              <AppEmoji name="uk" /> Укр
            </GroupButton>
          </ToggleButtonGroup>
        </Box>
        <Box display="flex" flexDirection="column" gap={1}>
          <Header variant="body2" gutterBottom>
            {modeHeader}:
          </Header>
          <ToggleButtonGroup color="warning" value={mode} exclusive aria-label="label" onChange={onChangeMode}>
            <GroupButton value="light" disabled>
              <AppEmoji name="light" /> Light
            </GroupButton>
            <GroupButton value="system" disabled>
              <AppEmoji name="system" /> System
            </GroupButton>
            <GroupButton value="dark" disabled>
              <AppEmoji name="dark" /> Dark
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

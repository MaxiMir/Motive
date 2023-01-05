import { useContext, MouseEvent } from 'react'
import { useIntl } from 'react-intl'
import { ToggleButtonGroup, ToggleButton, Box, Typography, PaletteMode } from '@mui/material'
import { styled } from '@mui/system'
import { ThemeContext } from '@features/theme'
import { useSetLocale, Locale } from '@features/locale'
import AppModal from '@ui/AppModal'
import AppEmoji from '@ui/AppEmoji'
import { useMessages } from './hooks/useMessages'

interface SettingsModalProps {
  onClose: () => void
}

function SettingsModal({ onClose }: SettingsModalProps) {
  const { locale } = useIntl()
  const setLocale = useSetLocale()
  const messages = useMessages()
  const { mode, setMode } = useContext(ThemeContext)

  const onChangeLocale = (_: MouseEvent<HTMLElement>, newLocale: Locale) => {
    setLocale(newLocale)
    onClose()
  }

  const onChangeMode = (_: MouseEvent<HTMLElement>, newMode: PaletteMode) => {
    setMode(newMode)
    onClose()
  }

  return (
    <AppModal title={messages.title} maxWidth="xs" onClose={onClose}>
      <Box display="flex" flexDirection="column" gap={3}>
        <Box display="flex" flexDirection="column" gap={1}>
          <Header variant="body2" gutterBottom>
            {messages.languageHeader}:
          </Header>
          <ToggleButtonGroup
            color="warning"
            value={locale}
            exclusive
            aria-label={messages.languageHeader}
            onChange={onChangeLocale}
          >
            <GroupButton value={Locale.En} size="small">
              <AppEmoji name="en" />
              <Box component="span">EN</Box>
            </GroupButton>
            <GroupButton value={Locale.Ru} size="small">
              <AppEmoji name="ru" />
              <Box component="span">РУ</Box>
            </GroupButton>
            <GroupButton value={Locale.Uk} size="small">
              <AppEmoji name="uk" /> УК
            </GroupButton>
            <GroupButton value={Locale.Zh} size="small">
              <AppEmoji name="zh" /> 中国
            </GroupButton>
          </ToggleButtonGroup>
        </Box>
        <Box display="flex" flexDirection="column" gap={1}>
          <Header variant="body2" gutterBottom>
            {messages.modeHeader}:
          </Header>
          <ToggleButtonGroup
            color="warning"
            value={mode}
            exclusive
            aria-label={messages.modeHeader}
            onChange={onChangeMode}
          >
            <GroupButton value="light" size="small" disabled>
              <AppEmoji name="light" /> {messages.lightText}
            </GroupButton>
            <GroupButton value="system" size="small" disabled>
              <AppEmoji name="system" /> {messages.systemText}
            </GroupButton>
            <GroupButton value="dark" size="small" disabled>
              <AppEmoji name="dark" /> {messages.darkText}
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
  display: 'flex',
  gap: 8,
  flex: 1,
})

export default SettingsModal

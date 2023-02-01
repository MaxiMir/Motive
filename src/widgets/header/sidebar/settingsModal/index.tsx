import { ToggleButtonGroup, ToggleButton, Typography, Stack, PaletteMode } from '@mui/material'
import { styled } from '@mui/system'
import { MouseEvent } from 'react'
import { useIntl } from 'react-intl'
import { useSetLocale, Locale } from 'entities/locale'
import Modal from 'shared/ui/Modal'
import { usePaletteModeContext } from 'shared/ui/theme'
import { useMessages } from './lib'

interface SettingsModalProps {
  onClose: () => void
}

function SettingsModal({ onClose }: SettingsModalProps) {
  const { locale } = useIntl()
  const setLocale = useSetLocale()
  const messages = useMessages()
  const { mode, setMode } = usePaletteModeContext()

  const onChangeLocale = (_: MouseEvent<HTMLElement>, newLocale: Locale) => {
    setLocale(newLocale)
    onClose()
  }

  const onChangeMode = (_: MouseEvent<HTMLElement>, newMode: PaletteMode) => {
    setMode(newMode)
    onClose()
  }

  return (
    <Modal title={messages.title} maxWidth="xs" onClose={onClose}>
      <Stack gap={3}>
        <Stack gap={1}>
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
            <GroupButton size="small" value={Locale.En}>
              🇺🇸 EN
            </GroupButton>
            <GroupButton size="small" value={Locale.Ru}>
              🇷🇺 РУ
            </GroupButton>
            <GroupButton size="small" value={Locale.Uk}>
              🇺🇦 УК
            </GroupButton>
            <GroupButton size="small" value={Locale.Zh}>
              🇨🇳 中国
            </GroupButton>
          </ToggleButtonGroup>
        </Stack>
        <Stack gap={1}>
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
            <GroupButton size="small" value="light" disabled>
              🔆 {messages.lightText}
            </GroupButton>
            <GroupButton size="small" value="system" disabled>
              ⚙️ {messages.systemText}
            </GroupButton>
            <GroupButton size="small" value="dark" disabled>
              🌑 {messages.darkText}
            </GroupButton>
          </ToggleButtonGroup>
        </Stack>
      </Stack>
    </Modal>
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

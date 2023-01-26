import { ToggleButtonGroup, ToggleButton, Typography, Stack, PaletteMode } from '@mui/material'
import { styled } from '@mui/system'
import { MouseEvent } from 'react'
import { useIntl } from 'react-intl'
import { useSetLocale, Locale } from '@entities/locale'
import { usePaletteModeContext } from '@entities/theme'
import Emoji from '@shared/ui/Emoji'
import Modal from '@shared/ui/Modal'
import { useMessages } from './lib'

interface SettingsModalProps {
  onClose: () => void
}

export function SettingsModal({ onClose }: SettingsModalProps) {
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
      <Stack spacing={3}>
        <Stack spacing={1}>
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
              <Emoji name="en" /> EN
            </GroupButton>
            <GroupButton size="small" value={Locale.Ru}>
              <Emoji name="ru" /> РУ
            </GroupButton>
            <GroupButton size="small" value={Locale.Uk}>
              <Emoji name="uk" /> УК
            </GroupButton>
            <GroupButton size="small" value={Locale.Zh}>
              <Emoji name="zh" /> 中国
            </GroupButton>
          </ToggleButtonGroup>
        </Stack>
        <Stack spacing={1}>
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
              <Emoji name="light" /> {messages.lightText}
            </GroupButton>
            <GroupButton size="small" value="system" disabled>
              <Emoji name="system" /> {messages.systemText}
            </GroupButton>
            <GroupButton size="small" value="dark" disabled>
              <Emoji name="dark" /> {messages.darkText}
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

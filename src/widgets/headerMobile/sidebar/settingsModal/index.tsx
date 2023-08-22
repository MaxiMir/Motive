import { ToggleButtonGroup, ToggleButton, Typography, Stack, PaletteMode, Box } from '@mui/material'
import { styled } from '@mui/system'
import { MouseEvent } from 'react'
import { useIntl } from 'react-intl'
import { useSetLocale } from 'features/user/set-locale'
import { Locale, LANGUAGES } from 'entities/locale'
import Modal from 'shared/ui/Modal'
import { usePaletteMode } from 'shared/ui/palette'

interface SettingsModalProps {
  onClose: () => void
}

function SettingsModal({ onClose }: SettingsModalProps) {
  const { locale } = useIntl()
  const setLocale = useSetLocale()
  const { mode, setMode } = usePaletteMode()
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'common.settings' })
  const modeHeader = formatMessage({ id: 'common.mode' })
  const languageHeader = formatMessage({ id: 'common.language' })
  const lightText = formatMessage({ id: 'common.light' })
  const systemText = formatMessage({ id: 'common.system' })
  const darkText = formatMessage({ id: 'common.dark' })

  const onChangeLocale = (_: MouseEvent<HTMLElement>, newLocale: Locale) => {
    setLocale(newLocale).then(onClose)
  }

  const onChangeMode = (_: MouseEvent<HTMLElement>, newMode: PaletteMode) => {
    setMode(newMode)
    onClose()
  }

  return (
    <Modal title={title} maxWidth="xs" onClose={onClose}>
      <Stack gap={3}>
        <Stack gap={1}>
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
            {LANGUAGES.map(({ primary, emoji, value }) => (
              <GroupButton size="small" value={value} key={value}>
                <Box display="inline-flex" width={12}>
                  {emoji}
                </Box>
                {primary}
              </GroupButton>
            ))}
          </ToggleButtonGroup>
        </Stack>
        <Stack gap={1}>
          <Header variant="body2" gutterBottom>
            {modeHeader}:
          </Header>
          <ToggleButtonGroup
            color="warning"
            value={mode}
            exclusive
            aria-label={modeHeader}
            onChange={onChangeMode}
          >
            <GroupButton size="small" value="light" disabled>
              <Box display="inline-flex" width={12}>
                🔆
              </Box>
              {lightText}
            </GroupButton>
            <GroupButton size="small" value="system" disabled>
              <Box display="inline-flex" width={12}>
                ⚙️
              </Box>
              {systemText}
            </GroupButton>
            <GroupButton size="small" value="dark" disabled>
              <Box display="inline-flex" width={12}>
                🌑
              </Box>
              {darkText}
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

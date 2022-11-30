import { useContext, MouseEvent } from 'react'
import { useIntl } from 'react-intl'
import { ToggleButtonGroup, ToggleButton, Box, Typography, PaletteMode } from '@mui/material'
import { styled } from '@mui/system'
import { ThemeContext } from '@context/themeContext'
import useSetLocale, { Locale } from '@hooks/useSetLocale'
import AppModal from '@ui/AppModal'
import AppEmoji from '@ui/AppEmoji'

interface ModalLanguageProps {
  onClose: () => void
}

function ModalSettings({ onClose }: ModalLanguageProps) {
  const { locale, formatMessage } = useIntl()
  const setLocale = useSetLocale()
  const { mode, setMode } = useContext(ThemeContext)
  const title = formatMessage({ id: 'common.settings' })
  const modeHeader = formatMessage({ id: 'common.mode' })
  const languageHeader = formatMessage({ id: 'common.language' })
  const lightText = formatMessage({ id: 'common.light' })
  const systemText = formatMessage({ id: 'common.system' })
  const darkText = formatMessage({ id: 'common.dark' })

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
            <GroupButton value={Locale.En} size="small">
              <AppEmoji name="en" />
              <Box component="span">Eng</Box>
            </GroupButton>
            <GroupButton value={Locale.Ru} size="small">
              <AppEmoji name="ru" />
              <Box component="span">Рус</Box>
            </GroupButton>
            <GroupButton value={Locale.Uk} size="small">
              <AppEmoji name="uk" /> Укр
            </GroupButton>
          </ToggleButtonGroup>
        </Box>
        <Box display="flex" flexDirection="column" gap={1}>
          <Header variant="body2" gutterBottom>
            {modeHeader}:
          </Header>
          <ToggleButtonGroup color="warning" value={mode} exclusive aria-label={modeHeader} onChange={onChangeMode}>
            <GroupButton value="light" size="small" disabled>
              <AppEmoji name="light" /> {lightText}
            </GroupButton>
            <GroupButton value="system" size="small" disabled>
              <AppEmoji name="system" /> {systemText}
            </GroupButton>
            <GroupButton value="dark" size="small" disabled>
              <AppEmoji name="dark" /> {darkText}
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

export default ModalSettings

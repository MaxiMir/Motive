import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { paperClasses } from '@mui/material/Paper'
import { Locale, useSetLocale } from '@features/locale'
import { useIntl } from 'react-intl'
import AppEmoji from '@ui/AppEmoji'
import AppMenuItem from '@ui/AppMenuItem'
import { useMessages } from './hooks/useMessages'

const LANGUAGES = [
  { primary: 'EN', name: 'en', value: Locale.En },
  { primary: 'РУ', name: 'ru', value: Locale.Ru },
  { primary: 'УК', name: 'uk', value: Locale.Uk },
  { primary: '中国', name: 'zh', value: Locale.Zh },
] as const

interface LanguageMenuProps {
  anchorEl: HTMLElement | null
  onClose: () => void
}

function LanguageMenu({ anchorEl, onClose }: LanguageMenuProps) {
  const { locale } = useIntl()
  const setLocale = useSetLocale()
  const messages = useMessages()

  const onClick = (value: Locale) => {
    setLocale(value)
    onClose()
  }

  return (
    <Menu
      open
      anchorEl={anchorEl}
      sx={{
        [`& .${paperClasses.root}`]: {
          width: 210,
        },
      }}
      onClose={onClose}
    >
      {LANGUAGES.map(({ name, primary, value }) => (
        <MenuItem disabled={locale === value} key={name} onClick={() => onClick(value)}>
          <ListItemIcon>
            <AppEmoji name={name} sx={{ fontSize: 24 }} />
          </ListItemIcon>
          <ListItemText primary={primary} />
        </MenuItem>
      ))}
      <AppMenuItem
        icon="block"
        text={messages.cancelText}
        color="grey"
        smallIcon={false}
        onClick={onClose}
      />
    </Menu>
  )
}

export default LanguageMenu

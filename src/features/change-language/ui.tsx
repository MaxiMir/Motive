import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { paperClasses } from '@mui/material/Paper'
import { useIntl } from 'react-intl'
import { Locale, useSetLocale } from 'entities/locale'
import { useMessage } from 'shared/lib/hooks'
import Emoji from 'shared/ui/Emoji'
import ListItem from 'shared/ui/ListItem'

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

function ChangeLanguage({ anchorEl, onClose }: LanguageMenuProps) {
  const { locale } = useIntl()
  const setLocale = useSetLocale()
  const cancelText = useMessage('common.cancel')

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
            <Emoji name={name} sx={{ fontSize: 24 }} />
          </ListItemIcon>
          <ListItemText primary={primary} />
        </MenuItem>
      ))}
      <MenuItem onClick={onClose}>
        <ListItem icon="block" primary={cancelText} compact={false} color="grey" />
      </MenuItem>
    </Menu>
  )
}

export default ChangeLanguage

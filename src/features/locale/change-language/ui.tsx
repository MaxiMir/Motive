import { ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import { paperClasses } from '@mui/material/Paper'
import { useIntl } from 'react-intl'
import { Locale, useSetLocale } from 'entities/locale'
import ListItem from 'shared/ui/ListItem'
import { LANGUAGES } from './consts'

interface LanguageMenuProps {
  anchorEl: HTMLElement | null
  onClose: () => void
}

function ChangeLanguage({ anchorEl, onClose }: LanguageMenuProps) {
  const { locale, formatMessage } = useIntl()
  const setLocale = useSetLocale()
  const cancelText = formatMessage({ id: 'common.cancel' })

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
      {LANGUAGES.map(({ primary, value, emoji }) => (
        <MenuItem disabled={locale === value} key={primary} onClick={() => onClick(value)}>
          <ListItemIcon>
            <Typography paragraph m={0} sx={{ fontSize: 24 }}>
              {emoji}
            </Typography>
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

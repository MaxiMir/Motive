import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { selectClasses } from '@mui/material/Select'
import { useIntl } from 'react-intl'
import { LANGUAGES, Locale, useSetLocale } from 'entities/locale'

export function ChangeLanguage() {
  const { locale, formatMessage } = useIntl()
  const setLocale = useSetLocale()
  const ariaLabel = formatMessage({ id: 'common.switch-language' })

  const onChange = (e: SelectChangeEvent) => setLocale(e.target.value as Locale)

  return (
    <Select
      defaultValue={locale}
      aria-label={ariaLabel}
      IconComponent={() => null}
      size="small"
      sx={{
        fontSize: 12,
        color: 'zen.silent',
        [`& .${selectClasses.select}`]: {
          paddingRight: '0 !important',
        },
        '& fieldset': {
          border: 'none',
        },
        '& svg': {
          color: 'zen.silent',
        },
      }}
      onChange={onChange}
    >
      {LANGUAGES.map(({ name, emoji, value }) => (
        <MenuItem value={value} key={value}>
          <Box display="inline-flex" mr={1}>
            {emoji}
          </Box>
          {name}
        </MenuItem>
      ))}
    </Select>
  )
}

import { Box, Typography } from '@mui/material'
import { MainCharacteristicName } from 'dto'
import i18nCommon from 'constants/i18n'
import AppModal from 'components/ui/AppModal'
import useLocale from 'hooks/useLocale'
import Progress from './components/Progress'
import ListItem from './components/ListItem'
import i18n from './i18n'

export interface ModalCharacteristicProps {
  name: MainCharacteristicName
  value: number
  onClose: () => void
}

export default function ModalCharacteristic({ name, value, onClose }: ModalCharacteristicProps) {
  const { locale } = useLocale()
  const title = i18nCommon[locale][name]
  const { header, list } = i18n[locale][name]

  return (
    <AppModal
      title={
        <Box component="span" sx={{ color: `${name}.main` }}>
          {title}
        </Box>
      }
      maxWidth="xs"
      onClose={onClose}
    >
      <Progress characteristic={name} value={value} />
      <Box mt={2}>
        <Typography variant="h6" component="h3" sx={{ color: `${name}.light`, mb: 1 }}>
          {header}
        </Typography>
        {list.map((element, key) => (
          <ListItem name={element} key={key} />
        ))}
      </Box>
    </AppModal>
  )
}

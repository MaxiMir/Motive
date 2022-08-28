import { Box, Typography } from '@mui/material'
import { MainCharacteristic, UserDetailDto } from 'dto'
import i18nAll from 'constants/i18n'
import AppModal from 'components/ui/AppModal'
import useLocale from 'hooks/useLocale'
import Progress from './components/Progress'
import ListItem from './components/ListItem'
import i18n from './i18n'

export interface ModalCharacteristicProps {
  user: UserDetailDto
  characteristic: MainCharacteristic
  onClose: () => void
}

export default function ModalCharacteristic({ characteristic, user, onClose }: ModalCharacteristicProps) {
  const { [characteristic]: value } = user.characteristic
  const { locale } = useLocale()
  const title = i18nAll[locale][characteristic]
  const { header, list } = i18n[locale][characteristic]

  return (
    <AppModal
      title={
        <Box component="span" sx={{ color: `${characteristic}.main` }}>
          {title}
        </Box>
      }
      maxWidth="xs"
      onClose={onClose}
    >
      <Progress characteristic={characteristic} value={value} />
      <Box mt={2}>
        <Typography variant="h6" component="h3" sx={{ color: `${characteristic}.light`, mb: 1 }}>
          {header}
        </Typography>
        {list.map((name, key) => (
          <ListItem name={name} key={key} />
        ))}
      </Box>
    </AppModal>
  )
}

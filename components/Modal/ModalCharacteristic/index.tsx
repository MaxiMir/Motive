import { Box, Typography } from '@mui/material'
import { MainCharacteristic, UserDetailDto } from 'dto'
import AppModal from 'components/ui/AppModal'
import AppEmoji from 'components/ui/AppEmoji'
import i18nAll from 'constants/i18n'
import useLocale from 'hooks/useLocale'
import Progress from './components/Progress'
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
        <Typography variant="h6" component="h3" sx={{ color: 'zen.tender', mb: 1 }}>
          {header}
        </Typography>
        {list.map((el, key) => (
          <Box display="flex" alignItems="center" gap={1} key={key} sx={{ paddingY: '4px' }}>
            <AppEmoji name="bullseye" onlyEmoji />
            <Typography>{el}</Typography>
          </Box>
        ))}
      </Box>
    </AppModal>
  )
}

import { Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import Image from 'next/image'
// eslint-disable-next-line import/no-internal-modules
import webSrc from 'public/images/svg/web.svg'
import { PittRules } from 'entities/characteristic'
import { useDetectMobile } from 'entities/device'
import { UserCharacteristicDto } from 'shared/api'
import { useShowProgress } from 'shared/lib/hooks'

const Modal = dynamic(() => import('shared/ui/Modal'))
const Drawer = dynamic(() => import('shared/ui/Drawer'))

interface AbandonedModalProps {
  characteristic: UserCharacteristicDto
  onClose: () => void
}

function AbandonedModal({ characteristic, onClose }: AbandonedModalProps) {
  const { formatMessage } = useIntl()
  const mobile = useDetectMobile()
  const progress = useShowProgress(characteristic.abandoned, { step: 1, ms: 300 })
  const roundedProgress = Math.round(progress)
  const title = formatMessage({ id: 'common.abandoned' })
  const header = formatMessage({ id: 'page.user.modal-abandoned.header' })
  const ModalComponent = mobile ? Drawer : Modal

  return (
    <ModalComponent title={title} onClose={onClose}>
      <Stack position="relative" gap={2}>
        <Stack direction="row" alignItems="center" gap={2} alignSelf="center">
          <Typography variant="h2" component="p" color="abandoned.main">
            {roundedProgress}
          </Typography>
          <Image src={webSrc} alt="" width={60} height={60} />
        </Stack>
        <Typography component="h3" textAlign="center">
          {header}.
        </Typography>
        <PittRules />
      </Stack>
    </ModalComponent>
  )
}

export default AbandonedModal

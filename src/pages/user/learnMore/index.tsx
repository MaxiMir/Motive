import { Button } from '@mui/material'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { UserPageDto } from 'shared/api'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'

const UserInfoModal = dynamic(() => import('entities/user').then((m) => m.UserInfoModal))

interface LearnMoreProps {
  user: UserPageDto
}

function LearnMore({ user }: LearnMoreProps) {
  const [open, toggle] = useToggle()
  const { formatMessage } = useIntl()
  const infoText = formatMessage({ id: 'common.info' })

  return (
    <>
      <LearnMoreButton
        size="small"
        variant="text"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        startIcon={<Icon name="info" />}
        sx={{ mt: 1 }}
        onClick={toggle}
      >
        {infoText}
      </LearnMoreButton>
      {open && <UserInfoModal user={user} onClose={toggle} />}
    </>
  )
}

const LearnMoreButton = styled(Button)(({ theme }) => ({
  minWidth: 'initial',
  color: theme.palette.grey[500],
}))

export default LearnMore

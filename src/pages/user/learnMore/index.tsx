import { Button } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { UserPageDto } from 'shared/api'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'

const LearnMoreModal = dynamic(() => import('./learnMoreModal'))

interface LearnMoreProps {
  user: UserPageDto
}

function LearnMore({ user }: LearnMoreProps) {
  const [open, toggle] = useToggle()
  const { formatMessage } = useIntl()
  const infoText = formatMessage({ id: 'common.info' })

  return (
    <>
      <Button
        size="small"
        variant="text"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        startIcon={<Icon name="info" />}
        sx={(theme) => ({ minWidth: 'initial', mt: 1, color: theme.palette.grey[500] })}
        onClick={toggle}
      >
        {infoText}
      </Button>
      {open && <LearnMoreModal user={user} onClose={toggle} />}
    </>
  )
}

export default LearnMore

import { Button } from '@mui/material'
import dynamic from 'next/dynamic'
import { useToggle } from '@shared/lib/hooks'
import Icon from '@shared/ui/Icon'
import { TooltipArrow } from '@shared/ui/styled'
import { useMessages } from './hooks/useMessages'

const AddingModal = dynamic(() => import('./components/AddingModal'))

interface AddingProps {
  forTomorrow: boolean
}

function Adding({ forTomorrow }: AddingProps) {
  const messages = useMessages(forTomorrow)
  const [open, toggle] = useToggle()

  return (
    <>
      <TooltipArrow title={messages.title}>
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          startIcon={<Icon name="psychology" />}
          disabled={forTomorrow}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={toggle}
        >
          {messages.buttonText}
        </Button>
      </TooltipArrow>
      {open && <AddingModal onClose={toggle} />}
    </>
  )
}

export default Adding

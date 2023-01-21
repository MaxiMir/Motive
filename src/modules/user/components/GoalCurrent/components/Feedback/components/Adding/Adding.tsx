import dynamic from 'next/dynamic'
import { Button } from '@mui/material'
import useToggle from '@hooks/useToggle'
import AppIcon from '@ui/AppIcon'
import TooltipArrow from '@ui/styled/TooltipArrow'
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
          startIcon={<AppIcon name="psychology" />}
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

import { IconButton } from '@mui/material'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { SphereDto } from 'shared/api'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/icon'
import TooltipArrow from 'shared/ui/tooltip-arrow'

const EditSphereModal = dynamic(() => import('features/user/edit-sphere'))

interface EditProps {
  userId: number
  sphere: SphereDto
  icon: string
  value: number
}

function Edit({ userId, sphere, value, icon }: EditProps) {
  const { formatMessage } = useIntl()
  const [open, toggle] = useToggle()
  const title = formatMessage({ id: 'common.edit' })

  return (
    <>
      <TooltipArrow title={title}>
        <StyledIconButton
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={toggle}
        >
          <Icon name="edit" color="zen.silent" fontSize={12} />
        </StyledIconButton>
      </TooltipArrow>
      {open && (
        <EditSphereModal
          userId={userId}
          sphere={sphere}
          icon={icon}
          value={value}
          onClose={toggle}
        />
      )}
    </>
  )
}

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: 30,
  height: 30,
  alignSelf: 'center',
  backgroundColor: theme.palette.grey[800],
}))

export default Edit

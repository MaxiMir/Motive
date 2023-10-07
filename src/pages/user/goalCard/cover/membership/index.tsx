import { styled } from '@mui/system'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { ViewerPart, useViewerAct } from 'entities/viewer'
import { GoalDto } from 'shared/api'
import BlueButton from 'shared/ui/BlueButton'
import Icon from 'shared/ui/Icon'
import TooltipArrow from 'shared/ui/TooltipArrow'

const CreateMemberModal = dynamic(() => import('features/member/create-member'))
const DeleteMemberModal = dynamic(() => import('features/member/delete-member'))

interface MembershipProps {
  goal: GoalDto
  viewerPart: ViewerPart
}

function Membership({ goal, viewerPart }: MembershipProps) {
  const { formatMessage } = useIntl()
  const [modal, setModal] = useState<'create' | 'delete'>()
  const title = formatMessage({ id: viewerPart.member ? 'common.leave' : 'common.join' })
  const iconName = viewerPart.member && viewerPart.page ? 'done' : 'add'

  const onClick = useViewerAct(() => setModal(viewerPart.member ? 'delete' : 'create'))

  const onClose = () => setModal(undefined)

  return (
    <>
      <TooltipArrow title={title}>
        <StyledButton size="small" onClick={onClick}>
          <Icon name={iconName} />
        </StyledButton>
      </TooltipArrow>
      {modal === 'create' && <CreateMemberModal goal={goal} onClose={onClose} />}
      {modal === 'delete' && (
        <DeleteMemberModal goal={goal} viewerPart={viewerPart} onClose={onClose} />
      )}
    </>
  )
}

const StyledButton = styled(BlueButton)(({ theme }) => ({
  minWidth: 'initial',
  width: 36,
  height: 36,
  border: `2px solid ${theme.palette.grey[900]}`,
}))

export default Membership

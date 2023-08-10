import { Avatar } from '@mui/material'
import { blue } from '@mui/material/colors'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'
import Icon from 'shared/ui/Icon'
import TooltipArrow from 'shared/ui/TooltipArrow'

interface SupportSignProps {
  name: string
}

export function SupportSign({ name }: SupportSignProps) {
  const { formatMessage } = useIntl()
  const supportText = formatMessage({ id: 'common.support' })
  const title = [supportText, name].join(' ')

  return (
    <TooltipArrow title={title}>
      <StyledAvatar>
        <Icon name="bolt" color="common.white" />
      </StyledAvatar>
    </TooltipArrow>
  )
}

const StyledAvatar = styled(Avatar)({
  width: 21,
  height: 21,
  backgroundColor: blue[800],
  '& span': {
    fontSize: 14,
  },
})

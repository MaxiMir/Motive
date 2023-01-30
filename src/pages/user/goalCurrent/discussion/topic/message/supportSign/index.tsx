import { Box } from '@mui/material'
import { useIntl } from 'react-intl'
import Emoji from 'shared/ui/Emoji'
import TooltipArrow from 'shared/ui/TooltipArrow'

interface SupportSignProps {
  name: string
}

function SupportSign({ name }: SupportSignProps) {
  const { formatMessage } = useIntl()
  const supportText = formatMessage({ id: 'common.support' })
  const title = `${supportText} ${name}`

  return (
    <TooltipArrow title={title}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width={21}
        height={21}
        fontSize={10}
        borderRadius="50%"
        sx={{ backgroundColor: 'support.main' }}
      >
        <Emoji name="support" onlyEmoji />
      </Box>
    </TooltipArrow>
  )
}

export default SupportSign

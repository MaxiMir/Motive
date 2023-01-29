import { Box } from '@mui/material'
import { useMessage } from 'shared/lib/hooks'

function Level() {
  const lvlText = useMessage('common.lvl-short')

  return (
    <Box component="sup" marginLeft="2px" fontSize={10} color="text.disabled">
      {lvlText}
    </Box>
  )
}

export default Level

import { Box } from '@mui/material'
import Progress from './components/Progress'

interface PointersProps {
  count: number
  onClose: () => void
}

function Pointers({ count, onClose }: PointersProps): JSX.Element {
  const list = [...new Array(count)]

  return (
    <Box
      position="absolute"
      top={0}
      left={{
        xs: 0,
        xl: 'calc(50dvw - 50dvh)',
      }}
      right={{
        xs: 0,
        xl: 'calc(50dvw - 50dvh)',
      }}
      zIndex={9999}
      display="table"
      width={{
        xs: '100dvw',
        xl: '100dvh',
      }}
      className="slides-pointers"
      sx={{
        tableLayout: 'fixed',
        borderSpacing: '6px',
        borderCollapse: 'separate',
        transition: 'opacity 0.5s',
      }}
    >
      <Box display="table-cell">
        {list.map((_, index) => (
          <Progress key={index} onEnd={onClose} />
        ))}
      </Box>
    </Box>
  )
}

export default Pointers

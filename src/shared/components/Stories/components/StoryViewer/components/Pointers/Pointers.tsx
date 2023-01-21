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
      className="slides-pointers"
      sx={{
        position: 'absolute',
        top: 0,
        left: {
          xs: 0,
          xl: 'calc(50dvw - 50dvh)',
        },
        right: {
          xs: 0,
          xl: 'calc(50dvw - 50dvh)',
        },
        width: {
          xs: '100dvw',
          xl: '100dvh',
        },
        display: 'table',
        tableLayout: 'fixed',
        borderSpacing: '6px',
        borderCollapse: 'separate',
        zIndex: 9999,
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

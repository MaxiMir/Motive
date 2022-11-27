import { Box } from '@mui/material'
import Progress from './components/Progress'

interface PointersProps {
  count: number
  onClose: () => void
}

export default function Pointers({ count, onClose }: PointersProps): JSX.Element {
  const list = [...new Array(count)]

  return (
    <Box
      className="slides-pointers"
      sx={{
        position: 'absolute',
        top: 0,
        left: {
          xs: 0,
          xl: 'calc(50vw - 50vh)',
        },
        right: {
          xs: 0,
          xl: 'calc(50vw - 50vh)',
        },
        width: {
          xs: '100vw',
          xl: '100vh',
        },
        display: 'table',
        tableLayout: 'fixed',
        borderSpacing: '6px',
        borderCollapse: 'separate',
        zIndex: 9999,
        transition: 'opacity 0.5s',
      }}
    >
      <Box
        sx={{
          display: 'table-row',
        }}
      >
        {list.map((item) => (
          <Progress key={item} onEnd={onClose} />
        ))}
      </Box>
    </Box>
  )
}

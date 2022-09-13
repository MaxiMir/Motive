import { Box } from '@mui/material'
import Progress from './components/Progress'

interface PointersProps {
  count: number
}

export default function Pointers({ count }: PointersProps): JSX.Element {
  const list = [...new Array(count)]

  return (
    <Box
      className="slides-pointers"
      sx={{
        display: 'table',
        tableLayout: 'fixed',
        borderSpacing: '6px',
        borderCollapse: 'separate',
        position: 'absolute',
        width: '100vh',
        top: 0,
        left: 'calc(50vw - 50vh)',
        right: 'calc(50vw - 50vh)',
        zIndex: 9999,
        transition: 'opacity 0.5s',
      }}
    >
      <Box
        sx={{
          display: 'table-row',
        }}
      >
        {list.map((_, index) => (
          <Progress key={index} />
        ))}
      </Box>
    </Box>
  )
}

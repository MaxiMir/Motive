import { Box, LinearProgress, Typography } from '@mui/material'
import { linearProgressClasses } from '@mui/material/LinearProgress'
import { withStyles } from '@mui/styles'
import { useIntl } from 'react-intl'
import { SphereOfLifeName } from 'shared/api'
import { generateColorByName } from 'shared/ui/palette'

interface SphereOfLifeProps {
  sphere: SphereOfLifeName
  value: number
}

function SphereOfLife({ sphere, value }: SphereOfLifeProps): JSX.Element {
  const { formatMessage } = useIntl()
  const percentage = 100 - (value / 10) * 100
  const backgroundColor = generateColorByName(sphere)
  const message = formatMessage({ id: `common.${sphere}` })

  return (
    <Box display="flex" position="relative">
      <Typography
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          writingMode: 'tb',
          zIndex: 1,
        }}
      >
        {message}
      </Typography>
      <Progress
        value={percentage}
        variant="determinate"
        sx={{
          [`& .${linearProgressClasses.bar}`]: {
            backgroundColor,
          },
        }}
      />
    </Box>
  )
}

const Progress = withStyles((theme) => ({
  root: {
    width: 30,
    height: 200,
    borderRadius: 20,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  bar: {
    transform: ({ value }) => `translateY(${value}%) !important`,
  },
}))(LinearProgress)

export default SphereOfLife

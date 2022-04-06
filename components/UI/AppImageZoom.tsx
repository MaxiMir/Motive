import { FC } from 'react'
import AppBox from './AppBox'

const AppImageZoom: FC = ({ children }) => {
  return (
    <AppBox
      display={undefined}
      sx={{
        width: '100%',
        animation: 'zoom-in 10s ease-in infinite',
        transition: 'all .5s ease-in-out',
        overflow: 'hidden',
        '@keyframes zoom-in': {
          '0%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.8)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
      }}
    >
      <AppBox
        display={undefined}
        sx={{
          animation: 'zoom-out 10s ease-in infinite',
          transition: 'all .5s ease-in-out',
          overflow: 'hidden',
          '@keyframes zoom-out': {
            '0%': {
              transform: 'scale(1)',
            },
            '50%': {
              transform: 'scale(0.67)',
            },
            '100%': {
              transform: 'scale(1)',
            },
          },
        }}
      >
        {children}
      </AppBox>
    </AppBox>
  )
}

export default AppImageZoom

import { Box, Button, Stack, Typography } from '@mui/material'
import Avatar from 'shared/ui/avatar'

interface ConfirmationProps {
  id: number
  name: string
  src: string
  onClick: () => void
}

export function Confirmation({ id, name, src, onClick }: ConfirmationProps) {
  return (
    <Stack alignItems="center" gap={1} minWidth={100}>
      <Box
        padding="2px"
        borderRadius="50%"
        sx={({ palette }) => ({
          background: `linear-gradient(to top left, ${palette.motivation.dark}, ${palette.creativity.dark})`,
        })}
      >
        <Box
          borderRadius="50%"
          sx={({ palette }) => ({
            background: palette.background.default,
            ':hover': {
              background: 'rgba(144, 202, 249, 0.08)',
            },
          })}
        >
          <Avatar src={src} name={name} size={60} buttonProps={{ onClick }} />
        </Box>
      </Box>
      <Button id={`confirmation-${id}`} size="small" onClick={onClick}>
        <Typography
          variant="caption"
          sx={{
            maxWidth: 95,
            color: 'common.white',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {name}
        </Typography>
      </Button>
    </Stack>
  )
}

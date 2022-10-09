import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Box, Button, Typography } from '@mui/material'
import { indigo } from '@mui/material/colors'
import useLocale from 'hooks/useLocale'
import AppIcon from 'components/ui/AppIcon'
import i18n from './i18n'

const ModalGoal = dynamic(() => import('./components/ModalGoal'))

export default function AddGoal() {
  const { locale } = useLocale()
  const [open, setOpen] = useState(false)
  const { name } = i18n[locale]

  const toggleModal = () => setOpen(!open)

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={1} mx={1} className="apple-hide">
      <Box
        sx={{
          padding: '2px',
          background: indigo[300],
          borderRadius: '50%',
        }}
      >
        <Button
          variant="text"
          color="primary"
          size="small"
          sx={(theme) => ({
            borderRadius: '50%',
            background: theme.palette.background.default,
          })}
          aria-label={name}
          onClick={toggleModal}
        >
          <Box display="flex" justifyContent="center" alignItems="center" width={65} height={65}>
            <AppIcon name="add" />
          </Box>
        </Button>
      </Box>
      <Button sx={{ padding: '4px', textTransform: 'none' }} onClick={toggleModal}>
        <Typography variant="caption" sx={{ color: 'creativity.light' }}>
          {name}
        </Typography>
      </Button>
      {open && <ModalGoal locale={locale} onClose={toggleModal} />}
    </Box>
  )
}

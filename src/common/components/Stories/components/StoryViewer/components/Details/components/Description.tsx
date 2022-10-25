import { Drawer } from '@mui/material'

interface DescriptionProps {
  onClose: () => void
}

export default function Description({ onClose }: DescriptionProps) {
  return (
    <Drawer open anchor="bottom" sx={{ zIndex: 9999 }} onClose={onClose}>
      4353
    </Drawer>
  )
}

import { Drawer } from '@mui/material'

interface DescriptionProps {
  onClose: () => void
}

export default function Description({ onClose }: DescriptionProps) {
  return (
    <Drawer open anchor="bottom" onClose={onClose}>
      Description
    </Drawer>
  )
}

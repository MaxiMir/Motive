import { Drawer } from '@mui/material'

interface DescriptionProps {
  onClose: () => void
}

function Description({ onClose }: DescriptionProps) {
  return <Drawer open anchor="bottom" onClose={onClose} />
}

export default Description

import { Avatar } from '@mui/material'
import { styled } from '@mui/system'
import { useMemo } from 'react'
import { generateColorByName, getShortName } from 'shared/ui/palette'

interface PlugProps {
  name: string
  size: number
}

function Plug({ name, size }: PlugProps) {
  const background = useMemo(() => generateColorByName(name), [name])
  const shortName = getShortName(name)

  return (
    <StyledAvatar size={size} background={background}>
      {shortName}
    </StyledAvatar>
  )
}

const StyledAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== 'size' && prop !== 'background',
})<{ size: number; background: string }>(({ theme: _, size, background }) => ({
  background,
  width: size,
  height: size,
  color: 'common.white',
  fontSize: size / 2.5,
}))

export default Plug

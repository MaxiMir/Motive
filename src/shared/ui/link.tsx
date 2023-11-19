import { forwardRef } from 'react'
import NextLink, { LinkProps } from 'next/link'

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function LinkBehaviour(props, ref) {
  return <NextLink ref={ref} {...props} />
})

export default Link

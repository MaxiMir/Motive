import { FC } from 'react'
import Link from 'next/link'
import MaterialLink from '@material-ui/core/Link'

interface AppLinkProps {
  href: string
  className?: string
}

export const AppLink: FC<AppLinkProps> = ({
  href,
  children,
  ...restLinkProps
}) => (
  <Link href={href} {...restLinkProps}>
    <MaterialLink href={href} color="inherit">
      {children}
    </MaterialLink>
  </Link>
)

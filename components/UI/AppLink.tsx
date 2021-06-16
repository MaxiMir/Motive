import { FC } from 'react'
import Link from 'next/link'
import MaterialLink from '@material-ui/core/Link'

interface AppLinkProps {
  href: string
  title: string
  className?: string
}

export const AppLink: FC<AppLinkProps> = ({
  href,
  title,
  children,
  ...restLinkProps
}) => (
  <Link href={href} {...restLinkProps}>
    <MaterialLink href={href} title={title} color="inherit">
      {children}
    </MaterialLink>
  </Link>
)

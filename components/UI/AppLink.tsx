import { FC } from 'react'
import Link from 'next/link'
import MaterialLink from '@material-ui/core/Link'

interface AppLinkProps {
  href: string
  title?: string
  className?: string
}

const AppLink: FC<AppLinkProps> = ({
  href,
  title,
  className,
  children,
  ...restLinkProps
}) => (
  <Link href={href} {...restLinkProps}>
    <MaterialLink href={href} title={title} color="inherit" className={className}>
      {children}
    </MaterialLink>
  </Link>
)

export default AppLink

import { ReactNode } from 'react'
import Link from 'next/link'
import { useIntl } from 'react-intl'
import MaterialLink, { LinkProps } from '@mui/material/Link'
import { TypographyProps } from '@mui/material'

interface AppLinkProps {
  href: string
  title?: string
  className?: string
  variant?: TypographyProps['variant']
  sx?: TypographyProps['sx']
  children: ReactNode
  onClick?: LinkProps['onClick']
}

export default function AppLink({ href, title, className, ...restProps }: AppLinkProps) {
  const { locale } = useIntl()

  return (
    <Link href={href} locale={locale}>
      <MaterialLink href={href} title={title} color="inherit" className={className} {...restProps} />
    </Link>
  )
}

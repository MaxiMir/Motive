import { ReactNode } from 'react'
import Link from 'next/link'
import MaterialLink from '@mui/material/Link'
import { TypographyProps } from '@mui/material'
import useLocale from 'hooks/useLocale'

interface AppLinkProps {
  href: string
  title?: string
  className?: string
  variant?: TypographyProps['variant']
  sx?: TypographyProps['sx']
  children: ReactNode
}

export default function AppLink({ href, title, className, ...restProps }: AppLinkProps) {
  const { locale } = useLocale()

  return (
    <Link href={href} locale={locale}>
      <MaterialLink href={href} title={title} color="inherit" className={className} {...restProps} />
    </Link>
  )
}

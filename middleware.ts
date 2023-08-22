import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/

export async function middleware(req: NextRequest) {
  const { pathname, locale, search } = req.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/api/') ||
    PUBLIC_FILE.test(pathname) ||
    locale !== 'default'
  ) {
    return NextResponse.next()
  }

  const cookie =
    req.cookies.get('NEXT_LOCALE')?.value ||
    req.headers.get('accept-language')?.split(',')?.[0].split('-')?.[0].toLowerCase() ||
    'en'

  return NextResponse.redirect(new URL(`/${cookie}${pathname}${search}`, req.url))
}

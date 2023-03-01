import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { GetStaticPaths, GetStaticProps } from 'next'
import { GetStaticPathsResult } from 'next/types'
/* eslint-disable boundaries/element-types */
import { Layout } from 'app/layout'
import { ArticlePage } from 'pages/article'
/* eslint-disable boundaries/element-types */
import { Article as ArticleProps } from 'entities/article'
import { getArticleHref } from 'entities/page'

function Article({ meta, href, content }: ArticleProps) {
  return (
    <Layout title={meta.title} description={meta.description}>
      <ArticlePage meta={meta} href={href} content={content} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => {
  const folders = fs.readdirSync(path.join('articles'))
  const paths = folders.reduce<GetStaticPathsResult['paths']>((acc, id) => {
    const localePaths = locales.map((locale) => ({ params: { id }, locale }))

    return [...acc, ...localePaths]
  }, [])

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const href = getArticleHref(params?.id as string)
  const markdownPath = path.join(`articles/${params?.id}/${locale}.md`)
  const markdownWithMeta = fs.readFileSync(markdownPath, 'utf-8')
  const { data, content } = matter(markdownWithMeta)

  return {
    props: {
      meta: JSON.parse(JSON.stringify(data)),
      href,
      content,
    },
  }
}

export default Article

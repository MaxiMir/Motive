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
import { OGType } from 'shared/api'

function Article({ data, href, content, more }: ArticleProps) {
  return (
    <Layout
      title={data.title}
      description={data.description}
      image={data.image}
      type={OGType.Article}
    >
      <ArticlePage data={data} href={href} content={content} more={more} />
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
  const input = fs.readFileSync(markdownPath, 'utf-8')
  const { data: articleData, content } = matter(input)
  const more = articleData.more.map((id: string) => {
    const articleHref = getArticleHref(params?.id as string)
    const articleInput = fs.readFileSync(path.join(`articles/${id}/${locale}.md`), 'utf-8')
    const { data } = matter(articleInput)

    return { data, href: articleHref }
  })

  return {
    props: {
      data: JSON.parse(JSON.stringify(articleData)),
      content,
      href,
      more: JSON.parse(JSON.stringify(more)),
    },
  }
}

export default Article

import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import { RoughNotation } from 'react-rough-notation'
import Image from 'next/image'
import NewsletterForm from '@/components/NewsletterForm'
import ListLayout from '@/layouts/ListLayout'

export const POSTS_PER_PAGE = 6

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')
  console.log('allPosts:', posts)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination } }
}

export default function Blog({ posts, initialDisplayPosts, pagination }) {
  return (
    <>
      <PageSEO
        title={`Lets TalkZ - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <ListLayout posts={posts} initialDisplayPosts={initialDisplayPosts} pagination={pagination} />
      <NewsletterForm />
    </>
  )
}

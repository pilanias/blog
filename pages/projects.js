import siteMetadata, { image } from '@/data/siteMetadata'
import projectsData from '@/data/projectsData'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'

const MAX_DISPLAY = 10

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Projects({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Hello, I see you. Here's a sample of my most recent projects.
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
              const { slug, shortsummary, title, date, image } = frontMatter
              return (
                <Card
                  key={title}
                  title={title}
                  description={shortsummary}
                  imgSrc={image}
                  href={'/blog/' + slug}
                  date={date}
                />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

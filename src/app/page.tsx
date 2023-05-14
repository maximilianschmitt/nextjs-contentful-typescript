import { draftMode } from 'next/headers'
import { fetchBlogPosts } from '../contentful/blogPosts'
import Link from 'next/link'

async function Home() {
	const blogPosts = await fetchBlogPosts({ preview: draftMode().isEnabled })

	return (
		<main className="p-[6vw]">
			<div className="prose">
				<h1>My Contentful Blog</h1>
				<ul>
					{blogPosts.map((blogPost) => {
						return (
							<li key={blogPost.slug}>
								<Link href={`/${blogPost.slug}`}>{blogPost.title}</Link>
							</li>
						)
					})}
				</ul>
			</div>
		</main>
	)
}

export default Home

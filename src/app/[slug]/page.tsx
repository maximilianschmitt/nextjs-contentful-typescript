import { Metadata, ResolvingMetadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { fetchBlogPost, fetchBlogPosts } from '../../contentful/blogPosts'
import Link from 'next/link'
import RichText from '../../contentful/RichText'

interface BlogPostPageParams {
	slug: string
}

interface BlogPostPageProps {
	params: BlogPostPageParams
}

export async function generateStaticParams(): Promise<BlogPostPageParams[]> {
	const blogPosts = await fetchBlogPosts({ preview: false })

	return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps, parent: ResolvingMetadata): Promise<Metadata> {
	const blogPost = await fetchBlogPost({ slug: params.slug, preview: draftMode().isEnabled })

	if (!blogPost) {
		return notFound()
	}

	return {
		title: blogPost.title,
	}
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const blogPost = await fetchBlogPost({ slug: params.slug, preview: draftMode().isEnabled })

	if (!blogPost) {
		return notFound()
	}

	return (
		<main className="p-[6vw]">
			<Link href="/">← Posts</Link>
			<div className="prose mt-8 border-t pt-8">
				{blogPost.image && (
					<img
						src={blogPost.image.src}
						srcSet={`${blogPost.image.src}?w=300 1x, ${blogPost.image.src} 2x`}
						width={300}
						height={300}
						alt={blogPost.image.alt}
					/>
				)}
				<h1>{blogPost.title}</h1>
				<RichText document={blogPost.body} />
			</div>
		</main>
	)
}

import { TypeBlogPostSkeleton } from './types'
import { Entry } from 'contentful'
import { Document as RichTextDocument } from '@contentful/rich-text-types'
import contentfulClient from './contentfulClient'
import { ContentImage, parseContentfulContentImage } from './contentImage'

type BlogPostEntry = Entry<TypeBlogPostSkeleton, undefined, string>

export interface BlogPost {
	title: string
	slug: string
	body: RichTextDocument | null
	image: ContentImage | null
}

export function parseContentfulBlogPost(blogPostEntry?: BlogPostEntry): BlogPost | null {
	if (!blogPostEntry) {
		return null
	}

	return {
		title: blogPostEntry.fields.title || '',
		slug: blogPostEntry.fields.slug,
		body: blogPostEntry.fields.body || null,
		image: parseContentfulContentImage(blogPostEntry.fields.image),
	}
}

interface FetchBlogPostsOptions {
	preview: boolean
}
export async function fetchBlogPosts({ preview }: FetchBlogPostsOptions): Promise<BlogPost[]> {
	const contentful = contentfulClient({ preview })

	const blogPostsResult = await contentful.getEntries<TypeBlogPostSkeleton>({
		content_type: 'blogPost',
		include: 2,
		order: ['fields.title'],
	})

	return blogPostsResult.items.map((blogPostEntry) => parseContentfulBlogPost(blogPostEntry) as BlogPost)
}

interface FetchBlogPostOptions {
	slug: string
	preview: boolean
}
export async function fetchBlogPost({ slug, preview }: FetchBlogPostOptions): Promise<BlogPost | null> {
	const contentful = contentfulClient({ preview })

	const blogPostsResult = await contentful.getEntries<TypeBlogPostSkeleton>({
		content_type: 'blogPost',
		'fields.slug': slug,
		include: 2,
	})

	return parseContentfulBlogPost(blogPostsResult.items[0])
}

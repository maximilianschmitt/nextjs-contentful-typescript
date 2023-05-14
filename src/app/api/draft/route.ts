import { draftMode } from 'next/headers'
const { CONTENTFUL_PREVIEW_SECRET } = process.env

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	if (searchParams.get('previewSecret') !== CONTENTFUL_PREVIEW_SECRET) {
		return new Response('Invalid token', { status: 401 })
	}

	draftMode().enable()

	// FIXME: This is a workaround because draftMode().enable() does
	// not work as expected when followed by a redirect.
	// See: https://github.com/vercel/next.js/issues/49237
	// redirect(searchParams.get('redirect') || '/')
	return new Response(null, {
		status: 307,
		headers: {
			Location: searchParams.get('redirect') || '/',
		},
	})
}

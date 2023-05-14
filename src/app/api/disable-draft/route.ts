import { draftMode } from 'next/headers'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)

	draftMode().disable()

	// FIXME: This is a workaround because draftMode().disable() does
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

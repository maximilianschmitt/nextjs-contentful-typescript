import { Document as RichTextDocument } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

type RichTextProps = {
	document: RichTextDocument | null
}

function RichText({ document }: RichTextProps) {
	if (!document) {
		return null
	}

	return <>{documentToReactComponents(document)}</>
}

export default RichText

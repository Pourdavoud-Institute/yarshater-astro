import groq from 'groq';
import { RICH_TEXT_PROJECTION } from '@lib/sanity/groqFragments/moduleProjections';
import { LINK_PROJECTION } from '@lib/sanity/groqFragments/commonProjections';

/** TODO: update rich text sections for expanded links/blocks */
export const PUBLICATIONS_QUERY = groq`*[_type == "publication" && $workspaceID in workspaces[]._ref] {
    _id,
    _type,
    title,
    subtitle,
    "slug": slug.current,
    "authors": coalesce(
        authors[] {
            name,
            role
        }
    ),
    publisher,
    "date": publicationDate,
    pageCount,
    isbn,
    "additionalDetails": publicationDetails,
    citation,
    "pdf": publicationPDF.asset->{
        _id,
        assetId,
        mimeType,
        size,
        url
    },
    "image": featuredImage {
        asset->
    },
    overview {
        _type,
        ${RICH_TEXT_PROJECTION}
    },
    authorBio[] {
        ...,
        markDefs[] {
            ...,
            _type == "richTextLink" => ${LINK_PROJECTION}
        }
    },
    sources[] {
        ...,
        markDefs[] {
            ...,
            _type == "richTextLink" => ${LINK_PROJECTION}
        }
    },
    "categories": coalesce(
        categories[]->{
            _id,
            _type,
            title,
            "slug": slug.current
        },
        []
    ),
}`;

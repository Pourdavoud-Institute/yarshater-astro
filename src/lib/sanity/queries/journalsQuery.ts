import groq from 'groq';

export const JOURNALS_QUERY = groq`*[_type == "journal" && $workspaceID in workspaces[]._ref] {
    _id,
    _type,
    title,
    "slug": slug.current
}`;

export const JOURNAL_VOLUMES_QUERY = groq`*[_type == "journalVolume" && $workspaceID in workspaces[]._ref] {
    _id,
    _type,
    title,
    "slug": slug.current,
    "journalReference": journal[0]._ref,
    volumeNumber,
    publicationDate,
    "pageCount": coalesce(pageCount, 0),
    publicationDetails,
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
    "entries": coalesce(entries[] {
        title,
        "authors": coalesce(authors[] {
            name,
            institution
        }, []),
        "pageCount": coalesce(pageCount, 0),
        "citation": coalesce(citation, []),
        "pdf": publicationPDF.asset->{
            _id,
            assetId,
            mimeType,
            size,
            url
        },
    }, [])
}`;

import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { PUBLICATIONS_QUERY } from '@lib/sanity/queries/publicationsQuery';
import { workspaces } from '@lib/sanity/workspaces';
import { RichTextBlocks } from '@content/schemaFragments/sanityComponents';
import { RichText } from './schemaFragments/pageModules';
import { customSanityLoader } from '@lib/sanity/customSanityLoader';

export const publications = defineCollection({
    loader: customSanityLoader({
        name: 'Publications',
        query: PUBLICATIONS_QUERY,
        params: {
            workspaceID: workspaces.yarshater.id,
        },
    }),

    schema: z.object({
        _id: z.string(),
        _type: z.literal('publication'),
        title: z.string(),
        subtitle: z.string().nullish(),
        slug: z.string(),
        authors: z.array(
            z.object({
                name: z.string(),
                role: z.string(),
            }),
        ),
        publisher: z.string().nullish(),
        date: z.string(),
        pageCount: z.number(),
        isbn: z.string().nullish(),
        additionalDetails: z.string().nullish(),
        citation: z.string().nullish(),
        pdf: z
            .object({
                _id: z.string(),
                assetId: z.string(),
                mimeType: z.string(),
                size: z.number(),
                url: z.url(),
            })
            .nullish(),
        image: z
            .object({
                asset: z.any(),
            })
            .nullish(),
        overview: RichText.nullish(),
        authorBio: RichTextBlocks,
        sources: RichTextBlocks,
        categories: z.array(
            z.object({
                _id: z.string(),
                _type: z.literal('publicationCategory'),
                title: z.string(),
                slug: z.string(),
            }),
        ),
    }),
});

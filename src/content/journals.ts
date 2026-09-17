import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import {
    JOURNALS_QUERY,
    JOURNAL_VOLUMES_QUERY,
} from '@lib/sanity/queries/journalsQuery';
import { RichTextBlocks } from '@content/schemaFragments/sanityComponents';
import { workspaces } from '@lib/sanity/workspaces';
import { customSanityLoader } from '@lib/sanity/customSanityLoader';

export const journals = defineCollection({
    loader: customSanityLoader({
        name: 'Journals',
        query: JOURNALS_QUERY,
        params: {
            workspaceID: workspaces.yarshater.id,
        },
    }),

    schema: z.object({
        _id: z.string(),
        _type: z.literal('journal'),
        title: z.string(),
        slug: z.string(),
    }),
});

const JournalArticle = z.object({
    title: z.string(),
    authors: z.array(
        z.object({
            name: z.string(),
            institution: z.string().nullish(),
        }),
    ),
    pageCount: z.number(),
    citation: RichTextBlocks,
    pdf: z
        .object({
            _id: z.string(),
            assetId: z.string(),
            mimeType: z.string(),
            size: z.number(),
            url: z.url(),
        })
        .nullish(),
});

export type JournalArticle = z.infer<typeof JournalArticle>;

export const journalVolumes = defineCollection({
    loader: customSanityLoader({
        name: 'Journal Volumes',
        query: JOURNAL_VOLUMES_QUERY,
        params: {
            workspaceID: workspaces.yarshater.id,
        },
    }),

    schema: z.object({
        _id: z.string(),
        _type: z.literal('journalVolume'),
        title: z.string(),
        slug: z.string(),
        journalReference: z.string(),
        volumeNumber: z.string().nullish(),
        publicationDate: z.string().nullish(),
        pageCount: z.number(),
        publicationDetails: z.string().nullish(),
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
        entries: z.array(JournalArticle),
    }),
});

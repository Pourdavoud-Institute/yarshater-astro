import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import {
    EVENT_CATEGORIES_QUERY,
    POST_CATEGORIES_QUERY,
    PUBLICATION_CATEGORIES_QUERY,
} from '@lib/sanity/queries/taxonomyQueries';
import { workspaces } from '@lib/sanity/workspaces';
import { customSanityLoader } from '@lib/sanity/customSanityLoader';

export const EventCategory = z.object({
    _id: z.string(),
    _type: z.literal('eventCategory'),
    title: z.string(),
    slug: z.string(),
    events: z.array(
        z.object({
            _id: z.string(),
        }),
    ),
});

export type EventCategory = z.infer<typeof EventCategory>;

export const eventCategories = defineCollection({
    loader: customSanityLoader({
        name: 'Event Categories',
        query: EVENT_CATEGORIES_QUERY,
        params: {
            workspaceID: workspaces.yarshater.id,
        },
    }),

    schema: EventCategory,
});

export const PostCategory = z.object({
    _id: z.string(),
    _type: z.literal('postCategory'),
    title: z.string(),
    slug: z.string(),
    posts: z.array(
        z.object({
            _id: z.string(),
        }),
    ),
});

export const postCategories = defineCollection({
    loader: customSanityLoader({
        name: 'Post Categories',
        query: POST_CATEGORIES_QUERY,
        params: {
            workspaceID: workspaces.yarshater.id,
        },
    }),

    schema: PostCategory,
});

export const PublicationCategory = z.object({
    _id: z.string(),
    _type: z.literal('publicationCategory'),
    title: z.string(),
    slug: z.string(),
});

export const publicationCategories = defineCollection({
    loader: customSanityLoader({
        name: 'Publication Categories',
        query: PUBLICATION_CATEGORIES_QUERY,
        params: {
            workspaceID: workspaces.yarshater.id,
        },
    }),

    schema: PublicationCategory,
});

/** Zod optional vs null
 * @link https://gist.github.com/ciiqr/ee19e9ff3bb603f8c42b00f5ad8c551e
 */
import { events } from '@content/events';
import { navigation } from '@content/navigation';
import { organizations } from '@content/organizations';
import { pages } from '@content/pages';
import { people } from '@content/people';
import { posts } from '@content/posts';
import { works } from '@content/works';
import { publications } from '@content/publications';
import { settings } from '@content/settings';
import { speakers } from '@content/people';
import { videos } from '@content/videos';
import {
    eventCategories,
    postCategories,
    publicationCategories,
} from '@content/taxonomies';

export const collections = {
    events,
    eventCategories,
    navigation,
    organizations,
    pages,
    people,
    posts,
    postCategories,
    publications,
    publicationCategories,
    settings,
    speakers,
    videos,
    works,
};

import { type CollectionEntry } from 'astro:content';

export function getJournalVolumeTitle(
    volume: CollectionEntry<'journalVolumes'>,
    journal?: CollectionEntry<'journals'>,
): string {
    let journalTitle = volume.data.title;
    // const journal = await getEntry('journals', volume.data.journalReference);
    if (journal) {
        journalTitle = journal.data.title;
    }

    return `${journalTitle} (Vol. ${volume.data.volumeNumber})`;
}

export function getJournalVolumeURL(
    volume: CollectionEntry<'journalVolumes'>,
    journal?: CollectionEntry<'journals'>,
    prefix?: string,
): string {
    let journalSlug = '';
    // const journal = await getEntry('journals', volume.data.journalReference);
    if (journal) {
        journalSlug = journal.data.slug;
    }
    const uri = volume.data.volumeNumber ?? volume.data.slug;

    if (prefix) {
        return `${prefix}${journalSlug}/vol${uri}`;
    }
    return `${journalSlug}/vol${uri}`;
}

// @ts-check
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sanity from '@sanity/astro';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://yarshater.ucla.edu',

    integrations: [
        sanity({
            projectId: '3z4imst3',
            dataset: 'production',
            useCdn: false,
        }),
        preact({ compat: true }),
        sitemap(),
    ],

    image: {
        domains: ['cdn.sanity.io'],
    },

    prefetch: {
        prefetchAll: true,
    },

    vite: {
        css: {
            transformer: 'lightningcss',
            lightningcss: {
                targets: browserslistToTargets(browserslist('defaults')),
            },
        },
        build: {
            cssMinify: 'lightningcss',
        },
    },

    redirects: {
        '/media': '/media/video-library',
        '/media/videos': '/media/video-library',
    },
});

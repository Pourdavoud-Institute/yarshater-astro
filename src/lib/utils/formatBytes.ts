/** @link https://github.com/shoelace-style/shoelace/blob/next/src/components/format-bytes/format-bytes.component.ts */

/** Formats a byte value using human-readable prefix. */
export const formatBytes = (value: number): string => {
    const prefixes = ['', 'kB', 'MB'];
    const index = Math.max(
        0,
        Math.min(Math.floor(Math.log10(value) / 3), prefixes.length - 1),
    );
    const unit = prefixes[index];

    const formatted = parseFloat(
        (value / Math.pow(1000, index)).toPrecision(3),
    );
    return formatted + ` ${unit}`;
};

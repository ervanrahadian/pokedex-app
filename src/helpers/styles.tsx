import { isEmpty } from "@utils/validation";

//minWidth for helpers below
export const breakpoints = {
    xxs: 320,
    xs: 375,
    sm: 425,
    md: 768,
    lg: 1024,
    xl: 1440,
    xxl: 1920,
};

/**
 * For css media query.
 * example usage:
 * [media(sm)]:{
 *    width: 500
 *    ...
 * }
 */
export const mediaFrom = (minWidth: number): string =>
    `@media (min-width:${minWidth}px)`;

export const mediaTo = (maxWidth: number): string =>
    `@media (max-width:${maxWidth}px)`;

/**
 * Col breakpoints for @lite-components/dist/Grid.
 * example usage:
 * <Col span={[12, col(sm, 8), col(md, 4)]}>...</Col>
 * equivalent to <div class="col-12 col-sm-8 col-md-4">...</div>
 */

interface colReturn {
    scrFrom: number;
    span: number;
}

export const col = (minWidth: number, span: number): colReturn => ({
    scrFrom: minWidth,
    span,
});

export const adjustColor = (col: string, p: number): string => {
    if (isEmpty(col)) {
        return "var(--basic-neutral-300)";
    }

    const R = parseInt(col.substring(1, 3), 16);
    const G = parseInt(col.substring(3, 5), 16);
    const B = parseInt(col.substring(5, 7), 16);
    const curr_total_dark = 255 * 3 - (R + G + B);

    // calculate how much of the current darkness comes from the different channels
    const RR = (255 - R) / curr_total_dark;
    const GR = (255 - G) / curr_total_dark;
    const BR = (255 - B) / curr_total_dark;

    // calculate how much darkness there should be in the new color
    const new_total_dark = (255 - 255 * (p / 100)) * 3;

    // make the new channels contain the same % of available dark as the old ones did
    const NR = 255 - Math.round(RR * new_total_dark);
    const NG = 255 - Math.round(GR * new_total_dark);
    const NB = 255 - Math.round(BR * new_total_dark);

    const RO =
        NR.toString(16).length === 1 ? "0" + NR.toString(16) : NR.toString(16);
    const GO =
        NG.toString(16).length === 1 ? "0" + NG.toString(16) : NG.toString(16);
    const BO =
        NB.toString(16).length === 1 ? "0" + NB.toString(16) : NB.toString(16);

    return "#" + RO + GO + BO;
};

export const stringToColor = (string: string) => {
    if (isEmpty(string)) {
        return "var(--basic-neutral-300)";
    }

    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }

    return color;
};

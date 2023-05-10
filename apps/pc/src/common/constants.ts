export type BlindType = 'SB' | 'BB' | `Straddle-${number}`;

export const straddle = (x: number): BlindType => `Straddle-${x}`;

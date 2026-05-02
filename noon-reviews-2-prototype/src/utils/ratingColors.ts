// Shared sentiment color ramp: 1★ red → 5★ deep green.
const RATING_COLORS = ['#D92626', '#E5641A', '#DE9000', '#26B57C', '#0F8857'];

export const RATING_NEUTRAL = '#D0D4DD';

export function colorForRating(rating: number): string {
  return RATING_COLORS[rating - 1] ?? RATING_NEUTRAL;
}

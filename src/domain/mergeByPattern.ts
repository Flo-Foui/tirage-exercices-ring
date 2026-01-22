import type { ExerciseKey } from "./types";
import type { RuleBucket, RulePattern } from "./rules";

/**
 * Construit une liste finale en consommant des éléments depuis des "buckets"
 * selon un pattern (ex: A, B, A, B, A...).
 *
 * Chaque bucket est supposé déjà mélangé.
 */
export function mergeByPattern(
  pattern: RulePattern,
  buckets: Record<RuleBucket, ExerciseKey[]>
): ExerciseKey[] {
  const out: ExerciseKey[] = [];

  for (const bucketName of pattern) {
    const bucket = buckets[bucketName];
    if (!bucket || bucket.length === 0) continue;
    const next = bucket.shift(); // consume
    if (next) out.push(next);
  }

  // Sécurité : si jamais il reste des éléments (pattern trop court), on les append.
  for (const k of Object.keys(buckets) as RuleBucket[]) {
    while (buckets[k].length > 0) {
      out.push(buckets[k].shift()!);
    }
  }

  return out;
}

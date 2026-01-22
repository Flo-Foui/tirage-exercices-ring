import type { Echelon, ExerciseKey } from "./types";

export type RuleBucket =
    | "obeissanceDressage"
    | "obeissanceObjet"
    | "mordantInterceptions"
    | "mordantDressages";

export type RulePattern = RuleBucket[];

/**
 * Construit un pattern alterné:
 *   A, B, A, B, A...
 * en démarrant par `primary`.
 *
 * Si les tailles diffèrent, le pattern continue avec le bucket restant.
 */
function buildAlternatingPattern(
    primary: RuleBucket,
    primaryCount: number,
    secondary: RuleBucket,
    secondaryCount: number
): RulePattern {
    const pattern: RulePattern = [];
    let p = primaryCount;
    let s = secondaryCount;

    while (p > 0 || s > 0) {
        if (p > 0) {
            pattern.push(primary);
            p--;
        }
        if (s > 0) {
            pattern.push(secondary);
            s--;
        }
    }
    return pattern;
}

/**
 * ===========
 * Obéissance
 * ===========
 *
 * On sépare en 2 buckets:
 * - obeissanceDressage : les "classiques" (suite / absence / positions / en avant)
 * - obeissanceObjet    : appâts + rapports
 *
 * Chaque échelon a ses propres exercices.
 */
export function obeissanceDressage(echelon: Echelon): ExerciseKey[] {
    switch (echelon) {
        case "I":
            return [
                "SUITE_EN_LAISSE",
                "SUITE_SANS_LAISSE_MUSELEE",
                "ABSENCE",
                "POSITIONS",
            ];

        case "II":
            return [
                "SUITE_EN_LAISSE",
                "SUITE_SANS_LAISSE_MUSELEE",
                "ABSENCE",
                "POSITIONS",
            ];

        case "III":
            return [
                "SUITE_EN_LAISSE",
                "SUITE_SANS_LAISSE_MUSELEE",
                "ABSENCE",
                "POSITIONS",
                "EN_AVANT",
            ];
    }
}

export function obeissanceObjet(echelon: Echelon): ExerciseKey[] {
    switch (echelon) {
        case "I":
            return ["APPATS_LANCES", "RAPPORT_LANCE"];

        case "II":
            return ["APPATS_LANCES", "RAPPORT_AU_VU", "RAPPORT_LANCE"];

        case "III":
            return [
                "APPATS_LANCES",
                "RAPPORT_AU_VU",
                "RAPPORT_A_L_INSU",
                "RAPPORT_LANCE",
            ];
    }
}

export function obeissancePattern(echelon: Echelon): RulePattern {
    const a = obeissanceDressage(echelon).length;
    const b = obeissanceObjet(echelon).length;
    return buildAlternatingPattern("obeissanceDressage", a, "obeissanceObjet", b);
}

/**
 * =======
 * Mordant
 * =======
 *
 * On garde l'idée "interceptions" vs "dressages",
 * sauf que la liste varie selon l'échelon.
 */
export function mordantInterceptions(echelon: Echelon): ExerciseKey[] {
    switch (echelon) {
        case "I":
            return [
                "INTER_REVOLVER_GARDE_AU_FERME",
                "INTER_FUYANTE",
                "INTER_FACE",
            ];

        case "II":
            return [
                "INTER_FACE",
                "INTER_REVOLVER_GARDE_AU_FERME",
                "INTER_FUYANTE",
            ];

        case "III":
            return [
                "INTER_FACE",
                "INTER_REVOLVER_GARDE_AU_FERME",
                "INTER_FUYANTE",
                "INTER_FACE_ARRETEE",
            ];
    }
}

export function mordantDressages(echelon: Echelon): ExerciseKey[] {
    switch (echelon) {
        case "I":
            return ["DEFENSE_CONDUCTEUR"];

        case "II":
            return ["DEFENSE_CONDUCTEUR", "RECHERCHE"];

        case "III":
            return ["DEFENSE_CONDUCTEUR", "RECHERCHE", "GARDE_OBJET"];
    }
}

export function mordantPattern(echelon: Echelon): RulePattern {
    const a = mordantInterceptions(echelon).length;
    const b = mordantDressages(echelon).length;
    return buildAlternatingPattern("mordantInterceptions", a, "mordantDressages", b);
}

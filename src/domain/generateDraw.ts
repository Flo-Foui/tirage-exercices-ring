import type {DrawResult, Echelon, ExerciseKey} from "./types";
import {pickOne, shuffle} from "./random";
import {
    mordantDressages,
    mordantInterceptions,
    mordantPattern,
    obeissanceDressage,
    obeissanceObjet,
    obeissancePattern,
} from "./rules";
import {mergeByPattern} from "./mergeByPattern";

/**
 * Tire 6 positions: 2 assis (A), 2 debout (D), 2 couché (C),
 * en garantissant que deux mêmes positions ne se suivent pas.
 */
function drawPositionsSequence(firstMustBeDifferentFrom: "A" | "D" | "C"): Array<"A" | "D" | "C"> {
    // multiset: 2A/2D/2C
    const pool: Array<"A" | "D" | "C"> = ["A", "A", "D", "D", "C", "C"];

    // On tente plusieurs shuffles; c'est petit donc ultra fiable.
    for (let attempt = 0; attempt < 200; attempt++) {
        const seq = shuffle(pool);
        let ok = true;
        for (let i = 1; i < seq.length; i++) {
            if (seq[i] === seq[i - 1]) {
                ok = false;
                break;
            }
        }
        if (ok && seq[0] !== firstMustBeDifferentFrom) return seq;
    }

    // Fallback (greedy) si jamais (théoriquement inutile avec 200 tentatives)
    const counts: Record<"A" | "D" | "C", number> = {A: 2, D: 2, C: 2};
    const out: Array<"A" | "D" | "C"> = [];
    while (out.length < 6) {
        const prev = out.length === 0 ? firstMustBeDifferentFrom : out[out.length - 1];        const choices = (["A", "D", "C"] as const)
            .filter((k) => counts[k] > 0)
            .filter((k) => k !== prev);
        const next = choices[Math.floor(Math.random() * choices.length)];
        counts[next]--;
        out.push(next);
    }
    return out;
}

export function generateDraw(echelon: Echelon): DrawResult {
    // Obéissance
    const obeissanceBuckets = {
        obeissanceDressage: shuffle(obeissanceDressage(echelon)),
        obeissanceObjet: shuffle(obeissanceObjet(echelon)),
        mordantInterceptions: [] as ExerciseKey[],
        mordantDressages: [] as ExerciseKey[],
    };

    const obeissance = mergeByPattern(obeissancePattern(echelon), obeissanceBuckets);

    // Options tirées
    const positionsStart =
        echelon === "I"
            ? pickOne(["A", "C"] as const)
            : pickOne(["A", "D", "C"] as const);

    const positionsSequence = drawPositionsSequence(positionsStart);

    // Absence : échelon I => couché obligatoire
    const absenceHold =
        echelon === "I" ? "Couché" : pickOne(["Assis", "Couché"] as const);

    // Mordant
    const mordantBuckets = {
        obeissanceDressage: [] as ExerciseKey[],
        obeissanceObjet: [] as ExerciseKey[],
        mordantInterceptions: shuffle(mordantInterceptions(echelon)),
        mordantDressages: shuffle(mordantDressages(echelon)),
    };

    const mordant = mergeByPattern(mordantPattern(echelon), mordantBuckets);

    return {
        echelon,
        obeissance,
        mordant,
        options: {positionsStart, positionsSequence, absenceHold},
    };
}

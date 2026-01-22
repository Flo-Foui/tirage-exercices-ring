export type Echelon = "I" | "II" | "III";

export type ExerciseKey =
// Obéissance / dressage (tirés)
    | "SUITE_EN_LAISSE"
    | "SUITE_SANS_LAISSE_MUSELEE"
    | "ABSENCE"
    | "POSITIONS"
    | "EN_AVANT"
    // Obéissance / objet (tirés, intercalés)
    | "APPATS_LANCES"
    | "RAPPORT_AU_VU"
    | "RAPPORT_A_L_INSU"
    | "RAPPORT_LANCE"
    // Mordant / interceptions (tirés)
    | "INTER_FACE"
    | "INTER_FUYANTE"
    | "INTER_FACE_ARRETEE"
    | "INTER_GARDE_AU_FERME"
    // Mordant / dressages (tirés, intercalés)
    | "DEFENSE_CONDUCTEUR"
    | "RECHERCHE"
    | "GARDE_OBJET";

export type DrawOptions = {
    positionsStart: "A" | "D" | "C"; // Assis / Debout / Couché
    positionsSequence: Array<"A" | "D" | "C">; // 6 positions, 2A/2D/2C, sans doublon consécutif
    absenceHold: "Assis" | "Couché";
};

export type DrawResult = {
    echelon: Echelon;
    obeissance: ExerciseKey[];
    mordant: ExerciseKey[];
    options: DrawOptions;
};

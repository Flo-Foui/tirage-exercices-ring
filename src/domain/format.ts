import type { DrawResult } from "./types";
import { LABELS, positionsStartLabel } from "./labels";

function posShort(p: "A" | "D" | "C") {
    if (p === "A") return "A";
    if (p === "D") return "D";
    return "C";
}

export function formatForCopy(draw: DrawResult): string {
    const lines: string[] = [];
    lines.push(`Échelon ${draw.echelon}`);
    lines.push("");

    lines.push("Obéissance :");
    draw.obeissance.forEach((k, i) => lines.push(`${i + 1}. ${LABELS[k]}`));
    lines.push("");

    lines.push("Mordant :");
    draw.mordant.forEach((k, i) => lines.push(`${i + 1}. ${LABELS[k]}`));
    lines.push("");

    lines.push("Options tirées :");
    lines.push(`- Positions : départ en "${positionsStartLabel(draw.options.positionsStart)}"`);
    lines.push(`- Positions (6) : ${draw.options.positionsSequence.map(posShort).join(" → ")}`);
    lines.push(`- Absence : "${draw.options.absenceHold}"`);

    return lines.join("\n");
}

import type {ExerciseKey} from "../domain/types";
import {LABELS} from "../domain/labels";

type Props = {
    items: ExerciseKey[];
    getSuffix?: (key: ExerciseKey) => string | undefined;
};

export function ExerciseList({items, getSuffix}: Props) {
    return (
        <ol>
            {items.map((k, i) => {
                const suffix = getSuffix ? getSuffix(k) : undefined;

                return (
                    <li key={`${k}-${i}`}>
                        {LABELS[k]}
                        {suffix ? <span>{suffix}</span> : null}
                    </li>
                );
            })}
        </ol>
    );
}

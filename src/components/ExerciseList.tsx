import type { ExerciseKey } from "../domain/types";
import { LABELS } from "../domain/labels";

export function ExerciseList(props: { items: ExerciseKey[] }) {
  return (
    <ol>
      {props.items.map((k, i) => (
        <li key={`${k}-${i}`}>{LABELS[k]}</li>
      ))}
    </ol>
  );
}

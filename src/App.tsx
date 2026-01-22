import {useMemo, useState} from "react";
import type {Echelon} from "./domain/types";
import {generateDraw} from "./domain/generateDraw";
import {formatForCopy} from "./domain/format";
import {positionsStartLabel} from "./domain/labels";
import {Section} from "./components/Section";
import {ExerciseList} from "./components/ExerciseList";

function EchelonSwitch(props: {
    value: Echelon;
    onChange: (next: Echelon) => void;
}) {
    const options: Echelon[] = ["I", "II", "III"];

    return (
        <div className="switch" role="group" aria-label="Sélection de l'échelon">
            {options.map((opt) => {
                const active = opt === props.value;
                return (
                    <button
                        key={opt}
                        type="button"
                        className={`switchBtn ${active ? "active" : ""}`}
                        onClick={() => props.onChange(opt)}
                        aria-pressed={active}
                    >
                        {opt}
                    </button>
                );
            })}
        </div>
    );
}

function posLabelShort(p: "A" | "D" | "C") {
    if (p === "A") return "A";
    if (p === "D") return "D";
    return "C";
}

export default function App() {
    const [echelon, setEchelon] = useState<Echelon>("III");
    const [draw, setDraw] = useState(() => generateDraw("III"));
    const [copied, setCopied] = useState(false);

    const copyText = useMemo(() => formatForCopy(draw), [draw]);

    function onDraw() {
        setDraw(generateDraw(echelon));
    }

    function onChangeEchelon(next: Echelon) {
        setEchelon(next);
        setDraw(generateDraw(next));
    }

    async function onCopy() {
        try {
            await navigator.clipboard.writeText(copyText);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1200);
        } catch {
            alert("Copie automatique impossible. Ouvre 'Texte à copier' et copie manuellement.");
        }
    }

    return (
        <div className="container">
            <div className="header">
                <h1 style={{margin: 0}}>Tirage au sort des exercices</h1>
                <p className="subtitle">
                    Tirage différent à chaque clic. Les règles définissent un pattern alterné (dressage/objet,
                    interceptions/dressages).
                </p>
            </div>

            <div className="controls">
                <div className="pill">
                    <span className="muted">Échelon</span>
                    <EchelonSwitch value={echelon} onChange={onChangeEchelon}/>
                </div>

                <button className="btn primary" onClick={onDraw}>
                    Tirer au sort
                </button>
                <button className="btn" onClick={onCopy}>
                    {copied ? "Copié ✅" : "Copier"}
                </button>
            </div>

            <div className="grid">
                <Section
                    title="Obéissance"
                    footer={
                        <div className="kv">
                            <div>Positions</div>
                            <div>
                                {positionsStartLabel(draw.options.positionsStart)} —{" "}
                                {draw.options.positionsSequence.map(posLabelShort).join(" → ")}
                            </div>
                            <div>Absence</div>
                            <div>{draw.options.absenceHold}</div>
                        </div>
                    }
                >
                    <ExerciseList items={draw.obeissance}/>
                </Section>

                <Section title="Mordant">
                    <ExerciseList items={draw.mordant}/>
                </Section>
            </div>

            <details>
                <summary>Texte à copier</summary>
                <pre>{copyText}</pre>
            </details>
        </div>
    );
}

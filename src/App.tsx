import {useState} from "react";
import type {Echelon} from "./domain/types";
import {generateDraw} from "./domain/generateDraw";
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

function posShort(p: "A" | "D" | "C") {
    if (p === "A") return "A";
    if (p === "D") return "D";
    return "C";
}

export default function App() {
    const [echelon, setEchelon] = useState<Echelon>("III");
    const [draw, setDraw] = useState(() => generateDraw("III"));

    function onDraw() {
        setDraw(generateDraw(echelon));
    }

    function onChangeEchelon(next: Echelon) {
        setEchelon(next);
        setDraw(generateDraw(next));
    }

    const obeissanceSuffix = (key: any) => {
        if (key === "ABSENCE") {
            return ` : ${draw.options.absenceHold}`;
        }
        if (key === "POSITIONS") {
            const start = draw.options.positionsStart; // "A" | "D" | "C"
            const seq = (draw.options as any).positionsSequence as Array<"A" | "D" | "C"> | undefined;

            const startTxt = `départ ${start} → `;
            const seqTxt = seq?.length ? `${seq.map(posShort).join(" - ")}` : "";

            return ` : ${startTxt}${seqTxt}`;
        }

        return undefined;
    };

    return (
        <div className="container">
            <div className="header">
                <h1 style={{margin: 0}}>Tirage au sort des exercices</h1>
                <p className="subtitle">
                    Tirage différent à chaque clic. Les règles définissent un pattern alterné.
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
            </div>

            <div className="grid">
                <Section title="Obéissance">
                    <ExerciseList items={draw.obeissance} getSuffix={obeissanceSuffix}/>
                </Section>

                <Section title="Mordant">
                    <ExerciseList items={draw.mordant}/>
                </Section>
            </div>
        </div>
    );
}

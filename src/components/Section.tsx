import type { ReactNode } from "react";

export function Section(props: { title: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <section className="card">
      <h2 className="h2">{props.title}</h2>
      {props.children}
      {props.footer ? <div style={{ marginTop: 12 }}>{props.footer}</div> : null}
    </section>
  );
}

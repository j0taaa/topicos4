import type { SectionKey } from "./deck";
import styles from "./academic-slides.module.css";

const sectionLabels: Record<SectionKey, string> = {
  fundamentos: "Fundamentos",
  virtualizacao: "Virtualização",
  containers: "Containers",
  kubernetes: "Orquestração",
  rede: "Rede e alta disponibilidade",
  replicacao: "Replicação",
  distribuidos: "Sistemas distribuídos",
  fechamento: "Síntese e participação",
};

export function AcademicSlide({
  title,
  section,
  children,
  className = "",
}: {
  title: string;
  section: SectionKey;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article className={`deck-slide ${styles.academicSlide} ${className}`}>
      <header className="slide-heading"><h1>{title}</h1></header>
      {children}
      <span className="slide-section">{sectionLabels[section]}</span>
    </article>
  );
}

export function SourceNote({ children }: { children: React.ReactNode }) {
  return <p className={styles.sourceNote}>{children}</p>;
}

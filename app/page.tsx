"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, Eye, Grid3X3, RotateCcw, X } from "lucide-react";
import { sections, slides } from "./deck";

export default function Home() {
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [overview, setOverview] = useState(false);
  const current = slides[index];
  const CurrentSlide = current.component;

  const goTo = useCallback((next: number) => {
    const bounded = Math.max(0, Math.min(slides.length - 1, next));
    setIndex(bounded);
    setStep(0);
    setOverview(false);
  }, []);

  const forward = useCallback(() => {
    if (step < current.maxStep) setStep((value) => value + 1);
    else if (index < slides.length - 1) goTo(index + 1);
  }, [current.maxStep, goTo, index, step]);

  const backward = useCallback(() => {
    if (step > 0) setStep((value) => value - 1);
    else if (index > 0) {
      const previous = index - 1;
      setIndex(previous);
      setStep(slides[previous].maxStep);
    }
  }, [index, step]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const requested = Number(window.location.hash.replace("#slide-", ""));
      if (Number.isInteger(requested) && requested >= 1 && requested <= slides.length) setIndex(requested - 1);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => { window.history.replaceState(null, "", `#slide-${index + 1}`); }, [index]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (overview && event.key === "Escape") { setOverview(false); return; }
      if (overview) return;
      if (["ArrowRight", " ", "PageDown"].includes(event.key)) { event.preventDefault(); forward(); }
      if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); backward(); }
      if (event.key === "Home") { event.preventDefault(); goTo(0); }
      if (event.key === "End") { event.preventDefault(); goTo(slides.length - 1); }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [backward, forward, goTo, overview]);

  async function present() {
    const frame = document.querySelector(".slide-frame");
    if (frame instanceof HTMLElement && frame.requestFullscreen) {
      try { await frame.requestFullscreen(); } catch { /* previews incorporados podem bloquear fullscreen */ }
    }
  }

  const progress = useMemo(() => ((index + step / Math.max(1, current.maxStep + 1)) / slides.length) * 100, [current.maxStep, index, step]);

  return <main className="presentation-lab">
    <header className="presentation-header">
      <div><h1>Cloud por baixo das abstrações</h1><p>60 slides · conteúdo principal ≈ 80 minutos + discussão · vendor-neutral</p></div>
      <div className="header-actions"><button onClick={() => setOverview(true)}><Grid3X3/>Visão geral</button><button onClick={present}><Expand/>Tela cheia</button></div>
    </header>

    <section className="presentation-stage"><div className="slide-frame" aria-live="polite"><CurrentSlide step={step}/><span className="runtime-slide-number">{String(index + 1).padStart(2, "0")}</span></div><div className="progress-track"><i style={{ width: `${progress}%` }}/></div></section>

    <nav className="presentation-controls" aria-label="Controles da apresentação">
      <button onClick={backward} disabled={index === 0 && step === 0} aria-label="Voltar"><ChevronLeft/></button>
      <div className="slide-status"><b>{index + 1} / {slides.length}</b><span>{current.title}</span><small>{current.duration} · {current.maxStep > 0 ? `diagrama ${step + 1} de ${current.maxStep + 1}` : "slide completo"}</small></div>
      {current.maxStep > 0 && <button className="show-all" onClick={() => setStep(current.maxStep)} disabled={step === current.maxStep}><Eye/>Mostrar diagrama completo</button>}
      <button onClick={forward} disabled={index === slides.length - 1 && step === current.maxStep} aria-label="Avançar"><ChevronRight/></button>
    </nav>

    <nav className="section-nav" aria-label="Seções da apresentação">{sections.map((section) => <button key={section.key} onClick={() => goTo(section.start - 1)} className={current.section === section.key ? "active" : ""}><span>{section.label}</span><small>{section.start}–{section.end}</small></button>)}</nav>
    <footer className="presentation-note"><RotateCcw/><span>Use <b>←</b> e <b>→</b> para avançar. Apenas diagramas em que a ordem importa possuem etapas.</span></footer>

    {overview && <div className="overview-backdrop" role="dialog" aria-modal="true" aria-label="Visão geral dos slides"><section className="overview-panel"><header><div><h2>Visão geral</h2><p>Selecione um slide para navegar diretamente.</p></div><button onClick={() => setOverview(false)} aria-label="Fechar visão geral"><X/></button></header><div className="overview-grid">{sections.map((section) => <section key={section.key}><h3>{section.label}</h3>{slides.map((slide, slideIndex) => slide.section === section.key && <button key={slide.title} onClick={() => goTo(slideIndex)} className={slideIndex === index ? "active" : ""}><span>{slideIndex + 1}</span><b>{slide.title}</b><small>{slide.duration}</small></button>)}</section>)}</div></section></div>}
  </main>;
}

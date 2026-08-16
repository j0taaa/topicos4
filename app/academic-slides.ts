import type { SlideDefinition } from "./deck";
import { additionalTopicSlides, articleSlides, currentTechnologySlides, overviewSlides } from "./academic-content-slides";
import { discussionSlide, examSlides } from "./academic-exam-slides";

function insertAfter(slides: SlideDefinition[], title: string, additions: SlideDefinition[]): SlideDefinition[] {
  const index = slides.findIndex((slide) => slide.title === title);
  if (index < 0) throw new Error(`Não foi possível inserir slides após “${title}”.`);
  return [...slides.slice(0, index + 1), ...additions, ...slides.slice(index + 1)];
}

export function buildSeminarSlides(coreSlides: SlideDefinition[]): SlideDefinition[] {
  const redundantSlides = new Set([
    "Cinco etapas",
    "Limite de um host",
    "Por que orquestrar",
    "O problema do estado",
    "Perguntas de verificação",
    "Cenários para discussão",
  ]);
  let result = coreSlides.filter((slide) => !redundantSlides.has(slide.title));
  result = insertAfter(result, "Cloud por baixo das abstrações", overviewSlides);
  result = insertAfter(result, "VMs e containers", additionalTopicSlides);
  result = insertAfter(result, "Limites do Kubernetes", articleSlides);
  result = insertAfter(result, "Caminho da requisição", currentTechnologySlides);
  result = insertAfter(result, "Cloud como contratos", [...examSlides, discussionSlide]);
  return result;
}

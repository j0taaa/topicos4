import type { SlideDefinition } from "./deck";
import {
  additionalTopicSlides,
  articleSlides,
  currentTechnologySlides,
  discussionSlide,
  examSlides,
  overviewSlides,
  priorityReplacements,
} from "./priority-revision-slides";

function insertAfter(slides: SlideDefinition[], title: string, additions: SlideDefinition[]): SlideDefinition[] {
  const index = slides.findIndex((slide) => slide.title === title);
  if (index < 0) throw new Error(`Não foi possível inserir slides após “${title}”.`);
  return [...slides.slice(0, index + 1), ...additions, ...slides.slice(index + 1)];
}

export function buildSeminarSlides(coreSlides: SlideDefinition[]): SlideDefinition[] {
  const redundantSlides = new Set([
    "Cinco etapas",
    "Limite de um host",
    "Controllers",
    "O problema do estado",
    "Perguntas de verificação",
    "Cenários para discussão",
  ]);

  let result = coreSlides
    .map((slide) => priorityReplacements[slide.title] ?? slide)
    .filter((slide) => !redundantSlides.has(slide.title));

  result = insertAfter(result, "Cloud computing: da virtualização à operação multi-região", overviewSlides);
  result = insertAfter(result, "VMs e containers: fronteiras de isolamento diferentes", additionalTopicSlides);
  result = insertAfter(result, "Limites do Kubernetes", articleSlides);
  result = insertAfter(result, "Caminho completo de uma requisição", currentTechnologySlides);
  result = insertAfter(result, "Cloud como contratos", [...examSlides, discussionSlide]);
  return result;
}

import { usePluginData } from "@docusaurus/useGlobalData";
import { useDocsVersion } from "@docusaurus/theme-common/internal";
// Units and their chapters in reading order; doc ids are paths under tutorials/ without the extension.
import units from "@site/tutorials.json";

export type TutorialUnit = {
  id: string;
  title: string;
  items: string[];
};

export type TutorialDocItem = {
  id: string;
  path: string;
  title: string;
};

export const tutorialUnits: TutorialUnit[] = (units as { units: TutorialUnit[] }).units;

const chapters = (): string[] => tutorialUnits.flatMap((unit) => unit.items);

export const findUnitByItemId = (id: string) =>
  tutorialUnits.find((unit) => unit.items.includes(id));

export const getNext = (id: string) => {
  const all = chapters();
  const at = all.indexOf(id);
  return at >= 0 ? all[at + 1] : undefined;
};

export const getPrevious = (id: string) => {
  const all = chapters();
  const at = all.indexOf(id);
  return at > 0 ? all[at - 1] : undefined;
};

/** Paths and titles of every tutorial chapter, keyed by doc id. */
export const useTutorialDocs = (): Record<string, TutorialDocItem> => {
  const { docs } = useDocsVersion();
  const { versions } = usePluginData("docusaurus-plugin-content-docs", "tutorials") as {
    versions: { docs: { id: string; path: string }[] }[];
  };
  return Object.fromEntries(
    versions[0].docs.map((doc) => [
      doc.id,
      { id: doc.id, path: doc.path, title: docs[doc.id]?.title ?? doc.id },
    ]),
  );
};

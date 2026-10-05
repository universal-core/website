import isInternalUrl from "@docusaurus/isInternalUrl";

export const getLinkRel = (URL?: string): string => {
  return isInternalUrl(URL) ? "noopener" : "noopener noreferrer nofollow";
};

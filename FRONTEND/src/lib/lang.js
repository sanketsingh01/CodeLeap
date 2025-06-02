import { get } from "react-hook-form";

function getLanguageName(LanguageId) {
  const LANGUAGE_NAMES = {
    74: "TypeScript",
    63: "JavaScript",
    71: "Python",
    62: "Java",
  };
  return LANGUAGE_NAMES(LanguageId) || "Unknown";
}

export { getLanguageName };

export function getLanguageId(Language) {
  const LanguageMap = {
    PYTHON: 71,
    JAVASCRIPT: 63,
    JAVA: 62,
    TYPESCRIPT: 74,
  };
  return LanguageMap[Language.toUpperCase()];
}

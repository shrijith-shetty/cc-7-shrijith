import { strings } from "./assignment01";

export const transformedStrings = strings.map((line) =>
  line.replace("CraftCode", "CodeCraft"),
);

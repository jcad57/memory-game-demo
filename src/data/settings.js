import { pastel, punk, fnaf, nineties, nature, random } from "./themes";

const possibleSettings = {
  theme: ["pastel", "punk", "nineties", "fnaf", "nature", "random"],
  difficulty: ["easy", "medium", "hard"],
  sound: ["on", "off"],
};

const currentSettings = {
  theme: "random",
  cards: random,
  difficulty: "hard",
  sound: "off",
};

export { possibleSettings, currentSettings };

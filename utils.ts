import { synonymList } from "./synonym_api.ts";

interface Synonyms {
  good: string[];
  bad: string[];
}

async function syns(word: string): Promise<Synonyms> {
  const gSyns: string[] = [];
  const bSyns: string[] = [];

  await synonymList(word)
    .then((list) =>
      list.map((word) => passesDoor(word) ? gSyns.push(word) : bSyns.push(word))
    );

  gSyns.length === 0 ? gSyns.push("good") : gSyns;
  bSyns.length === 0 ? bSyns.push("bad") : bSyns;

  return {
    good: gSyns,
    bad: bSyns,
  };
}

export async function goodSynonym(word: string): Promise<string> {
  return await syns(word)
    .then((value) => value.good)
    .then((list) => randomElement(list));
}

export async function badSynonym(word: string): Promise<string> {
  return await syns(word)
    .then((value) => value.bad)
    .then((list) => randomElement(list));
}

export function passesDoor(word: string): boolean {
  for (let i = 1; i < word.length; i++) {
    if (word[i] === word[i - 1]) {
      return true;
    }
  }
  return false;
}

function randomElement(list: string[]): string {
  return list[Math.floor(Math.random() * list.length)];
}

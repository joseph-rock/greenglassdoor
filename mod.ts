import { lookupWord } from "./thesaurus_api.ts";

interface Synonyms {
  good: string[];
  bad: string[];
}

async function syns(word: string): Promise<Synonyms> {
  const gSyns: string[] = [];
  const bSyns: string[] = [];

  await lookupWord(word)
    .then((value) =>
      value.reduce(
        (total: string[], synList: any) =>
          total.concat(synList.meta.syns.flat()),
        [],
      )
    )
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

async function goodSynonym(word: string): Promise<string> {
  return await syns(word)
    .then((value) => value.good)
    .then((list) => randomElement(list));
}

async function badSynonym(word: string): Promise<string> {
  return await syns(word)
    .then((value) => value.bad)
    .then((list) => randomElement(list));
}

function randomElement(list: string[]): string {
  return list[Math.floor(Math.random() * list.length)];
}

function passesDoor(word: string): boolean {
  for (let i = 1; i < word.length; i++) {
    if (word[i] === word[i - 1]) {
      return true;
    }
  }
  return false;
}

async function main() {
  const word = Deno.args[0];
  if (passesDoor(word)) {
    const syn = await badSynonym(word);
    console.log(`${word} is good, ${syn} is bad.`);
  } else {
    const syn = await goodSynonym(word);
    console.log(`${word} is bad, ${syn} is good.`);
  }
}

main();

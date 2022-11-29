import { lookupWord } from "./thesaurus_api.ts";

async function synonyms(word: string): Promise<string[]> {
  return await lookupWord(word)
    .then((value) =>
      value.reduce(
        (total: string[], synList: any) =>
          total.concat(synList.meta.syns.flat()),
        [],
      )
    )
    .catch(() => []);
}

async function goodSyns(word: string): Promise<string> {
  return await synonyms(word)
    .then((syns) => syns.filter((word) => passesDoor(word)))
    .then((goodList) => randomElement(goodList)) ||
    "good";
}

async function badSyns(word: string): Promise<string> {
  return await synonyms(word)
    .then((syns) => syns.filter((word) => !passesDoor(word)))
    .then((badList) => randomElement(badList)) ||
    "bad";
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
  const word = Deno.args[0]
    ? Deno.args[0]
    : randomElement(["forgot", "args", "dummy"]);

  if (passesDoor(word)) {
    const syn = await badSyns(word);
    console.log(`${word} is good, ${syn} is bad.`);
  } else {
    const syn = await goodSyns(word);
    console.log(`${word} is bad, ${syn} is good.`);
  }
}

main();

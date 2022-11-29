import { lookupWord } from "./thesaurus_api.ts";

async function syns(word: string): Promise<string[]> {
  return await lookupWord(word)
    .then((value) =>
      value.reduce(
        (total: string[], synList: any) =>
          total.concat(synList.meta.syns.flat()),
        [],
      )
    );
}

async function goodSynonym(word: string): Promise<string> {
  return await syns(word)
    .then((syn) => syn.filter((word) => passesDoor(word)))
    .then((goodList) => randomElement(goodList)) ||
    "good";
}

async function badSynonym(word: string): Promise<string> {
  return await syns(word)
    .then((syn) => syn.filter((word) => !passesDoor(word)))
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

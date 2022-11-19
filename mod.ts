import { badSynonym, goodSynonym, isGood } from "./utils.ts";

async function main(word: string) {
  if (isGood(word)) {
    const syn = await badSynonym(word);
    console.log(`${word} is good, ${syn} is bad.`);
  } else {
    const syn = await goodSynonym(word);
    console.log(`${word} is bad, ${syn} is good.`);
  }
}

main("word");

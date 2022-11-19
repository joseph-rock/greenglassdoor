import { badSynonym, goodSynonym, passesDoor } from "./utils.ts";

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

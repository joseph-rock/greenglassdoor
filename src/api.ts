import { config } from "https://deno.land/x/dotenv/mod.ts";
import { isGood } from "./greenglassdoor.ts";

async function synonymList(word: string): Promise<string[]> {
  const env = config();
  const url = `${env.API_URL}${word}?key=${env.API_KEY}`;
  const strength = 4;

  const resp = await fetch(url);
  const data = await resp.json();
  const syns = data[0].meta.syns;

  return syns.length > strength ? syns.slice(0, strength).flat() : syns.flat();
}

export async function goodSynonym(word: string): Promise<string> {
  const synList = await synonymList(word);
  const list = synList.filter((word) => isGood(word));
  console.log(list);
  return list[Math.floor(Math.random() * list.length)];
}

export async function badSynonym(word: string): Promise<string> {
  const synList = await synonymList(word);
  const list = synList.filter((word) => !isGood(word));
  console.log(list);
  return list[Math.floor(Math.random() * list.length)];
}

const word = "ring";
const good = await goodSynonym(word);
const bad = await badSynonym(word);
console.log(good, bad);

import { config } from "./deps.ts";
import { isGood } from "./green_glass_door.ts";

// TODO: Needs error handling for words that do not exist
async function synonymList(word: string): Promise<string[]> {
  const env = config();
  const url = `${env.API_URL}${word}?key=${env.API_KEY}`;

  const resp = await fetch(url);
  const data = await resp.json();

  return data.reduce(
    (synonyms: string[], list: any) => synonyms.concat(list.meta.syns.flat()),
    [],
  );
}

// TODO: Make these functions better
export async function goodSynonym(word: string): Promise<string> {
  const synList = await synonymList(word);
  const list = synList.filter((word) => isGood(word));
  return list ? list[Math.floor(Math.random() * list.length)] : "good example";
}

export async function badSynonym(word: string): Promise<string> {
  const synList = await synonymList(word);
  const list = synList.filter((word) => !isGood(word));
  return list ? list[Math.floor(Math.random() * list.length)] : "bad example";
}

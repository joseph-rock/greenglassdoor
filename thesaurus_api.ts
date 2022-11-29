import { config } from "./deps.ts";

export async function lookupWord(word: string): Promise<string[]> {
  const env = config();
  const url = `${env.API_URL}${word}?key=${env.API_KEY}`;

  return await fetch(url)
    .then((value) => value.json())
    .catch(() => []);
}

import { config } from "./deps.ts";

export async function synonymList(word: string): Promise<string[]> {
  const env = config();
  const url = `${env.API_URL}${word}?key=${env.API_KEY}`;

  return await fetch(url)
    .then((value) => value.json())
    .then((value) =>
      value.reduce(
        (total: string[], synList: any) =>
          total.concat(synList.meta.syns.flat()),
        [],
      )
    )
    .catch(() => fallback());
}

function fallback(): string[] {
  return ["good", "bad"];
}

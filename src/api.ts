import { config } from "https://deno.land/x/dotenv/mod.ts";

async function synonymList(word: string): Promise<string[]> {
  const env = config();
  const url = `${env.API_URL}${word}?key=${env.API_KEY}`;
  const strength = 3;

  const resp = await fetch(url);
  const data = await resp.json();
  const syns = data[0].meta.syns;

  return syns.reduce(
    (total: string[], list: string[], i: number) =>
      i < strength && list[i] ? total.concat(list) : total,
    [],
  );
}

const result = await synonymList("parrot");
console.log(result);

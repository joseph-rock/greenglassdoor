import { config } from 'https://deno.land/x/dotenv/mod.ts';

const env = config();
console.log(env.API_KEY);
console.log(env.API_URL);

const word = "good"
const url = `${env.API_URL}${word}?key=${env.API_KEY}`
const resp = await fetch(url)
const data = await resp.json()
console.log(data)
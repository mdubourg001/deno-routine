/**
 * Usage:
 * - Run without routine: deno run -A --unstable benchmark.js
 * - Run with routine: deno run -A --unstable benchmark.js --routine
 */

import { parse } from "https://deno.land/std@0.80.0/flags/mod.ts";
import routine from "./mod.ts";

const FLAGS = parse(Deno.args);
const t0 = performance.now();
let results;

const inneficientSquare = (n) => {
  let total = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      total++;
    }
  }
  return total;
};

if (FLAGS["routine"]) {
  results = await Promise.all([
    routine(inneficientSquare, 80001),
    routine(inneficientSquare, 80001),
  ]);
} else {
  results = [
    inneficientSquare(80001),
    inneficientSquare(80001),
  ];
}

console.log(
  FLAGS["routine"] ? "With" : "Without",
  `routine, computed in ${((performance.now() - t0) / 1000).toFixed(3)}s: `,
  results[0] * results[1],
);

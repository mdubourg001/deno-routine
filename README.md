## Routine

Inline, Promise based wrapper around [Deno Workers](https://deno.land/manual@v1.7.0/runtime/workers).

`routine` allows you to do everything Workers do (running code in separate threads, split heavy tasks...), but wrapped in a nicer API.

⚠️ This module uses a hack to transform functions into files ran using Workers, I wouldn't recommend using it in production without extensive testing.

### Usage

Using `async / await`:

```javascript
import routine from "https://deno.land/x/routine/mod.ts";

const inneficientSquare = (n) => {
  let total = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      total++;
    }
  }
  return total;
};

// spawns two workers running in separate threads
const results = await Promise.all([
  routine(inneficientSquare, 80000),
  routine(inneficientSquare, 80001),
]);

console.log(results[0] * results[1]);
```

Using `Promise.then`:

```javascript
import routine from "https://deno.land/x/routine/mod.ts";

const multiply = (a, b, c) => a * b * c;

routine(multiply, 2, 3, 10).then(
  console.log // => 60
);
```

### Perfs

See [benchmark.js](./benchmark.js) for a perfs test example.
